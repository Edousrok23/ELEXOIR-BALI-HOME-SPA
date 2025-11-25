import React, { useState, useEffect } from 'react';
import { WHATSAPP_NUMBER, SERVICES, parseServiceOptions, formatPrice } from '../constants';
import { Phone, Mail, MapPin, ArrowRight, Clock, Plus, Trash2, Users } from 'lucide-react';

interface BookingItem {
  serviceName: string;
  duration: string;
  price: string;
  numericPrice: number;
}

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  
  // Initialize with one empty booking slot
  const [bookings, setBookings] = useState<BookingItem[]>([
      { serviceName: '', duration: '', price: '', numericPrice: 0 }
  ]);

  const handleBookingChange = (index: number, field: keyof BookingItem, value: string) => {
      const newBookings = [...bookings];
      const booking = { ...newBookings[index] };

      if (field === 'serviceName') {
          const service = SERVICES.find(s => s.name === value);
          if (service) {
              const options = parseServiceOptions(service);
              booking.serviceName = value;
              booking.duration = options[0]?.duration || '';
              booking.price = options[0]?.price || '';
              booking.numericPrice = options[0]?.numericValue || 0;
          } else {
              booking.serviceName = '';
              booking.duration = '';
              booking.price = '';
              booking.numericPrice = 0;
          }
      } else if (field === 'duration') {
          const service = SERVICES.find(s => s.name === booking.serviceName);
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

  const handleAddBooking = () => {
      setBookings([...bookings, { serviceName: '', duration: '', price: '', numericPrice: 0 }]);
  };

  const handleRemoveBooking = (index: number) => {
      if (bookings.length > 1) {
          const newBookings = [...bookings];
          newBookings.splice(index, 1);
          setBookings(newBookings);
      }
  };

  const calculateTotal = () => {
      const total = bookings.reduce((sum, item) => sum + item.numericPrice, 0);
      return formatPrice(total);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let bookingText = "";
    bookings.forEach((b, i) => {
        if(b.serviceName) {
            bookingText += `\nGuest ${i + 1}: ${b.serviceName} (${b.duration})`;
        }
    });

    const total = calculateTotal();

    const text = `Hello Exotica Bali, I would like to make a booking.\n\n*Details:*${bookingText}\n\n*Total Estimate:* ${total}\n\n*Info:*\nName: ${name}\nDate: ${date}\nTime: ${time}\nLocation: ${location}`;
    
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-20 min-h-screen bg-cherie-soft/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        <div className="text-center mb-10 md:mb-16">
            <h1 className="font-serif text-4xl md:text-5xl text-cherie-dark mb-4">Get in Touch</h1>
            <p className="text-cherie-text text-sm md:text-base">We are ready to bring relaxation to your door.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden">
            
            {/* Info Side */}
            <div className="bg-cherie-dark p-8 md:p-16 text-white flex flex-col justify-between relative overflow-hidden order-last lg:order-first">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-cherie-rose/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 rounded-full -ml-16 -mb-16 blur-2xl"></div>

                <div className="relative z-10 space-y-8 md:space-y-12">
                    <div>
                        <h2 className="font-serif text-2xl md:text-3xl mb-4 md:mb-6">Contact Info</h2>
                        <p className="text-white/70 font-light leading-relaxed text-sm md:text-base">
                            Fill out the form to fast-track your booking via WhatsApp, or contact us directly using the details below.
                        </p>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                        <div className="flex items-center space-x-4 md:space-x-6 group">
                            <div className="bg-white/10 p-3 md:p-4 rounded-full group-hover:bg-cherie-rose transition-colors">
                                <Phone className="h-4 w-4 md:h-5 md:w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">WhatsApp</p>
                                <p className="font-serif text-lg md:text-xl">+{WHATSAPP_NUMBER}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 md:space-x-6 group">
                            <div className="bg-white/10 p-3 md:p-4 rounded-full group-hover:bg-cherie-rose transition-colors">
                                <Mail className="h-4 w-4 md:h-5 md:w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Email</p>
                                <p className="font-serif text-lg md:text-xl">book@exoticabalispa.com</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4 md:space-x-6 group">
                            <div className="bg-white/10 p-3 md:p-4 rounded-full group-hover:bg-cherie-rose transition-colors">
                                <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                            </div>
                            <div>
                                <p className="text-[10px] text-white/50 uppercase tracking-widest mb-1">Area</p>
                                <p className="font-serif text-lg md:text-xl">All Bali Areas (inc. Ubud)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Form Side */}
            <div className="p-8 md:p-16 bg-white order-first lg:order-last">
                <h3 className="text-2xl font-serif text-cherie-dark mb-6 md:mb-10 text-center md:text-left">Request a Booking</h3>
                <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
                    <div className="space-y-4 md:space-y-6">
                        <div className="relative">
                            <input 
                                type="text" 
                                name="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-cherie-bg border-none rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cherie-rose/50 transition placeholder-cherie-text/50 text-sm md:text-base"
                                placeholder="Your Name"
                            />
                        </div>

                        {/* Booking Lines */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-cherie-dark uppercase tracking-wide flex items-center gap-2">
                                <Users className="w-3 h-3" /> Treatments
                            </label>
                            
                            {bookings.map((booking, index) => {
                                const service = SERVICES.find(s => s.name === booking.serviceName);
                                const options = service ? parseServiceOptions(service) : [];
                                
                                return (
                                    <div key={index} className="bg-cherie-soft/30 p-4 rounded-xl border border-cherie-soft">
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-xs font-bold text-cherie-rose uppercase">Guest {index + 1}</span>
                                            {bookings.length > 1 && (
                                                <button type="button" onClick={() => handleRemoveBooking(index)} className="text-red-400 hover:text-red-600">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="space-y-3">
                                            <select 
                                                value={booking.serviceName}
                                                onChange={(e) => handleBookingChange(index, 'serviceName', e.target.value)}
                                                className="w-full bg-white border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-cherie-rose transition text-cherie-text text-sm"
                                            >
                                                <option value="">Select Treatment</option>
                                                {SERVICES.map(service => (
                                                    <option key={service.id} value={service.name}>{service.name}</option>
                                                ))}
                                            </select>
                                            
                                            {options.length > 0 && (
                                                <div className="flex gap-2">
                                                    <select
                                                        value={booking.duration}
                                                        onChange={(e) => handleBookingChange(index, 'duration', e.target.value)}
                                                        className="flex-1 bg-white border-none rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-cherie-rose transition text-cherie-text text-sm"
                                                    >
                                                        {options.map((opt, i) => (
                                                            <option key={i} value={opt.duration}>{opt.duration}</option>
                                                        ))}
                                                    </select>
                                                    <div className="flex-1 bg-white rounded-xl px-4 py-3 text-sm font-bold text-cherie-dark text-right flex items-center justify-end">
                                                        {booking.price}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            
                            <button 
                                type="button"
                                onClick={handleAddBooking}
                                className="w-full py-3 border border-dashed border-cherie-rose rounded-xl text-cherie-rose text-xs font-bold uppercase tracking-widest hover:bg-cherie-rose/10 transition-colors flex items-center justify-center gap-2"
                            >
                                <Plus className="w-4 h-4" /> Add Another Guest
                            </button>

                            {/* Total */}
                             <div className="bg-cherie-dark p-4 rounded-xl flex items-center justify-between text-white">
                                <span className="text-xs uppercase tracking-wide">Total Estimate:</span>
                                <span className="font-serif text-xl font-bold">{calculateTotal()}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <input 
                                type="date" 
                                name="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full bg-cherie-bg border-none rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cherie-rose/50 transition text-cherie-text text-sm md:text-base"
                            />
                            <input 
                                type="time" 
                                name="time"
                                required
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full bg-cherie-bg border-none rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cherie-rose/50 transition text-cherie-text text-sm md:text-base"
                            />
                        </div>
                        
                        <div>
                            <input 
                                type="text" 
                                name="location"
                                required
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full bg-cherie-bg border-none rounded-xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cherie-rose/50 transition placeholder-cherie-text/50 text-sm md:text-base"
                                placeholder="Villa Name / Location"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-cherie-rose hover:bg-cherie-dark text-white font-bold tracking-widest uppercase py-4 md:py-5 rounded-xl shadow-xl shadow-cherie-rose/30 transition-all duration-300 flex justify-center items-center space-x-3 hover:-translate-y-1 text-xs md:text-sm"
                    >
                        <span>Confirm via WhatsApp</span>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </form>
            </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;