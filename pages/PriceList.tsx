import React, { useState, useRef, useEffect } from 'react';
import { SERVICES, WHATSAPP_NUMBER, parseServiceOptions, formatPrice } from '../constants';
import { ServiceItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, X, Calendar, Clock, MapPin, User, Send, Sparkles, 
  Flower, Droplets, Zap, Flame, Footprints, MoveDiagonal, Waves, 
  Users, Gift, Brain, ChevronLeft, ChevronRight, Plus, Trash2, Tag
} from 'lucide-react';

interface BookingGuest {
  serviceId: string;
  serviceName: string;
  duration: string;
  price: string;
  numericPrice: number;
}

const PriceList: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [contactName, setContactName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  
  // Booking Items (Array of guests/treatments)
  const [bookings, setBookings] = useState<BookingGuest[]>([]);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const openBookingModal = (service: ServiceItem) => {
    setSelectedService(service);
    const options = parseServiceOptions(service);
    
    // Initialize with 1 guest for the selected service
    setBookings([{
        serviceId: service.id,
        serviceName: service.name,
        duration: options[0]?.duration || '',
        price: options[0]?.price || '',
        numericPrice: options[0]?.numericValue || 0
    }]);
    
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const handleAddGuest = () => {
      // Add a default booking (copying the service of the first booking or default)
      const defaultServiceId = bookings.length > 0 ? bookings[0].serviceId : 'balinese-massage';
      const service = SERVICES.find(s => s.id === defaultServiceId) || SERVICES[0];
      const options = parseServiceOptions(service);
      
      setBookings([...bookings, {
        serviceId: service.id,
        serviceName: service.name,
        duration: options[0]?.duration || '',
        price: options[0]?.price || '',
        numericPrice: options[0]?.numericValue || 0
      }]);
  };

  const handleRemoveGuest = (index: number) => {
      if (bookings.length > 1) {
          const newBookings = [...bookings];
          newBookings.splice(index, 1);
          setBookings(newBookings);
      }
  };

  const handleBookingChange = (index: number, field: keyof BookingGuest, value: string) => {
      const newBookings = [...bookings];
      const booking = { ...newBookings[index] };

      if (field === 'serviceId') {
          // If service changes, we need to update name and reset duration/price
          const service = SERVICES.find(s => s.id === value);
          if (service) {
              const options = parseServiceOptions(service);
              booking.serviceId = service.id;
              booking.serviceName = service.name;
              booking.duration = options[0]?.duration || '';
              booking.price = options[0]?.price || '';
              booking.numericPrice = options[0]?.numericValue || 0;
          }
      } else if (field === 'duration') {
          // If duration changes, update price
          const service = SERVICES.find(s => s.id === booking.serviceId);
          if (service) {
              const options = parseServiceOptions(service);
              const selectedOption = options.find(o => o.duration === value);
              if (selectedOption) {
                  booking.duration = value;
                  booking.price = selectedOption.price;
                  booking.numericPrice = selectedOption.numericValue;
              }
          }
      }

      newBookings[index] = booking;
      setBookings(newBookings);
  };

  const calculateTotal = () => {
      const total = bookings.reduce((sum, item) => sum + item.numericPrice, 0);
      return formatPrice(total);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let bookingDetails = "";
    bookings.forEach((b, i) => {
        bookingDetails += `\nGuest ${i + 1}: ${b.serviceName} (${b.duration})`;
    });

    const total = calculateTotal();

    const text = `Hello Exotica Bali, I would like to make a booking.\n\n*Booking Details:*${bookingDetails}\n\n*Total Estimate:* ${total}\n\n*Contact Info:*\nName: ${contactName}\nDate: ${date}\nTime: ${time}\nLocation: ${location}`;
    
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    closeModal();
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current } = scrollContainerRef;
      const scrollAmount = direction === 'left' ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Helper to get icon based on service ID
  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'balinese-massage': return <Flower className="w-8 h-8 text-cherie-rose" />;
      case 'aromatherapy-massage': return <Droplets className="w-8 h-8 text-cherie-rose" />;
      case 'deep-tissue-massage': return <Zap className="w-8 h-8 text-cherie-rose" />;
      case 'hot-stone-massage': return <Flame className="w-8 h-8 text-cherie-rose" />;
      case 'reflexology-foot-massage': return <Footprints className="w-8 h-8 text-cherie-rose" />;
      case 'thai-massage': return <MoveDiagonal className="w-8 h-8 text-cherie-rose" />;
      case 'lomi-lomi-massage': return <Waves className="w-8 h-8 text-cherie-rose" />;
      case 'four-hands-massage': return <Users className="w-8 h-8 text-cherie-rose" />;
      case 'face-acupressure-massage': return <Sparkles className="w-8 h-8 text-cherie-rose" />;
      case 'head-neck-shoulder-massage': return <Brain className="w-8 h-8 text-cherie-rose" />;
      case 'couple-massage': return <Users className="w-8 h-8 text-cherie-rose" />;
      case 'customised-spa-package': return <Gift className="w-8 h-8 text-cherie-rose" />;
      default: return <Flower className="w-8 h-8 text-cherie-rose" />;
    }
  };

  return (
    <div className="min-h-screen bg-cherie-bg pt-28 pb-16 md:pt-32 md:pb-20 flex flex-col justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 w-full relative">
        
        {/* Background Decorative - Animated */}
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-64 h-64 md:w-96 md:h-96 bg-cherie-rose/10 rounded-full blur-3xl pointer-events-none"
        />
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-0 right-0 w-80 h-80 bg-cherie-gold/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="mb-6 md:mb-12 pl-2 md:pl-0 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="font-serif text-4xl md:text-5xl text-cherie-dark mb-2">Price List</h2>
            <p className="text-cherie-text text-sm md:text-base flex items-center gap-2">
              <span className="w-8 h-0.5 bg-cherie-rose inline-block"></span>
              Select a treatment to book
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Area */}
        <div className="relative group">
           
           {/* Desktop Navigation Arrows */}
           <button 
             onClick={() => scroll('left')}
             className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 bg-white p-4 rounded-full shadow-xl text-cherie-dark hover:bg-cherie-rose hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-300"
             aria-label="Scroll left"
           >
             <ChevronLeft className="w-6 h-6" />
           </button>
           
           <button 
             onClick={() => scroll('right')}
             className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 bg-white p-4 rounded-full shadow-xl text-cherie-dark hover:bg-cherie-rose hover:text-white transition-all opacity-0 group-hover:opacity-100 duration-300"
             aria-label="Scroll right"
           >
             <ChevronRight className="w-6 h-6" />
           </button>

           {/* Scroll Container */}
           <div 
             ref={scrollContainerRef}
             className="flex overflow-x-auto space-x-4 md:space-x-8 pb-12 snap-x snap-mandatory px-4 md:px-4 no-scrollbar relative z-10 items-stretch"
           >
            {SERVICES.map((service, index) => {
              // Advanced string parsing for description, examples, and benefits
              const benefitsSplit = service.description.split(/Benefits?:/i);
              let descriptionText = benefitsSplit[0];
              const benefitsText = benefitsSplit.length > 1 ? benefitsSplit[1].trim() : null;

              // Check for Examples in the main description part
              const examplesSplit = descriptionText.split(/Examples?:/i);
              let examplesText = null;
              if (examplesSplit.length > 1) {
                  descriptionText = examplesSplit[0].trim();
                  examplesText = examplesSplit[1].trim();
              }
              
              // Determine if it's a package to change the label
              const isPricingDetail = service.id === 'customised-spa-package' || (benefitsText && benefitsText.toLowerCase().includes('pricing'));
              const benefitLabel = isPricingDetail ? 'Price Details' : 'Benefits';
              const benefitIcon = isPricingDetail ? <Tag className="w-3 h-3 text-cherie-rose" /> : <Sparkles className="w-3 h-3 text-cherie-rose animate-pulse" />;

              return (
                <motion.div
                  key={service.id}
                  layoutId={`card-${service.id}`}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="snap-center shrink-0 w-[85vw] sm:w-[380px] md:w-[450px] bg-white rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 shadow-xl shadow-cherie-dark/5 border border-white relative flex flex-col justify-between group hover:-translate-y-2 transition-transform duration-500"
                >
                   <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-cherie-soft rounded-bl-[2rem] rounded-tr-[2.5rem] md:rounded-bl-[3rem] md:rounded-tr-[3rem] -z-0 opacity-50 transition-all group-hover:bg-cherie-rose/20"></div>

                   <div className="relative z-10">
                     <div className="flex justify-between items-start mb-4 md:mb-6">
                        <div className="text-[10px] font-bold tracking-[0.3em] text-cherie-rose uppercase mt-2">
                            {service.category}
                        </div>
                        <motion.div 
                          whileHover={{ rotate: 180, scale: 1.2 }}
                          transition={{ duration: 0.8 }}
                          className="bg-cherie-bg p-2 md:p-3 rounded-full shadow-sm group-hover:bg-white"
                        >
                          {getServiceIcon(service.id)}
                        </motion.div>
                     </div>
                     
                     <h3 className="font-serif text-2xl md:text-4xl text-cherie-dark mb-4 md:mb-6 leading-tight group-hover:text-cherie-rose transition-colors">{service.name}</h3>
                     
                     {/* Description Area */}
                     <div className="mb-6 md:mb-8 flex flex-col gap-4">
                        <p className="text-cherie-text text-sm leading-6 md:leading-7 font-light line-clamp-4 md:line-clamp-none">
                          {descriptionText}
                        </p>

                        {/* Examples Block */}
                        {examplesText && (
                            <div className="bg-cherie-bg/50 p-3 rounded-xl border border-cherie-soft/50">
                                <span className="text-[10px] uppercase tracking-widest text-cherie-rose font-bold block mb-1">Examples</span>
                                <p className="text-xs text-cherie-text italic leading-relaxed">
                                    {examplesText}
                                </p>
                            </div>
                        )}
                        
                        {/* Benefits / Price Details Block */}
                        {benefitsText && (
                          <div className="bg-cherie-soft/30 p-3 md:p-4 rounded-2xl border border-cherie-soft/50 group-hover:bg-cherie-soft/60 transition-colors">
                            <div className="flex items-center gap-2 mb-2">
                               {benefitIcon}
                               <span className="font-bold text-cherie-dark text-[10px] md:text-xs uppercase tracking-wide">{benefitLabel}</span>
                            </div>
                            <p className="text-cherie-text text-xs md:text-sm leading-5 md:leading-6 font-light line-clamp-2 md:line-clamp-none">
                              {benefitsText}
                            </p>
                          </div>
                        )}
                     </div>
                     
                     <div className="flex items-center gap-3">
                        <span className="px-3 py-1 md:px-4 md:py-1 bg-cherie-bg rounded-full text-[10px] md:text-xs font-bold text-cherie-dark uppercase tracking-wide flex items-center gap-2">
                            <Clock className="w-3 h-3" /> {service.duration}
                        </span>
                     </div>
                   </div>

                   <div className="mt-6 md:mt-8 relative z-10 pt-4 md:pt-6 border-t border-cherie-soft">
                     <div className="flex justify-between items-end mb-4 md:mb-6">
                        <span className="text-[10px] md:text-xs text-cherie-text uppercase tracking-widest">Investment</span>
                        <span className="text-lg md:text-2xl font-serif text-cherie-dark font-bold">{service.price}</span>
                     </div>
                     <button 
                        onClick={() => openBookingModal(service)}
                        className="flex items-center justify-between w-full bg-cherie-dark text-white p-4 md:p-5 rounded-xl md:rounded-2xl hover:bg-cherie-rose transition-colors duration-300 shadow-lg group/btn active:scale-95"
                     >
                        <span className="font-bold text-xs md:text-sm uppercase tracking-widest">Book Treatment</span>
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover/btn:translate-x-1 transition-transform" />
                     </button>
                   </div>
                </motion.div>
              );
            })}
            
            <div className="w-2 md:w-10 shrink-0" />
           </div>
        </div>

        {/* Mobile Swipe Indicator */}
        <div className="md:hidden flex justify-center mt-2 pb-8 gap-3 text-cherie-text/60 text-xs items-center animate-pulse font-medium tracking-wide">
           <ChevronLeft className="w-4 h-4" />
           <span>Swipe to explore</span>
           <ChevronRight className="w-4 h-4" />
       </div>

      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {isModalOpen && selectedService && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closeModal}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-[2rem] p-6 md:p-8 w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <span className="text-cherie-rose text-[10px] font-bold uppercase tracking-widest">Booking Request</span>
                  <h3 className="font-serif text-2xl text-cherie-dark mt-1 leading-tight">Your Details</h3>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-cherie-bg rounded-full transition-colors">
                  <X className="w-5 h-5 text-cherie-dark" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-cherie-dark uppercase tracking-wide flex items-center gap-2">
                    <User className="w-3 h-3" /> Your Name
                  </label>
                  <input 
                    type="text" 
                    name="name" 
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Sarah Jones"
                    className="w-full bg-cherie-bg border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cherie-rose/50 outline-none transition-all"
                  />
                </div>
                
                {/* Dynamic Guests List */}
                <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                    <label className="text-xs font-bold text-cherie-dark uppercase tracking-wide flex items-center gap-2 mb-2">
                        <Users className="w-3 h-3" /> Treatments / Guests
                    </label>
                    
                    {bookings.map((guest, index) => {
                        const guestService = SERVICES.find(s => s.id === guest.serviceId);
                        const options = guestService ? parseServiceOptions(guestService) : [];

                        return (
                            <div key={index} className="bg-cherie-soft/30 p-4 rounded-2xl border border-cherie-soft relative">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-bold text-cherie-rose uppercase tracking-wide">Guest {index + 1}</span>
                                    {bookings.length > 1 && (
                                        <button 
                                            type="button" 
                                            onClick={() => handleRemoveGuest(index)}
                                            className="text-cherie-text hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                                
                                <div className="space-y-3">
                                    {/* Service Selector */}
                                    <select 
                                        value={guest.serviceId}
                                        onChange={(e) => handleBookingChange(index, 'serviceId', e.target.value)}
                                        className="w-full bg-white border border-cherie-soft rounded-xl px-3 py-2 text-sm focus:ring-1 focus:ring-cherie-rose outline-none"
                                    >
                                        {SERVICES.map(s => (
                                            <option key={s.id} value={s.id}>{s.name}</option>
                                        ))}
                                    </select>

                                    {/* Duration Selector */}
                                    <div className="flex gap-2">
                                        <select
                                            value={guest.duration}
                                            onChange={(e) => handleBookingChange(index, 'duration', e.target.value)}
                                            className="flex-1 bg-white border border-cherie-soft rounded-xl px-3 py-2 text-sm focus:ring-1 focus:ring-cherie-rose outline-none"
                                        >
                                            {options.map((opt, i) => (
                                                <option key={i} value={opt.duration}>{opt.duration}</option>
                                            ))}
                                        </select>
                                        <div className="flex-1 bg-white border border-cherie-soft rounded-xl px-3 py-2 text-sm font-bold text-right text-cherie-dark flex items-center justify-end">
                                            {guest.price}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button 
                    type="button"
                    onClick={handleAddGuest}
                    className="w-full py-2 border border-dashed border-cherie-rose rounded-xl text-cherie-rose text-xs font-bold uppercase tracking-widest hover:bg-cherie-rose/10 transition-colors flex items-center justify-center gap-2"
                >
                    <Plus className="w-4 h-4" /> Add Another Guest
                </button>

                {/* Total Price Display */}
                <div className="bg-cherie-dark p-4 rounded-xl flex items-center justify-between text-white">
                    <span className="text-xs uppercase tracking-wide">Total Estimate:</span>
                    <span className="font-serif text-xl font-bold">{calculateTotal()}</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-cherie-dark uppercase tracking-wide flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> Date
                      </label>
                      <input 
                        type="date" 
                        name="date" 
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-cherie-bg border-none rounded-xl px-4 py-3 text-sm text-cherie-dark focus:ring-2 focus:ring-cherie-rose/50 outline-none transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-cherie-dark uppercase tracking-wide flex items-center gap-2">
                        <Clock className="w-3 h-3" /> Time
                      </label>
                      <input 
                        type="time" 
                        name="time" 
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full bg-cherie-bg border-none rounded-xl px-4 py-3 text-sm text-cherie-dark focus:ring-2 focus:ring-cherie-rose/50 outline-none transition-all"
                      />
                    </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-cherie-dark uppercase tracking-wide flex items-center gap-2">
                    <MapPin className="w-3 h-3" /> Location
                  </label>
                  <input 
                    type="text" 
                    name="location" 
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Villa Name or Hotel"
                    className="w-full bg-cherie-bg border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-cherie-rose/50 outline-none transition-all"
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-cherie-rose text-white font-bold uppercase tracking-widest py-4 rounded-xl mt-4 hover:bg-cherie-dark transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95"
                >
                  Confirm via WhatsApp <Send className="w-4 h-4" />
                </button>
                
                <p className="text-[10px] text-center text-cherie-text mt-2">
                  You will be redirected to WhatsApp to send these details.
                </p>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceList;