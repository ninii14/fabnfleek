import React, { useState, useEffect } from 'react';
import { useAppContext, WebsiteContent } from '../../context/AppContext';
import { Save, CheckCircle2 } from 'lucide-react';

export default function ContentCMS() {
  const { content, updateContent } = useAppContext();
  const [formData, setFormData] = useState<WebsiteContent>(content);
  const [isSaved, setIsSaved] = useState(false);

  // Sync state if context changes
  useEffect(() => {
    setFormData(content);
  }, [content]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">Website Content</h1>
          <p className="text-gray-400">Manage text and information displayed across the public website.</p>
        </div>
        <button 
          onClick={handleSubmit}
          className="bg-brand-pink hover:bg-brand-pink/90 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(230,1,141,0.3)]"
        >
          {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
          {isSaved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Homepage Section */}
        <div className="bg-brand-card rounded-2xl border border-brand-border p-8">
          <h2 className="text-xl font-serif font-bold mb-6 text-brand-teal border-b border-brand-border pb-4">Homepage Content</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Hero Title</label>
              <input 
                type="text" name="heroTitle" required
                value={formData.heroTitle} onChange={handleChange}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Tagline / Subtitle</label>
              <input 
                type="text" name="tagline" required
                value={formData.tagline} onChange={handleChange}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-brand-card rounded-2xl border border-brand-border p-8">
          <h2 className="text-xl font-serif font-bold mb-6 text-brand-teal border-b border-brand-border pb-4">About Us Content</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">About Description</label>
              <textarea 
                name="aboutText" required rows={6}
                value={formData.aboutText} onChange={handleChange}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink resize-none"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-brand-card rounded-2xl border border-brand-border p-8">
          <h2 className="text-xl font-serif font-bold mb-6 text-brand-teal border-b border-brand-border pb-4">Contact & Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Phone Number</label>
              <input 
                type="text" name="contactPhone" required
                value={formData.contactPhone} onChange={handleChange}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <input 
                type="email" name="contactEmail" required
                value={formData.contactEmail} onChange={handleChange}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-300">Physical Address</label>
              <input 
                type="text" name="address" required
                value={formData.address} onChange={handleChange}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-300">Business Hours (Use | for new lines)</label>
              <input 
                type="text" name="businessHours" required
                value={formData.businessHours} onChange={handleChange}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
                placeholder="Mon-Fri: 9AM-7PM | Sat: 10AM-5PM | Sun: Closed"
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-brand-card rounded-2xl border border-brand-border p-8">
          <h2 className="text-xl font-serif font-bold mb-6 text-brand-teal border-b border-brand-border pb-4">Social Media Links</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Facebook URL</label>
              <input 
                type="url" name="facebookUrl"
                value={formData.facebookUrl} onChange={handleChange}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Instagram URL</label>
              <input 
                type="url" name="instagramUrl"
                value={formData.instagramUrl} onChange={handleChange}
                className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
