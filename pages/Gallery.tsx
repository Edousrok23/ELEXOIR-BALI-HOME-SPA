import React from 'react';
import { motion } from 'framer-motion';

const IMAGES = [
    "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1596178065849-d7547146e271?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop",
];

const Gallery: React.FC = () => {
  return (
    <div className="pt-24 pb-12 min-h-screen bg-gray-50">
       <div className="max-w-7xl mx-auto px-4 text-center mb-12">
            <h1 className="font-serif text-4xl text-gray-800">Our Gallery</h1>
            <p className="text-gray-500 mt-2">Glimpses of tranquility</p>
       </div>

       <div className="columns-1 md:columns-2 lg:columns-3 gap-6 max-w-7xl mx-auto px-4 space-y-6">
            {IMAGES.map((src, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="break-inside-avoid rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                    <img 
                        src={src} 
                        alt="Spa Gallery" 
                        loading="lazy" 
                        className="w-full h-auto object-cover hover:scale-105 transition-transform duration-500" 
                    />
                </motion.div>
            ))}
       </div>
    </div>
  );
};

export default Gallery;