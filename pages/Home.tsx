import React from 'react';
import { motion } from 'framer-motion';
import { GENERATE_WA_LINK, SERVICE_AREAS } from '../constants';
import { Clock, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="w-full bg-cherie-bg overflow-hidden relative">
      
      {/* Floating Petals/Particles Animation */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-cherie-rose/5 rounded-full"
            style={{
              width: Math.random() * 50 + 20,
              height: Math.random() * 50 + 20,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0.3, 0.6, 0.3],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-28 pb-16 md:pt-20 md:pb-20 overflow-hidden">
        
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-cherie-rose/10 rounded-full blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Text Content */}
            <div className="space-y-6 md:space-y-8 relative z-10 text-center lg:text-left">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="inline-block py-1 px-3 border border-cherie-dark/20 rounded-full text-[10px] md:text-xs font-semibold tracking-widest text-cherie-dark uppercase mb-4 bg-white/50 backdrop-blur-sm">
                        Bali Home Spa Service
                    </span>
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl text-cherie-dark leading-[1.1] md:leading-[1.1]">
                        Luxury Spa <br/>
                        <span className="font-serif-italic text-cherie-rose">Delivered</span> to You
                    </h1>
                </motion.div>

                <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-cherie-text text-base md:text-lg leading-relaxed max-w-md mx-auto lg:mx-0"
                >
                    Skip the traffic and unwind in the privacy of your villa. We bring the complete 5-star spa experience directly to your doorstep.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2"
                >
                    <a 
                        href={GENERATE_WA_LINK()}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-cherie-dark text-white px-8 py-4 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-cherie-rose transition-colors shadow-lg shadow-cherie-dark/20 flex items-center justify-center gap-2 group"
                    >
                        Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <Link 
                        to="/prices"
                        className="bg-white/50 border border-cherie-dark text-cherie-dark px-8 py-4 rounded-full text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-cherie-dark hover:text-white transition-colors flex items-center justify-center"
                    >
                        View Menu
                    </Link>
                </motion.div>
                
                <div className="pt-6 md:pt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-cherie-text font-medium">
                    <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i+20}`} alt="user" className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className="flex text-yellow-400 text-xs">★★★★★</div>
                        <span className="text-xs">Loved by 500+ guests</span>
                    </div>
                </div>
            </div>

            {/* Hero Image/Video - Arch Style */}
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative h-[400px] md:h-[600px] mt-8 lg:mt-0"
            >
                <div className="absolute inset-0 rounded-t-[10rem] md:rounded-t-full overflow-hidden border-4 border-white shadow-2xl mx-auto w-full md:w-auto max-w-sm md:max-w-none bg-cherie-soft">
                    <img 
                        src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop" 
                        alt="Full Body Massage Experience" 
                        className="w-full h-full object-cover"
                    />
                </div>
                {/* Floating Badge */}
                <motion.div 
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 lg:left-[-2.5rem] lg:translate-x-0 bg-white p-4 md:p-6 rounded-2xl shadow-xl w-64 md:w-auto md:max-w-xs z-20"
                >
                    <div className="flex items-start gap-4">
                        <div className="bg-cherie-soft p-3 rounded-full text-cherie-rose">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-serif text-lg font-bold text-cherie-dark">8 AM - 11 PM</h4>
                            <p className="text-xs text-cherie-text mt-1">Ready when you are</p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center text-cherie-dark/50"
        >
           <span className="text-[10px] uppercase tracking-widest mb-1">Scroll</span>
           <div className="w-0.5 h-8 bg-gradient-to-b from-cherie-dark/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Intro Section with Arch Image on Left */}
      <section className="py-16 md:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="relative order-2 md:order-1">
                <div className="h-[400px] md:h-[500px] w-full rounded-t-full overflow-hidden border-4 border-cherie-bg shadow-xl">
                    <img 
                        src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop" 
                        alt="Authentic Spa Experience" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    />
                </div>
                <motion.div 
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Infinity }}
                  className="absolute -bottom-6 -right-6 w-32 h-32 md:w-40 md:h-40 bg-cherie-soft rounded-full -z-10"
                ></motion.div>
            </div>
            
            <div className="order-1 md:order-2 space-y-6 text-center md:text-left">
                <h3 className="text-cherie-rose tracking-[0.2em] text-xs md:text-sm font-bold uppercase">Our Philosophy</h3>
                <h2 className="font-serif text-3xl md:text-5xl text-cherie-dark leading-tight">
                    Traditional Healing, <br/> Modern Comfort.
                </h2>
                <p className="text-cherie-text leading-loose text-sm md:text-base">
                    At EXOTICA, we believe that relaxation should not require effort. 
                    Our certified therapists arrive at your villa equipped with everything needed 
                    to transform your space into a sanctuary—fresh linens, premium oils, 
                    and the gentle sounds of Bali.
                </p>
                <Link to="/about" className="inline-flex items-center text-cherie-dark font-serif-italic text-lg border-b border-cherie-rose pb-1 hover:text-cherie-rose transition-colors group">
                    Read Our Story <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 md:py-24 bg-cherie-soft/30">
          <div className="max-w-7xl mx-auto px-6">
              <div className="text-center mb-12 md:mb-16">
                  <h2 className="font-serif text-3xl md:text-4xl text-cherie-dark mb-4">Signature Treatments</h2>
                  <div className="w-16 md:w-20 h-0.5 bg-cherie-rose mx-auto"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Card 1 */}
                  <Link to="/prices" className="group block">
                      <div className="relative h-80 md:h-96 rounded-[2rem] overflow-hidden mb-6">
                          <img 
                            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop" 
                            alt="Balinese Massage" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      </div>
                      <div className="text-center">
                          <h3 className="font-serif text-xl md:text-2xl text-cherie-dark mb-2 group-hover:text-cherie-rose transition-colors">Balinese Massage</h3>
                          <p className="text-cherie-text text-sm">The classic full-body relaxation</p>
                      </div>
                  </Link>
                   {/* Card 2 */}
                   <Link to="/prices" className="group block md:-mt-12">
                      <div className="relative h-80 md:h-96 rounded-[2rem] overflow-hidden mb-6 shadow-xl">
                          <img 
                            src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop" 
                            alt="Deep Tissue" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      </div>
                      <div className="text-center">
                          <h3 className="font-serif text-xl md:text-2xl text-cherie-dark mb-2 group-hover:text-cherie-rose transition-colors">Deep Tissue</h3>
                          <p className="text-cherie-text text-sm">For muscle recovery and tension</p>
                      </div>
                  </Link>
                   {/* Card 3 */}
                   <Link to="/prices" className="group block">
                      <div className="relative h-80 md:h-96 rounded-[2rem] overflow-hidden mb-6">
                          <img 
                            src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=800&auto=format&fit=crop" 
                            alt="Couples Massage" 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      </div>
                      <div className="text-center">
                          <h3 className="font-serif text-xl md:text-2xl text-cherie-dark mb-2 group-hover:text-cherie-rose transition-colors">Couple Packages</h3>
                          <p className="text-cherie-text text-sm">Romantic relaxation side-by-side</p>
                      </div>
                  </Link>
              </div>
              
              <div className="text-center mt-12">
                  <Link to="/prices" className="inline-block border-b border-cherie-dark pb-1 text-sm font-bold tracking-widest uppercase hover:text-cherie-rose hover:border-cherie-rose transition-colors">
                      View All Treatments
                  </Link>
              </div>
          </div>
      </section>

      {/* Areas Section - List Only */}
      <section className="py-20 md:py-28 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
                 <h2 className="font-serif text-3xl md:text-5xl text-cherie-dark mb-4 uppercase tracking-widest">SERVING ALL BALI AREAS</h2>
                 <p className="text-cherie-text text-sm md:text-base">We come to your location, anywhere on the island.</p>
            </div>

            <div className="flex flex-col items-center justify-center">
                {/* Location List */}
                <div className="flex flex-wrap justify-center gap-4 max-w-4xl">
                    {SERVICE_AREAS.map(area => (
                        <motion.span 
                            key={area}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="px-6 py-4 rounded-full text-sm font-medium transition-all duration-300 cursor-default border bg-cherie-bg text-cherie-dark border-transparent hover:bg-cherie-rose hover:text-white hover:border-cherie-rose hover:shadow-lg shadow-cherie-rose/30"
                        >
                            <span className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {area}
                            </span>
                        </motion.span>
                    ))}
                    <div className="w-full mt-8 p-8 bg-cherie-soft/30 rounded-3xl border border-cherie-soft text-center max-w-lg mx-auto">
                        <p className="font-serif text-xl text-cherie-dark mb-2">Don't see your location?</p>
                        <p className="text-sm text-cherie-text mb-6">We likely cover it! Contact us to confirm.</p>
                        <a 
                             href={GENERATE_WA_LINK()}
                             target="_blank"
                             rel="noreferrer"
                             className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-cherie-rose hover:text-cherie-dark transition-colors"
                        >
                            Check Coverage <ArrowRight className="w-4 h-4 ml-2" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default Home;