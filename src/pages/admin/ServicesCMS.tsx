import React, { useState } from 'react';
import { useAppContext, Service } from '../../context/AppContext';
import { Plus, Edit2, Trash2, X, Check } from 'lucide-react';

export default function ServicesCMS() {
  const { services, addService, updateService, deleteService } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<Service>>({
    name: '',
    category: 'Hair Services',
    description: '',
    price: '',
    duration: '',
    image: '',
    status: 'Active'
  });

  const categories = ['Hair Services', 'Nail Services', 'Facial Treatments', 'Skin Treatments', 'Body Treatments', 'Aesthetic Procedures'];

  const handleOpenModal = (service?: Service) => {
    if (service) {
      setFormData(service);
      setEditingId(service.id);
    } else {
      setFormData({
        name: '', category: 'Hair Services', description: '', price: '', duration: '', image: '', status: 'Active'
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateService(editingId, formData);
    } else {
      addService({
        ...formData,
        id: Date.now().toString(),
      } as Service);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Manage Services</h1>
          <p className="text-gray-400">Add, edit, or remove services from the public website.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-brand-pink hover:bg-brand-pink/90 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(230,1,141,0.3)]"
        >
          <Plus size={18} /> Add Service
        </button>
      </div>

      <div className="bg-brand-card rounded-2xl border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-brand-border bg-brand-bg/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Price & Duration</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-brand-bg/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <img src={service.image} alt="" className="w-12 h-12 rounded-lg object-cover border border-brand-border" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-medium text-white">{service.name}</div>
                        <div className="text-xs text-gray-500 line-clamp-1 max-w-xs">{service.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-300">{service.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-brand-teal">{service.price}</div>
                    <div className="text-xs text-gray-500">{service.duration}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      service.status === 'Active' ? 'bg-green-400/10 text-green-400 border border-green-400/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'
                    }`}>
                      {service.status === 'Active' && <Check size={12} />}
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={() => handleOpenModal(service)}
                        className="p-2 text-gray-400 hover:text-brand-teal hover:bg-brand-teal/10 rounded-lg transition-colors"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => deleteService(service.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {services.length === 0 && (
          <div className="p-8 text-center text-gray-500">No services found. Add one to get started.</div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-brand-card w-full max-w-2xl rounded-3xl border border-brand-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-brand-border">
              <h2 className="text-xl font-serif font-bold">{editingId ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="service-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Service Name</label>
                    <input 
                      type="text" required
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Category</label>
                    <select 
                      value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink appearance-none"
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Price</label>
                    <input 
                      type="text" required placeholder="e.g. $120 or $50+"
                      value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Duration</label>
                    <input 
                      type="text" required placeholder="e.g. 60 mins"
                      value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})}
                      className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Image URL</label>
                  <input 
                    type="url" required placeholder="https://..."
                    value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                  />
                  {formData.image && (
                    <div className="mt-2 h-32 rounded-lg overflow-hidden border border-brand-border relative w-48">
                      <img src={formData.image} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Description</label>
                  <textarea 
                    required rows={3}
                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink resize-none"
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
                        className="text-brand-pink focus:ring-brand-pink bg-brand-bg border-brand-border"
                      />
                      <span className="text-sm text-gray-300">Active (Visible)</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="radio" name="status" value="Hidden" 
                        checked={formData.status === 'Hidden'} 
                        onChange={e => setFormData({...formData, status: e.target.value as 'Active' | 'Hidden'})}
                        className="text-brand-pink focus:ring-brand-pink bg-brand-bg border-brand-border"
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
                type="submit" form="service-form"
                className="bg-brand-pink hover:bg-brand-pink/90 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(230,1,141,0.3)]"
              >
                {editingId ? 'Save Changes' : 'Add Service'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
