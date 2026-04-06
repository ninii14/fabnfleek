import React, { useState } from 'react';
import { useAppContext, GalleryImage } from '../../context/AppContext';
import { Upload, Trash2, X } from 'lucide-react';

export default function GalleryCMS() {
  const { gallery, addGalleryImage, deleteGalleryImage } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('All');
  
  const [formData, setFormData] = useState<Partial<GalleryImage>>({
    url: '',
    category: 'Before & After'
  });

  const categories = ['Before & After', 'Clinic Interior', 'Client Results'];
  const tabs = ['All', ...categories];

  const filteredImages = activeTab === 'All' 
    ? gallery 
    : gallery.filter(img => img.category === activeTab);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGalleryImage({
      ...formData,
      id: Date.now().toString(),
    } as GalleryImage);
    setIsModalOpen(false);
    setFormData({ url: '', category: 'Before & After' });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Manage Gallery</h1>
          <p className="text-gray-400">Upload and organize images for the public gallery.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
        >
          <Upload size={18} /> Upload Image
        </button>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-brand-border pb-px">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab 
                ? 'border-purple-500 text-purple-400' 
                : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {filteredImages.map((img) => (
          <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden border border-brand-border bg-brand-card">
            <img src={img.url} alt={img.category} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
              <div className="self-end">
                <button 
                  onClick={() => deleteGalleryImage(img.id)}
                  className="p-1.5 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-colors backdrop-blur-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <div>
                <span className="text-xs font-medium text-white bg-brand-bg/80 px-2 py-1 rounded backdrop-blur-sm">
                  {img.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="bg-brand-card rounded-2xl border border-brand-border p-12 text-center text-gray-500">
          No images found in this category.
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-brand-card w-full max-w-md rounded-3xl border border-brand-border shadow-2xl overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-brand-border">
              <h2 className="text-xl font-serif font-bold">Upload Image</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              <form id="gallery-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Image URL</label>
                  <input 
                    type="url" required placeholder="https://..."
                    value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  {formData.url && (
                    <div className="mt-4 aspect-video rounded-lg overflow-hidden border border-brand-border bg-brand-bg flex items-center justify-center">
                      <img src={formData.url} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" onError={(e) => (e.currentTarget.style.display = 'none')} />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Category</label>
                  <select 
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 appearance-none"
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-brand-border bg-brand-bg/50 flex justify-end gap-4">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-xl font-medium text-gray-400 hover:text-white hover:bg-brand-card transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" form="gallery-form"
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)]"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
