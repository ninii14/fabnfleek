import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, onSnapshot, setDoc, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

// --- Types ---
export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  duration: string;
  image: string;
  status: 'Active' | 'Hidden';
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  image: string;
  expirationDate: string;
  status: 'Active' | 'Hidden';
}

export interface GalleryImage {
  id: string;
  url: string;
  category: 'Before & After' | 'Clinic Interior' | 'Client Results';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
}

export interface WebsiteContent {
  heroTitle: string;
  tagline: string;
  aboutText: string;
  contactPhone: string;
  contactEmail: string;
  address: string;
  businessHours: string;
  facebookUrl: string;
  instagramUrl: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  isAuthReady: boolean;
  
  services: Service[];
  addService: (service: Service) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;

  promotions: Promotion[];
  addPromotion: (promo: Promotion) => void;
  updatePromotion: (id: string, promo: Partial<Promotion>) => void;
  deletePromotion: (id: string) => void;

  gallery: GalleryImage[];
  addGalleryImage: (image: GalleryImage) => void;
  deleteGalleryImage: (id: string) => void;

  team: TeamMember[];
  addTeamMember: (member: TeamMember) => void;
  updateTeamMember: (id: string, member: Partial<TeamMember>) => void;
  deleteTeamMember: (id: string) => void;

  content: WebsiteContent;
  updateContent: (content: Partial<WebsiteContent>) => void;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const initialContent: WebsiteContent = {
  heroTitle: '',
  tagline: '',
  aboutText: '',
  contactPhone: '',
  contactEmail: '',
  address: '',
  businessHours: '',
  facebookUrl: '',
  instagramUrl: '',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);
  
  const [services, setServices] = useState<Service[]>([]);
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [content, setContent] = useState<WebsiteContent>(initialContent);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !auth.currentUser) {
      setServices([]);
      setPromotions([]);
      setGallery([]);
      setTeam([]);
      setContent(initialContent);
      return;
    }

    const userId = auth.currentUser.uid;

    const unsubServices = onSnapshot(collection(db, `users/${userId}/services`), (snapshot) => {
      setServices(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Service)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, `users/${userId}/services`));

    const unsubPromotions = onSnapshot(collection(db, `users/${userId}/promotions`), (snapshot) => {
      setPromotions(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promotion)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, `users/${userId}/promotions`));

    const unsubGallery = onSnapshot(collection(db, `users/${userId}/gallery`), (snapshot) => {
      setGallery(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, `users/${userId}/gallery`));

    const unsubTeam = onSnapshot(collection(db, `users/${userId}/team`), (snapshot) => {
      setTeam(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember)));
    }, (error) => handleFirestoreError(error, OperationType.LIST, `users/${userId}/team`));

    const unsubContent = onSnapshot(doc(db, `users/${userId}/content`, 'website'), (docSnap) => {
      if (docSnap.exists()) {
        setContent(docSnap.data() as WebsiteContent);
      } else {
        setDoc(doc(db, `users/${userId}/content`, 'website'), initialContent).catch(e => console.error(e));
      }
    }, (error) => handleFirestoreError(error, OperationType.GET, `users/${userId}/content/website`));

    return () => {
      unsubServices();
      unsubPromotions();
      unsubGallery();
      unsubTeam();
      unsubContent();
    };
  }, [isAuthenticated]);

  const addService = async (service: Service) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try {
      const { id, ...data } = service;
      if (id && !id.startsWith('temp-')) await setDoc(doc(db, `users/${userId}/services`, id), data);
      else await addDoc(collection(db, `users/${userId}/services`), data);
    } catch (error) { handleFirestoreError(error, OperationType.CREATE, `users/${userId}/services`); }
  };
  const updateService = async (id: string, updated: Partial<Service>) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try { await updateDoc(doc(db, `users/${userId}/services`, id), updated); } 
    catch (error) { handleFirestoreError(error, OperationType.UPDATE, `users/${userId}/services/${id}`); }
  };
  const deleteService = async (id: string) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try { await deleteDoc(doc(db, `users/${userId}/services`, id)); } 
    catch (error) { handleFirestoreError(error, OperationType.DELETE, `users/${userId}/services/${id}`); }
  };

  const addPromotion = async (promo: Promotion) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try {
      const { id, ...data } = promo;
      if (id && !id.startsWith('temp-')) await setDoc(doc(db, `users/${userId}/promotions`, id), data);
      else await addDoc(collection(db, `users/${userId}/promotions`), data);
    } catch (error) { handleFirestoreError(error, OperationType.CREATE, `users/${userId}/promotions`); }
  };
  const updatePromotion = async (id: string, updated: Partial<Promotion>) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try { await updateDoc(doc(db, `users/${userId}/promotions`, id), updated); } 
    catch (error) { handleFirestoreError(error, OperationType.UPDATE, `users/${userId}/promotions/${id}`); }
  };
  const deletePromotion = async (id: string) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try { await deleteDoc(doc(db, `users/${userId}/promotions`, id)); } 
    catch (error) { handleFirestoreError(error, OperationType.DELETE, `users/${userId}/promotions/${id}`); }
  };

  const addGalleryImage = async (image: GalleryImage) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try {
      const { id, ...data } = image;
      if (id && !id.startsWith('temp-')) await setDoc(doc(db, `users/${userId}/gallery`, id), data);
      else await addDoc(collection(db, `users/${userId}/gallery`), data);
    } catch (error) { handleFirestoreError(error, OperationType.CREATE, `users/${userId}/gallery`); }
  };
  const deleteGalleryImage = async (id: string) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try { await deleteDoc(doc(db, `users/${userId}/gallery`, id)); } 
    catch (error) { handleFirestoreError(error, OperationType.DELETE, `users/${userId}/gallery/${id}`); }
  };

  const addTeamMember = async (member: TeamMember) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try {
      const { id, ...data } = member;
      if (id && !id.startsWith('temp-')) await setDoc(doc(db, `users/${userId}/team`, id), data);
      else await addDoc(collection(db, `users/${userId}/team`), data);
    } catch (error) { handleFirestoreError(error, OperationType.CREATE, `users/${userId}/team`); }
  };
  const updateTeamMember = async (id: string, updated: Partial<TeamMember>) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try { await updateDoc(doc(db, `users/${userId}/team`, id), updated); } 
    catch (error) { handleFirestoreError(error, OperationType.UPDATE, `users/${userId}/team/${id}`); }
  };
  const deleteTeamMember = async (id: string) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try { await deleteDoc(doc(db, `users/${userId}/team`, id)); } 
    catch (error) { handleFirestoreError(error, OperationType.DELETE, `users/${userId}/team/${id}`); }
  };

  const updateContent = async (updated: Partial<WebsiteContent>) => {
    if (!auth.currentUser) return;
    const userId = auth.currentUser.uid;
    try { await updateDoc(doc(db, `users/${userId}/content`, 'website'), updated); } 
    catch (error) { handleFirestoreError(error, OperationType.UPDATE, `users/${userId}/content/website`); }
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated, isAuthReady,
      services, addService, updateService, deleteService,
      promotions, addPromotion, updatePromotion, deletePromotion,
      gallery, addGalleryImage, deleteGalleryImage,
      team, addTeamMember, updateTeamMember, deleteTeamMember,
      content, updateContent
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};
