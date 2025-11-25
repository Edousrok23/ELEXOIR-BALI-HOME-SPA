import { ServiceItem, Testimonial } from './types';

export const WHATSAPP_NUMBER = "6285174119423";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const GENERATE_WA_LINK = (serviceName?: string) => {
    const text = serviceName 
        ? `Hello Exotica Bali, I would like to book *${serviceName}*.\n\nPlease find my details below:\nName: \nDate: \nTime: \nVilla/Hotel Location: `
        : `Hello Exotica Bali, I would like to book a spa treatment.\n\nPlease find my details below:\nName: \nTreatment: \nDate: \nTime: \nVilla/Hotel Location: `;
    
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Helper to parse duration and price strings into options
export const parseServiceOptions = (service: ServiceItem) => {
    const rawDurations = service.duration.split('/');
    const rawPrices = service.price.split('/');
    
    return rawDurations.map((d, index) => {
        let cleanDuration = d.trim();
        if(!cleanDuration.toLowerCase().includes('min') && !cleanDuration.toLowerCase().includes('hr')) {
            cleanDuration += ' mins';
        }
        
        let cleanPrice = rawPrices[index] ? rawPrices[index].trim() : 'On Request';
        if (index > 0 && !cleanPrice.startsWith('IDR')) {
             const firstPrice = rawPrices[0].trim();
             if (firstPrice.startsWith('IDR')) {
                 cleanPrice = 'IDR ' + cleanPrice;
             }
        }
        
        // Extract numeric value for calculation
        // Assumes format like "IDR 250k" -> 250000
        const numericString = cleanPrice.replace(/[^0-9]/g, '');
        const numericValue = numericString ? parseInt(numericString) * 1000 : 0;

        return {
            duration: cleanDuration,
            price: cleanPrice,
            numericValue: numericValue,
            label: `${cleanDuration} - ${cleanPrice}`
        };
    });
};

export const formatPrice = (amount: number) => {
    return `IDR ${amount.toLocaleString('en-ID')}`;
};

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Price List', path: '/prices' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'balinese-massage',
    name: 'Balinese Massage',
    description: 'A traditional full-body massage that utilizes long, rhythmic strokes and gentle kneading to release tension and improve circulation. Benefits: Reduces stress, improves blood flow, and enhances relaxation.',
    duration: '60 / 90 / 120 mins',
    price: 'IDR 250k / 375k / 500k',
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'aromatherapy-massage',
    name: 'Aromatherapy Massage',
    description: 'A gentle massage using essential oils selected to suit your mood and body condition. Benefits: Emotional balance, deep relaxation, and detoxification.',
    duration: '60 / 90 / 120 mins',
    price: 'IDR 300k / 450k / 600k',
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'deep-tissue-massage',
    name: 'Deep Tissue Massage',
    description: 'Focused pressure targeting deep layers of muscle and fascia to alleviate chronic pain and tightness. Benefits: Relieves muscle stiffness, reduces inflammation, and improves mobility.',
    duration: '60 / 90 / 120 mins',
    price: 'IDR 300k / 450k / 600k',
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'hot-stone-massage',
    name: 'Hot Stone Massage',
    description: 'Heated basalt stones are used to penetrate warmth into tired muscles while gently massaging the body. Benefits: Deep muscle relaxation, improved sleep, and emotional calming.',
    duration: '60 / 90 / 120 mins',
    price: 'IDR 350k / 525k / 700k',
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'reflexology-foot-massage',
    name: 'Reflexology Foot Massage',
    description: 'A therapeutic foot massage focusing on pressure points connected to different organs. Benefits: Enhances organ function, promotes balance, and relieves foot pain.',
    duration: '60 / 90 / 120 mins',
    price: 'IDR 250k / 375k / 500k',
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'thai-massage',
    name: 'Thai Massage',
    description: 'A traditional dry massage using stretching, pressure, and yoga-like movements. Benefits: Improves flexibility, energy flow, and posture.',
    duration: '60 / 90 / 120 mins',
    price: 'IDR 300k / 450k / 600k',
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1596178065849-d7547146e271?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'lomi-lomi-massage',
    name: 'Lomi-Lomi (Hawaiian Massage)',
    description: 'Experience fluid, wave-like strokes using forearms for a deeply nurturing experience. Benefits: Emotional healing, lymphatic drainage, and spiritual balance.',
    duration: '60 / 90 / 120 mins',
    price: 'IDR 300k / 450k / 600k',
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1591343395082-e21b106203d3?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'four-hands-massage',
    name: 'Four Hands Massage',
    description: 'Two therapists working in perfect harmony to double the relaxation and luxury. Benefits: Full sensory overload, deepened muscle relief, pure indulgence.',
    duration: '60 / 90 / 120 mins',
    price: 'IDR 500k / 750k / 950k',
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'face-acupressure-massage',
    name: 'Face Acupressure Massage',
    description: 'Stimulates acupressure points on the face to promote skin rejuvenation and energy flow. Benefits: Lifts facial muscles, improves glow, and relieves sinus/headache tension.',
    duration: '30 / 60 mins',
    price: 'IDR 200k / 250k',
    category: 'beauty',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'head-neck-shoulder-massage',
    name: 'Head, Neck & Shoulder Massage',
    description: 'A targeted massage focusing on tension areas around the head, neck, and shoulders. Ideal for desk workers or those with migraines. Benefits: Relieves headaches, reduces upper-body tension, boosts mental clarity, improves sleep.',
    duration: '30 / 60 mins',
    price: 'IDR 200k / 300k',
    category: 'massage',
    image: 'https://images.unsplash.com/photo-1531303435785-3853fb035e05?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'couple-massage',
    name: 'Couple Massage – Home Service',
    description: 'A relaxing side-by-side Balinese Massage for two people in your villa or home. Price includes 2 therapists, travel, oils, and equipment. Benefits: Shared relaxation, emotional connection, muscle relief, and total convenience.',
    duration: '60 / 90 / 120 mins',
    price: 'IDR 500k / 750k / 1,000k',
    category: 'packages',
    image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'customised-spa-package',
    name: 'Customised Spa Package',
    description: 'Design your own spa journey tailored to your needs by choosing any combination of treatments (min 2 services). Examples: Balinese Massage + Face Massage. Benefits: Pricing is per person.',
    duration: '90 / 120 mins',
    price: 'IDR 450k / 625k',
    category: 'packages',
    image: 'https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=800&auto=format&fit=crop',
  }
];

export const TESTIMONIALS: Testimonial[] = [
  { id: 1, name: "Sarah J.", text: "The best massage I had in Bali! The therapist was so professional and came right to our villa.", rating: 5 },
  { id: 2, name: "Emily R.", text: "Loved the easy booking via WhatsApp. The aromatherapy massage was heavenly.", rating: 5 },
  { id: 3, name: "Jessica M.", text: "Highly recommend the body scrub. My skin feels amazing!", rating: 5 },
];

export const SERVICE_AREAS = [
  "Seminyak", "Canggu", "Ubud", "Kuta", "Legian", "Jimbaran", "Nusa Dua", "Uluwatu", "Sanur", "All Bali Areas"
];