import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Contact() {
  const { content } = useAppContext();

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We'd love to hear from you. Book an appointment or reach out with any questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-serif font-bold mb-8">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-card flex items-center justify-center border border-brand-border shrink-0">
                    <MapPin className="text-brand-pink" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Location</h3>
                    <p className="text-gray-400 leading-relaxed">{content.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-card flex items-center justify-center border border-brand-border shrink-0">
                    <Phone className="text-brand-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Phone</h3>
                    <p className="text-gray-400 leading-relaxed">{content.contactPhone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-card flex items-center justify-center border border-brand-border shrink-0">
                    <Mail className="text-brand-pink" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Email</h3>
                    <p className="text-gray-400 leading-relaxed">{content.contactEmail}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-brand-card flex items-center justify-center border border-brand-border shrink-0">
                    <Clock className="text-brand-teal" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Business Hours</h3>
                    <div className="text-gray-400 leading-relaxed whitespace-pre-line">
                      {content.businessHours.split('|').map((line, i) => (
                        <div key={i}>{line.trim()}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="h-64 bg-brand-card rounded-2xl border border-brand-border overflow-hidden relative group">
              <div className="absolute inset-0 bg-brand-bg/50 flex items-center justify-center z-10 group-hover:bg-brand-bg/30 transition-colors">
                <div className="bg-brand-card/90 backdrop-blur-sm px-6 py-3 rounded-full border border-brand-border text-sm font-medium flex items-center gap-2">
                  <MapPin size={16} className="text-brand-pink" /> View on Google Maps
                </div>
              </div>
              <img 
                src="https://picsum.photos/seed/map/800/400" 
                alt="Map Location" 
                className="w-full h-full object-cover grayscale opacity-50"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-brand-card p-8 md:p-10 rounded-3xl border border-brand-border shadow-2xl">
            <h2 className="text-2xl font-serif font-bold mb-8">Send us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-gray-300">First Name</label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-gray-300">Last Name</label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="service" className="text-sm font-medium text-gray-300">Service of Interest</label>
                <select 
                  id="service" 
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors appearance-none"
                >
                  <option value="">Select a service</option>
                  <option value="hair">Hair Services</option>
                  <option value="facial">Facial Treatments</option>
                  <option value="nails">Nail Services</option>
                  <option value="aesthetic">Aesthetic Procedures</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full bg-brand-bg border border-brand-border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-pink focus:ring-1 focus:ring-brand-pink transition-colors resize-none"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand-pink hover:bg-brand-pink/90 text-white px-6 py-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(230,1,141,0.3)] hover:shadow-[0_0_20px_rgba(230,1,141,0.5)]"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
