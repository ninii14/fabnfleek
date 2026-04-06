import { Link } from 'react-router-dom';
import { ArrowRight, Star, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Home() {
  const { content, services, promotions, gallery } = useAppContext();

  const featuredServices = services.filter(s => s.status === 'Active').slice(0, 3);
  const activePromotions = promotions.filter(p => p.status === 'Active').slice(0, 2);
  const galleryPreview = gallery.slice(0, 4);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/salonhero/1920/1080" 
            alt="Salon Interior" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg/80 via-brand-bg/60 to-brand-bg"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 tracking-tight leading-tight">
            {content.heroTitle}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
            {content.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-brand-pink hover:bg-brand-pink/90 text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-[0_0_20px_rgba(230,1,141,0.4)] hover:shadow-[0_0_30px_rgba(230,1,141,0.6)] hover:-translate-y-1"
            >
              Book Appointment
            </Link>
            <Link 
              to="/services" 
              className="w-full sm:w-auto bg-transparent border border-white/20 hover:border-brand-teal hover:text-brand-teal text-white px-8 py-4 rounded-full text-lg font-medium transition-all hover:-translate-y-1"
            >
              View Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Signature Services</h2>
            <p className="text-gray-400 max-w-2xl">Experience luxury treatments designed to enhance your natural beauty.</p>
          </div>
          <Link to="/services" className="hidden md:flex items-center gap-2 text-brand-teal hover:text-brand-teal/80 font-medium transition-colors">
            View All <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map(service => (
            <div key={service.id} className="group bg-brand-card rounded-2xl overflow-hidden border border-brand-border hover:border-brand-teal/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(10,188,198,0.1)]">
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-brand-bg/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-brand-pink border border-brand-pink/20">
                  {service.price}
                </div>
              </div>
              <div className="p-6">
                <div className="text-xs font-semibold text-brand-teal uppercase tracking-wider mb-2">{service.category}</div>
                <h3 className="text-xl font-serif font-semibold mb-3">{service.name}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4">{service.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock size={16} className="mr-2" />
                  {service.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <Link to="/services" className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-teal/80 font-medium transition-colors">
            View All Services <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      {/* Promotions */}
      {activePromotions.length > 0 && (
        <section className="bg-brand-card py-24 border-y border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Current Offers</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Take advantage of our limited-time beauty packages and promotions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {activePromotions.map(promo => (
                <div key={promo.id} className="relative rounded-2xl overflow-hidden group">
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={promo.image} 
                      alt={promo.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/80 to-transparent"></div>
                  </div>
                  <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-end min-h-[400px]">
                    <div className="inline-block bg-brand-pink text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-4 self-start shadow-[0_0_15px_rgba(230,1,141,0.5)]">
                      {promo.discount}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">{promo.title}</h3>
                    <p className="text-gray-300 mb-6 max-w-md">{promo.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">Valid until {new Date(promo.expirationDate).toLocaleDateString()}</span>
                      <Link to="/contact" className="text-brand-teal hover:text-white font-medium flex items-center gap-2 transition-colors">
                        Claim Offer <ArrowRight size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Client Love</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Read what our beautiful clients have to say about their experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {([] as any[]).map((testimonial, i) => (
            <div key={i} className="bg-brand-card p-8 rounded-2xl border border-brand-border relative">
              <div className="text-brand-pink mb-6 opacity-20 absolute top-6 right-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 21L16.41 14.592C16.639 13.974 16.753 13.33 16.753 12.671V3H22V12.671C22 15.542 21.058 18.232 19.346 20.354L14.017 21ZM3.017 21L5.41 14.592C5.639 13.974 5.753 13.33 5.753 12.671V3H11V12.671C11 15.542 10.058 18.232 8.346 20.354L3.017 21Z" />
                </svg>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} size={16} className="fill-brand-teal text-brand-teal" />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic leading-relaxed">"{testimonial.text}"</p>
              <div className="font-medium text-white">{testimonial.name}</div>
            </div>
          ))}
        </div>
        <div className="text-center py-8 text-gray-500">No testimonials available.</div>
      </section>

      {/* Gallery Preview */}
      {galleryPreview.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Our Work</h2>
              <p className="text-gray-400 max-w-2xl">A glimpse into our clinic and the beautiful results we achieve.</p>
            </div>
            <Link to="/gallery" className="hidden md:flex items-center gap-2 text-brand-teal hover:text-brand-teal/80 font-medium transition-colors">
              View Gallery <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {galleryPreview.map((img, i) => (
              <div key={img.id} className={`rounded-xl overflow-hidden ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img 
                  src={img.url} 
                  alt={img.category} 
                  className="w-full h-full object-cover aspect-square hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link to="/gallery" className="inline-flex items-center gap-2 text-brand-teal hover:text-brand-teal/80 font-medium transition-colors">
              View Full Gallery <ArrowRight size={20} />
            </Link>
          </div>
        </section>
      )}

      {/* Contact Info Banner */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-brand-pink rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_rgba(230,1,141,0.2)]">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold text-white mb-2">Ready for a transformation?</h2>
            <p className="text-white/80">Book your consultation today and let us take care of the rest.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a href={`tel:${content.contactPhone}`} className="bg-white text-brand-pink hover:bg-gray-100 px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-colors">
              <Phone size={18} /> Call Us
            </a>
            <Link to="/contact" className="bg-transparent border border-white text-white hover:bg-white/10 px-6 py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-colors">
              <MapPin size={18} /> Find Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
