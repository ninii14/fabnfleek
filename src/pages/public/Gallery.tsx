import { useState } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function Gallery() {
  const { gallery } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Before & After', 'Clinic Interior', 'Client Results'];

  const filteredImages = activeCategory === 'All'
    ? gallery
    : gallery.filter(img => img.category === activeCategory);

  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Gallery</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Browse through our clinic interior and see the beautiful transformations of our clients.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === category
                  ? 'bg-brand-pink text-white shadow-[0_0_15px_rgba(230,1,141,0.4)]'
                  : 'bg-brand-card text-gray-400 hover:text-white border border-brand-border hover:border-brand-pink/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry-style Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredImages.map((img) => (
            <div key={img.id} className="break-inside-avoid relative group rounded-2xl overflow-hidden border border-brand-border">
              <img 
                src={img.url} 
                alt={img.category} 
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-bg/90 via-brand-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium tracking-wide">{img.category}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredImages.length === 0 && (
          <div className="text-center py-24 text-gray-500">
            No images found in this category.
          </div>
        )}
      </div>
    </div>
  );
}
