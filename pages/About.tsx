import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShieldCheck, Smile, Star } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-20 min-h-screen bg-white overflow-hidden">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto px-6 text-center mb-12 md:mb-20 relative">
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-cherie-rose/10 rounded-full blur-2xl"
        ></motion.div>
        <span className="relative z-10 text-cherie-rose font-bold text-[10px] md:text-xs uppercase tracking-[0.3em]">Since 2024</span>
        <h1 className="relative z-10 font-serif text-4xl md:text-6xl text-cherie-dark mt-4 mb-4 md:mb-6">Our Story</h1>
        <p className="relative z-10 text-cherie-text max-w-lg mx-auto leading-relaxed text-sm md:text-base">
            Redefining the spa experience by combining luxury, convenience, and the timeless healing traditions of Bali.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center mb-24 md:mb-32">
        <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 text-center md:text-left order-2 md:order-1"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-cherie-dark">The Essence of Exotica</h2>
          <div className="w-16 h-1 bg-cherie-rose mx-auto md:mx-0"></div>
          <p className="text-cherie-text leading-loose text-sm md:text-base">
            Founded with a passion for holistic wellness, EXOTICA BALI HOME SPA was created to bridge the gap between luxury resort spas and the comfort of your private sanctuary.
          </p>
          <p className="text-cherie-text leading-loose text-sm md:text-base">
            We understand that after a long flight or a busy day exploring the island, the last thing you want to do is sit in traffic. That's why we bring the spa to you.
          </p>
          <div className="pt-4">
              <div className="flex justify-center md:justify-start gap-1 text-cherie-gold mb-2">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="font-serif-italic text-cherie-dark text-lg">"Relaxation is not a luxury, it's a necessity."</p>
          </div>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative order-1 md:order-2"
        >
            <div className="aspect-[4/5] rounded-t-full border-[6px] md:border-[8px] border-cherie-bg overflow-hidden shadow-2xl max-w-sm mx-auto md:max-w-none">
                <img 
                    src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop" 
                    alt="Spa Ambiance" 
                    className="w-full h-full object-cover"
                />
            </div>
            {/* Decorative Circle */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 w-32 h-32 md:w-40 md:h-40 border border-cherie-rose border-dashed rounded-full -z-10 hidden md:block opacity-50"
            ></motion.div>
        </motion.div>
      </div>

      {/* Values */}
      <div className="bg-cherie-bg py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-t-full md:rounded-b-[3rem] shadow-sm text-center border border-white hover:border-cherie-rose transition-colors duration-500 group">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="bg-cherie-soft w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:bg-cherie-rose transition-colors"
                    >
                        <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-cherie-dark group-hover:text-white transition-colors" />
                    </motion.div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 md:mb-4 text-cherie-dark">Hygienic & Safe</h3>
                    <p className="text-cherie-text text-xs md:text-sm leading-relaxed">Strict sanitation protocols. Fresh linens and sterilized equipment every time.</p>
                </div>
                <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-t-full md:rounded-b-[3rem] shadow-sm text-center border border-white hover:border-cherie-rose transition-colors duration-500 group md:-mt-12">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="bg-cherie-soft w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:bg-cherie-rose transition-colors"
                    >
                        <Heart className="w-6 h-6 md:w-8 md:h-8 text-cherie-dark group-hover:text-white transition-colors" />
                    </motion.div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 md:mb-4 text-cherie-dark">Expert Therapists</h3>
                    <p className="text-cherie-text text-xs md:text-sm leading-relaxed">Our team is certified, experienced, and genuinely cares about your well-being.</p>
                </div>
                <div className="bg-white p-8 md:p-10 rounded-3xl md:rounded-t-full md:rounded-b-[3rem] shadow-sm text-center border border-white hover:border-cherie-rose transition-colors duration-500 group">
                    <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="bg-cherie-soft w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 group-hover:bg-cherie-rose transition-colors"
                    >
                        <Smile className="w-6 h-6 md:w-8 md:h-8 text-cherie-dark group-hover:text-white transition-colors" />
                    </motion.div>
                    <h3 className="font-serif text-xl md:text-2xl font-bold mb-3 md:mb-4 text-cherie-dark">Happiness First</h3>
                    <p className="text-cherie-text text-xs md:text-sm leading-relaxed">We pride ourselves on our reviews. Your relaxation is our ultimate goal.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;