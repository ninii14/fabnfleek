import { useAppContext } from '../../context/AppContext';

export default function About() {
  const { content, team } = useAppContext();

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* About Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="relative">
            <div className="absolute -inset-4 bg-brand-pink/20 blur-3xl rounded-full opacity-50"></div>
            <img 
              src="https://picsum.photos/seed/about/800/1000" 
              alt="About Fab and Fleek" 
              className="relative z-10 rounded-3xl w-full h-[600px] object-cover border border-brand-border shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="space-y-8">
            <div>
              <h2 className="text-brand-teal font-semibold tracking-wider uppercase text-sm mb-3">Our Story</h2>
              <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                Enhancing Your Natural Beauty
              </h1>
            </div>
            
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>{content.aboutText}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-brand-border">
              <div>
                <div className="text-4xl font-serif font-bold text-brand-pink mb-2">10+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-serif font-bold text-brand-teal mb-2">5k+</div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Meet Our Experts</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our team of highly trained professionals is dedicated to providing you with exceptional service and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map(member => (
            <div key={member.id} className="bg-brand-card rounded-2xl overflow-hidden border border-brand-border group">
              <div className="h-80 overflow-hidden relative">
                <img 
                  src={member.photo} 
                  alt={member.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-serif font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-brand-teal font-medium text-sm tracking-wide uppercase">{member.role}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
