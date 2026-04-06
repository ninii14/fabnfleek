import React, { useState } from 'react';
import { useAppContext, Promotion } from '../../context/AppContext';
import { Plus, Edit2, Trash2, X, Check, Calendar } from 'lucide-react';

export default function PromotionsCMS() {
  const { promotions, addPromotion, updatePromotion, deletePromotion } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Promotion>>({
    title: '',
    description: '',
    discount: '',
    image: '',
    expirationDate: new Date().toISOString().split('T')[0],
    status: 'Active'
  });

  const handleOpenModal = (promo?: Promotion) => {
    if (promo) {
      setFormData(promo);
      setEditingId(promo.id);
    } else {
      setFormData({
        title: '', description: '', discount: '', image: '', expirationDate: new Date().toISOString().split('T')[0], status: 'Active'
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updatePromotion(editingId, formData);
    } else {
      addPromotion({
        ...formData,
        id: Date.now().toString(),
      } as Promotion);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Manage Promotions</h1>
          <p className="text-gray-400">Create and manage special offers and packages.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-brand-teal hover:bg-brand-teal/90 text-brand-bg px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(10,188,198,0.3)]"
        >
          <Plus size={18} /> Add Promotion
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-brand-card rounded-2xl border border-brand-border overflow-hidden flex flex-col">
            <div className="h-48 relative overflow-hidden">
              <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 flex gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
                  promo.status === 'Active' ? 'bg-green-400/20 text-green-400 border-green-400/30' : 'bg-gray-500/20 text-gray-300 border-gray-500/30'
                }`}>
                  {promo.status}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 bg-brand-pink text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                {promo.discount}
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-serif font-bold mb-2">{promo.title}</h3>
              <p className="text-sm text-gray-400 mb-4 line-clamp-3 flex-grow">{promo.description}</p>
              
              <div className="flex items-center justify-between pt-4 border-t border-brand-border mt-auto">
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar size={14} className="mr-1.5 text-brand-teal" />
                  Expires: {new Date(promo.expirationDate).toLocaleDateString()}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleOpenModal(promo)} className="p-1.5 text-gray-400 hover:text-brand-teal transition-colors">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => deletePromotion(promo.id)} className="p-1.5 text-gray-400 hover:text-red-400 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {promotions.length === 0 && (
        <div className="bg-brand-card rounded-2xl border border-brand-border p-12 text-center text-gray-500">
          No promotions found. Create one to attract more clients.
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-brand-card w-full max-w-2xl rounded-3xl border border-brand-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-brand-border">
              <h2 className="text-xl font-serif font-bold">{editingId ? 'Edit Promotion' : 'Add New Promotion'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="promo-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-gray-300">Promotion Title</label>
                    <input 
                      type="text" required
                      value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Discount/Offer</label>
                    <input 
                      type="text" required placeholder="e.g. 20% OFF or $50 OFF"
                      value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Expiration Date</label>
                    <input 
                      type="date" required
                      value={formData.expirationDate} onChange={e => setFormData({...formData, expirationDate: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Image URL</label>
                  <input 
                    type="url" required placeholder="https://..."
                    value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal"
                  />
                  {formData.image && (
                    <div className="mt-2 h-32 rounded-lg overflow-hidden border border-brand-border relative w-full max-w-sm">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Description</label>
                  <textarea 
                    required rows={3}
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-teal focus:ring-1 focus:ring-brand-teal resize-none"
                  ></textarea>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Status</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" name="status" value="Active" 
                        checked={formData.status === 'Active'} 
                        onChange={e => setFormData({...formData, status: e.target.value as 'Active' | 'Hidden'})}
                        className="text-brand-teal focus:ring-brand-teal bg-brand-bg border-brand-border"
                      />
                      <span className="text-sm text-gray-300">Active (Visible)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" name="status" value="Hidden" 
                        checked={formData.status === 'Hidden'} 
                        onChange={e => setFormData({...formData, status: e.target.value as 'Active' | 'Hidden'})}
                        className="text-brand-teal focus:ring-brand-teal bg-brand-bg border-brand-border"
                      />
                      <span className="text-sm text-gray-300">Hidden</span>
                    </label>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-brand-border bg-brand-bg/50 flex justify-end gap-4 mt-auto">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-brand-card transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" form="promo-form"
                className="bg-brand-teal hover:bg-brand-teal/90 text-brand-bg px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(10,188,198,0.3)]"
              >
                {editingId ? 'Save Changes' : 'Add Promotion'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
