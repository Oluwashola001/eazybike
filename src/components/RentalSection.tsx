'use client';

import { motion, Variants } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Mock Data for Rental Tiers ---
const rentalTiers = [
  {
    id: 'hourly',
    name: 'Hourly',
    price: '$25',
    duration: '/ hour',
    description: 'Perfect for a quick cruise around town or a fast errand.',
    features: ['Helmet & Lock Included', 'Pre-charged Battery', 'Local Map Access'],
    highlighted: false,
  },
  {
    id: 'daily',
    name: 'Full Day',
    price: '$85',
    duration: '/ day',
    description: 'Explore the entire island from sunrise to sunset without limits.',
    features: ['Everything in Hourly', 'Free Delivery & Pickup', 'Charger Included', '24/7 Roadside Support'],
    highlighted: true, // This makes the card pop out
  },
  {
    id: 'weekly',
    name: 'Weekly',
    price: '$350',
    duration: '/ week',
    description: 'The ultimate vacation experience. Your personal ride for the trip.',
    features: ['Everything in Daily', 'Unlimited Swaps', 'Priority Maintenance', 'Multi-rider Discounts'],
    highlighted: false,
  },
];

export default function RentalSection() {
  // Animation variants for smooth scrolling reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section id="rentals" className="relative w-full bg-black pb-32">
      
      {/* --- Part 1: Cinematic Video Header --- */}
      {/* Increased height to reveal more of the video */}
      <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        {/* Full-bleed video background */}
        <video
          src="https://cdn.shopify.com/videos/c/o/v/6e16fb1725b643cca37124c99aa20af4.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        
        {/* Gradient Overlays: Blends top and bottom edges into the pure black background */}
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
        
        {/* Top Blend - tiny amount to just erase the harsh straight line without darkening */}
        <div className="absolute inset-x-0 top-0 h-12 bg-linear-to-b from-black to-transparent z-10 pointer-events-none" />
        
        {/* Bottom Blend - softer fade out into the pure black background */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />

        {/* Header Text overlaying the video - shifted downwards */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pt-60 md:pt-60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-zinc-300 text-xs font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-md">
              Rent & Ride
            </p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6 drop-shadow-lg">
              Explore Bermuda.<br />No Limits.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* --- Part 2: Floating Pricing Cards --- */}
      {/* Pushed down completely so they no longer overlap and block the video */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 -mt-6 md:mt-2">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center"
        >
          {rentalTiers.map((tier) => (
            <motion.div
              key={tier.id}
              variants={cardVariants}
              className={`relative rounded-3xl p-8 md:p-10 flex flex-col h-full transition-transform duration-500 hover:-translate-y-2 ${
                tier.highlighted 
                  ? 'bg-zinc-900 border border-white/20 shadow-2xl shadow-white/5 py-12 md:py-14' // Taller, glowing border
                  : 'bg-zinc-900/40 backdrop-blur-md border border-white/5' // Standard glassmorphism
              }`}
            >
              {/* "Most Popular" Badge for highlighted tier */}
              {tier.highlighted && (
                <div className="absolute -top-2 -right-4 md:right-auto md:left-1/2 md:-translate-x-1/2 bg-white text-black text-[10px] font-bold tracking-widest uppercase px-4 py-1.5 rounded-full">
                  Most Popular
                </div>
              )}

              {/* Card Header */}
              <div className="mb-8">
                <h3 className="text-xl font-medium text-white mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-light text-white tracking-tight">{tier.price}</span>
                  <span className="text-sm text-zinc-500 font-medium tracking-wide">{tier.duration}</span>
                </div>
                <p className="text-sm text-zinc-400 mt-4 leading-relaxed font-light">
                  {tier.description}
                </p>
              </div>

              {/* Feature List */}
              <ul className="space-y-4 mb-10 grow">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 ${tier.highlighted ? 'text-white' : 'text-zinc-500'}`} />
                    <span className="text-sm text-zinc-300 font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Call to Action */}
              <Button 
                className={`w-full rounded-full py-6 text-xs font-bold tracking-[0.15em] uppercase flex items-center justify-center gap-2 group transition-all duration-300 ${
                  tier.highlighted 
                    ? 'bg-white text-black hover:bg-zinc-200' 
                    : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10'
                }`}
              >
                Book {tier.name}
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}