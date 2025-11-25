import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, Calendar, Clock, MapPin, User, CheckCircle, Minus, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getWellnessRecommendation } from '../services/geminiService';
import { ChatMessage, ServiceRecommendation, ServiceItem } from '../types';
import { WHATSAPP_NUMBER, SERVICES, parseServiceOptions, formatPrice } from '../constants';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // State for the in-chat booking form
  const [bookingService, setBookingService] = useState<ServiceRecommendation | null>(null);
  const [bookingStep, setBookingStep] = useState<'chat' | 'form'>('chat');
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    duration: '',
    price: '',
    guests: 1
  });
  
  const [durationOptions, setDurationOptions] = useState<{duration: string, price: string, label: string, numericValue: number}[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Hello love! I am Cherie. Tell me how you are feeling, and I will curate the perfect treatment for you.' }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, bookingStep]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const responseMsg = await getWellnessRecommendation(input);

    setMessages(prev => [...prev, responseMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  const startBooking = (recommendation: ServiceRecommendation) => {
    const fullService = SERVICES.find(s => s.id === recommendation.serviceId);
    if (fullService) {
        const options = parseServiceOptions(fullService);
        setDurationOptions(options);
        setFormData({
            name: '',
            date: '',
            time: '',
            location: '',
            duration: options[0]?.duration || '',
            price: options[0]?.price || '',
            guests: 1
        });
        setBookingService(recommendation);
        setBookingStep('form');
    } else {
        setBookingService(recommendation);
        setBookingStep('form');
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'duration') {
         const selectedOption = durationOptions.find(o => o.duration === value);
         setFormData(prev => ({
             ...prev,
             duration: value,
             price: selectedOption ? selectedOption.price : ''
         }));
    } else {
         setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const adjustGuests = (delta: number) => {
      setFormData(prev => ({
          ...prev,
          guests: Math.max(1, prev.guests + delta)
      }));
  };

  const getCalculatedPrice = () => {
      const selectedOption = durationOptions.find(o => o.duration === formData.duration);
      if (selectedOption) {
          return formatPrice(selectedOption.numericValue * formData.guests);
      }
      return formData.price; // Fallback
  };

  const submitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingService) return;

    const text = `Hello Exotica Bali, regarding your AI recommendation for *${bookingService.serviceName}*.\n\nMy Booking Request:\nName: ${formData.name}\nGuests: ${formData.guests}\nDuration: ${formData.duration}\nTotal Estimate: ${getCalculatedPrice()}\nDate: ${formData.date}\nTime: ${formData.time}\nLocation: ${formData.location}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
    
    setBookingStep('chat');
    setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'model',
        text: "Wonderful! I've prepared your booking message. Please press send in WhatsApp to confirm with our reception."
    }]);
    setBookingService(null);
    setFormData({ name: '', date: '', time: '', location: '', duration: '', price: '', guests: 1 });
  };

  const cancelBooking = () => {
    setBookingStep('chat');
    setBookingService(null);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 right-8 z-40 bg-cherie-dark text-white p-4 rounded-full shadow-2xl shadow-cherie-rose/40 flex items-center justify-center transition-all duration-300 border-4 border-white ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <Sparkles className="h-6 w-6 text-cherie-rose" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-50 w-[85vw] md:w-96 bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-cherie-soft flex flex-col max-h-[600px] h-[75vh]"
          >
            {/* Header */}
            <div className="bg-cherie-bg p-5 flex justify-between items-center border-b border-cherie-soft">
              <div className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded-full shadow-sm">
                   <Sparkles className="h-5 w-5 text-cherie-rose" />
                </div>
                <div>
                    <h3 className="font-serif font-bold text-cherie-dark">Cherie Concierge</h3>
                    <p className="text-[10px] text-cherie-text tracking-wider uppercase">Wellness Assistant</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-cherie-text hover:text-cherie-dark transition">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white relative">
              
              {/* Messages View */}
              {bookingStep === 'chat' ? (
                <>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'user'
                            ? 'bg-cherie-rose text-white rounded-br-none'
                            : 'bg-cherie-bg text-cherie-dark shadow-sm rounded-bl-none'
                        }`}
                      >
                        {msg.text}
                      </div>
                      
                      {/* AI Recommendation Card */}
                      {msg.role === 'model' && msg.recommendation && (
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-3 bg-white border border-cherie-rose/30 rounded-2xl p-4 shadow-lg w-[85%] relative overflow-hidden"
                          >
                             <div className="absolute top-0 right-0 w-16 h-16 bg-cherie-soft rounded-bl-full -z-0"></div>
                             <p className="text-[10px] text-cherie-rose font-bold uppercase tracking-widest mb-1">Recommended for You</p>
                             <h4 className="font-serif text-lg text-cherie-dark font-bold">{msg.recommendation.serviceName}</h4>
                             <button 
                                onClick={() => startBooking(msg.recommendation!)}
                                className="mt-3 w-full bg-cherie-dark text-white py-2 rounded-xl text-xs font-bold uppercase tracking-wide hover:bg-cherie-rose transition-colors flex items-center justify-center gap-2"
                             >
                                Book This Treatment <CheckCircle className="w-3 h-3" />
                             </button>
                          </motion.div>
                      )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-cherie-bg p-4 rounded-2xl rounded-bl-none flex space-x-1 items-center">
                        <div className="w-1.5 h-1.5 bg-cherie-rose rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 bg-cherie-rose rounded-full animate-bounce delay-75" />
                        <div className="w-1.5 h-1.5 bg-cherie-rose rounded-full animate-bounce delay-150" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              ) : (
                /* Booking Form View inside Chat */
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="h-full flex flex-col"
                >
                    <div className="mb-4">
                        <button onClick={cancelBooking} className="text-xs text-cherie-text hover:text-cherie-dark flex items-center gap-1 mb-2">
                            &larr; Back to chat
                        </button>
                        <h4 className="font-serif text-xl text-cherie-dark">Book {bookingService?.serviceName}</h4>
                        <p className="text-xs text-cherie-text">Enter your details to confirm via WhatsApp.</p>
                    </div>

                    <form onSubmit={submitBooking} className="space-y-3 flex-1 overflow-y-auto pb-2">
                        <div className="space-y-1">
                             <label className="text-[10px] font-bold text-cherie-dark uppercase flex items-center gap-1">
                                <User className="w-3 h-3" /> Name
                             </label>
                             <input type="text" name="name" required value={formData.name} onChange={handleFormChange} className="w-full bg-cherie-bg border-none rounded-xl px-3 py-2 text-sm focus:ring-1 focus:ring-cherie-rose" />
                        </div>
                        
                        {/* Guests Counter */}
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-cherie-dark uppercase flex items-center gap-1">
                                <User className="w-3 h-3" /> Guests
                             </label>
                            <div className="flex items-center gap-3 bg-cherie-bg rounded-xl px-2 py-1">
                                <button type="button" onClick={() => adjustGuests(-1)} className="p-2 text-cherie-dark hover:text-cherie-rose"><Minus className="w-3 h-3" /></button>
                                <span className="text-sm font-bold flex-1 text-center">{formData.guests}</span>
                                <button type="button" onClick={() => adjustGuests(1)} className="p-2 text-cherie-dark hover:text-cherie-rose"><Plus className="w-3 h-3" /></button>
                            </div>
                        </div>

                        {/* Duration Selection */}
                        <div className="space-y-1">
                             <label className="text-[10px] font-bold text-cherie-dark uppercase flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Duration
                             </label>
                             <select name="duration" required value={formData.duration} onChange={handleFormChange} className="w-full bg-cherie-bg border-none rounded-xl px-3 py-2 text-sm text-cherie-dark focus:ring-1 focus:ring-cherie-rose appearance-none">
                                {durationOptions.map((opt, i) => (
                                    <option key={i} value={opt.duration}>{opt.duration}</option>
                                ))}
                             </select>
                        </div>
                        
                        <div className="bg-cherie-soft/30 p-2 rounded-lg text-right">
                             <p className="text-[10px] text-cherie-text uppercase">Estimated Total</p>
                             <p className="text-sm font-bold text-cherie-dark">{getCalculatedPrice()}</p>
                        </div>

                        <div className="space-y-1">
                             <label className="text-[10px] font-bold text-cherie-dark uppercase flex items-center gap-1">
                                <Calendar className="w-3 h-3" /> Date
                             </label>
                             <input type="date" name="date" required value={formData.date} onChange={handleFormChange} className="w-full bg-cherie-bg border-none rounded-xl px-3 py-2 text-sm text-cherie-dark focus:ring-1 focus:ring-cherie-rose" />
                        </div>
                        <div className="space-y-1">
                             <label className="text-[10px] font-bold text-cherie-dark uppercase flex items-center gap-1">
                                <Clock className="w-3 h-3" /> Time
                             </label>
                             <input type="time" name="time" required value={formData.time} onChange={handleFormChange} className="w-full bg-cherie-bg border-none rounded-xl px-3 py-2 text-sm text-cherie-dark focus:ring-1 focus:ring-cherie-rose" />
                        </div>
                        <div className="space-y-1">
                             <label className="text-[10px] font-bold text-cherie-dark uppercase flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> Location
                             </label>
                             <input type="text" name="location" placeholder="Villa/Hotel" required value={formData.location} onChange={handleFormChange} className="w-full bg-cherie-bg border-none rounded-xl px-3 py-2 text-sm focus:ring-1 focus:ring-cherie-rose" />
                        </div>
                        
                        <button type="submit" className="w-full bg-cherie-rose hover:bg-cherie-dark text-white font-bold py-3 rounded-xl uppercase text-xs tracking-widest transition-colors flex items-center justify-center gap-2 mt-4 shadow-lg">
                            Send to WhatsApp <Send className="w-3 h-3" />
                        </button>
                    </form>
                </motion.div>
              )}
            </div>

            {/* Input Area - Only show if in chat mode */}
            {bookingStep === 'chat' && (
                <div className="p-4 bg-white border-t border-cherie-soft">
                <div className="flex space-x-2 relative">
                    <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Describe how you feel..."
                    className="flex-1 bg-cherie-bg border-none rounded-full px-6 py-3 text-sm text-cherie-dark placeholder-cherie-text/50 focus:outline-none focus:ring-2 focus:ring-cherie-rose/50"
                    />
                    <button
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-1 top-1 bottom-1 bg-cherie-dark text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-cherie-rose transition-colors disabled:opacity-50 shadow-md"
                    >
                    <Send className="h-4 w-4" />
                    </button>
                </div>
                </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;