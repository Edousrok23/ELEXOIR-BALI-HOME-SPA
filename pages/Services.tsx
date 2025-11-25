import React from 'react';
import { SERVICES, GENERATE_WA_LINK } from '../constants';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const Services: React.FC = () => {
  return (
    <div className="min-h-screen bg-cherie-bg pt-28 pb-16 md:pt-32 md:pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-20 space-y-4">
          <span className="text-cherie-rose tracking-[0.2em] text-xs font-bold uppercase">Our Menu</span>
          <h1 className="font-serif text-4xl md:text-6xl text-cherie-dark">Spa Treatments</h1>
          <p className="text-cherie-text max-w-2xl mx-auto font-light text-sm md:text-base">
            Select your journey to relaxation. All treatments are performed in the comfort of your home.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-4 shadow-sm hover:shadow-2xl md:hover:-translate-y-2 md:hover:scale-[1.01] transition-all duration-500 group border border-cherie-soft flex flex-col"
            >
              {/* Image */}
              <div className="h-56 md:h-64 overflow-hidden rounded-[1.5rem] md:rounded-[2rem] relative shrink-0">
                <img 
                  src={service.image} 
                  alt={service.name} 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest text-cherie-dark uppercase">
                    {service.category}
                </div>
              </div>
              
              <div className="p-4 md:p-6 flex flex-col flex-grow">
                <div className="mb-4">
                    <h3 className="font-serif text-xl md:text-2xl text-cherie-dark mb-2 group-hover:text-cherie-rose transition-colors">{service.name}</h3>
                    <p className="text-cherie-text text-sm leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                </div>

                <div className="mt-auto pt-6 border-t border-cherie-soft/50">
                    <div className="flex justify-between items-end mb-6">
                        <div className="text-[10px] md:text-xs text-cherie-text font-medium uppercase tracking-wide">
                            {service.duration}
                        </div>
                        <div className="font-serif text-lg md:text-xl text-cherie-dark font-bold">
                            {service.price}
                        </div>
                    </div>
                    
                    <a 
                        href={GENERATE_WA_LINK(service.name)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-cherie-bg hover:bg-cherie-dark hover:text-white text-cherie-dark py-3 md:py-3.5 rounded-xl transition-all duration-300 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 group-hover:bg-cherie-rose group-hover:text-white"
                    >
                        Book Appointment <ArrowUpRight className="w-4 h-4" />
                    </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;