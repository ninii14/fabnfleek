import { useState } from 'react';
import { Clock } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Services() {
  const { services } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const activeServices = services.filter(s => s.status === 'Active');
  
  const categories = ['All', ...Array.from(new Set(activeServices.map(s => s.category)))];

  const filteredServices = activeCategory === 'All' 
    ? activeServices 
    : activeServices.filter(s => s.category === activeCategory);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Services</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our comprehensive range of luxury beauty and aesthetic treatments.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-brand-teal text-brand-bg shadow-[0_0_15px_rgba(10,188,198,0.4)]'
                  : 'bg-brand-card text-gray-400 hover:text-white border border-brand-border hover:border-brand-teal/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <div key={service.id} className="group bg-brand-card rounded-2xl overflow-hidden border border-brand-border hover:border-brand-pink/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(230,1,141,0.1)] flex flex-col">
              <div className="h-64 overflow-hidden relative shrink-0">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 bg-brand-bg/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold text-brand-teal border border-brand-teal/20">
                  {service.price}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <div className="text-xs font-semibold text-brand-pink uppercase tracking-wider mb-3">{service.category}</div>
                <h3 className="text-2xl font-serif font-semibold mb-4">{service.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow">{service.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-brand-border mt-auto">
                  <div className="flex items-center text-sm text-gray-400 font-medium">
                    <Clock size={16} className="mr-2 text-brand-teal" />
                    {service.duration}
                  </div>
                  <button className="text-sm font-medium text-white hover:text-brand-pink transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            No services found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
