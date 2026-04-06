import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export default function Promotions() {
  const { promotions } = useAppContext();
  const activePromotions = promotions.filter(p => p.status === 'Active');

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Special Offers</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Exclusive packages and limited-time promotions for our valued clients.
          </p>
        </div>

        <div className="space-y-12">
          {activePromotions.map((promo, index) => (
            <div 
              key={promo.id} 
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} bg-brand-card rounded-3xl overflow-hidden border border-brand-border group`}
            >
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <img 
                  src={promo.image} 
                  alt={promo.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/80 via-transparent to-transparent md:hidden"></div>
              </div>
              
              <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
                <div className="inline-block bg-brand-pink/10 text-brand-pink border border-brand-pink/20 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide mb-6 self-start">
                  {promo.discount}
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{promo.title}</h2>
                <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                  {promo.description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-auto pt-8 border-t border-brand-border">
                  <div className="flex items-center text-sm text-gray-400 bg-brand-bg px-4 py-2 rounded-lg">
                    <Calendar size={16} className="mr-2 text-brand-teal" />
                    Valid until {new Date(promo.expirationDate).toLocaleDateString()}
                  </div>
                  <Link 
                    to="/contact" 
                    className="bg-brand-teal hover:bg-brand-teal/90 text-brand-bg px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all hover:shadow-[0_0_15px_rgba(10,188,198,0.4)]"
                  >
                    Claim Offer <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {activePromotions.length === 0 && (
          <div className="text-center py-24 bg-brand-card rounded-2xl border border-brand-border">
            <h3 className="text-2xl font-serif mb-2">No active promotions</h3>
            <p className="text-gray-500">Check back later for new offers and packages.</p>
          </div>
        )}
      </div>
    </div>
  );
}
