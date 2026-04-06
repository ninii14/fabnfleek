import React, { useState } from 'react';
import { useAppContext, TeamMember } from '../../context/AppContext';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function TeamCMS() {
  const { team, addTeamMember, updateTeamMember, deleteTeamMember } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: '',
    role: '',
    photo: '',
    bio: ''
  });

  const handleOpenModal = (member?: TeamMember) => {
    if (member) {
      setFormData(member);
      setEditingId(member.id);
    } else {
      setFormData({ name: '', role: '', photo: '', bio: '' });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateTeamMember(editingId, formData);
    } else {
      addTeamMember({
        ...formData,
        id: Date.now().toString(),
      } as TeamMember);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Manage Team</h1>
          <p className="text-gray-400">Add or update staff profiles shown on the About page.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        >
          <Plus size={18} /> Add Staff
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {team.map((member) => (
          <div key={member.id} className="bg-brand-card rounded-2xl border border-brand-border overflow-hidden flex flex-col">
            <div className="h-64 relative">
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 flex gap-2">
                <button onClick={() => handleOpenModal(member)} className="p-2 bg-brand-bg/80 text-white hover:text-blue-400 rounded-lg backdrop-blur-sm transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => deleteTeamMember(member.id)} className="p-2 bg-brand-bg/80 text-white hover:text-red-400 rounded-lg backdrop-blur-sm transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <h3 className="text-xl font-serif font-bold mb-1">{member.name}</h3>
              <p className="text-sm font-medium text-blue-400 mb-4">{member.role}</p>
              <p className="text-sm text-gray-400 line-clamp-4">{member.bio}</p>
            </div>
          </div>
        ))}
      </div>

      {team.length === 0 && (
        <div className="bg-brand-card rounded-2xl border border-brand-border p-12 text-center text-gray-500">
          No team members found. Add your staff to showcase them.
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-brand-card w-full max-w-md rounded-3xl border border-brand-border shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-6 border-b border-brand-border">
              <h2 className="text-xl font-serif font-bold">{editingId ? 'Edit Staff Profile' : 'Add Staff Profile'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="team-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Full Name</label>
                  <input 
                    type="text" required
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Role / Title</label>
                  <input 
                    type="text" required placeholder="e.g. Master Stylist"
                    value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Photo URL</label>
                  <input 
                    type="url" required placeholder="https://..."
                    value={formData.photo} onChange={e => setFormData({...formData, photo: e.target.value})}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  {formData.photo && (
                    <div className="mt-2 h-32 w-32 rounded-full overflow-hidden border border-brand-border relative mx-auto">
                      <img src={formData.photo} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Short Bio</label>
                  <textarea 
                    required rows={4}
                    value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})}
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  ></textarea>
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
                type="submit" form="team-form"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                {editingId ? 'Save Changes' : 'Add Staff'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
