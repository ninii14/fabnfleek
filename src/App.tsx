import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { ErrorBoundary } from './components/ErrorBoundary';

// Public Layout & Pages
import PublicLayout from './components/public/PublicLayout';
import Home from './pages/public/Home';
import Services from './pages/public/Services';
import Promotions from './pages/public/Promotions';
import Gallery from './pages/public/Gallery';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

// Admin Layout & Pages
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/admin/Login';
import Signup from './pages/admin/Signup';
import Dashboard from './pages/admin/Dashboard';
import ServicesCMS from './pages/admin/ServicesCMS';
import PromotionsCMS from './pages/admin/PromotionsCMS';
import GalleryCMS from './pages/admin/GalleryCMS';
import TeamCMS from './pages/admin/TeamCMS';
import ContentCMS from './pages/admin/ContentCMS';

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<PublicLayout />}>
              <Route index element={<Home />} />
              <Route path="services" element={<Services />} />
              <Route path="promotions" element={<Promotions />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* Admin Auth */}
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin/signup" element={<Signup />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="services" element={<ServicesCMS />} />
              <Route path="promotions" element={<PromotionsCMS />} />
              <Route path="gallery" element={<GalleryCMS />} />
              <Route path="team" element={<TeamCMS />} />
              <Route path="content" element={<ContentCMS />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
