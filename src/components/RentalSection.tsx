'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Reusable Reveal Wrapper ---
// once: false → re-animates every time the element enters/leaves the viewport
const Reveal = ({
  children,
  className,
  y = 32,
  duration = 0.65,
  amount = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  duration?: number;
  amount?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount, once: false });

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

// --- Mock Data ---
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
    highlighted: true,
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
  return (
    <section id="rentals" className="relative w-full bg-black pb-32">

      {/* --- Part 1: Cinematic Video Header --- */}
      <div className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
        <video
          src="https://cdn.shopify.com/videos/c/o/v/6e16fb1725b643cca37124c99aa20af4.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlays */}
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

        {/* Hero text — Reveal re-triggers on both scroll directions */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6 pt-60 md:pt-60">
          <Reveal y={24} duration={0.8} amount={0.2}>
            <p className="text-zinc-300 text-xs font-bold tracking-[0.2em] uppercase mb-4 drop-shadow-md">
              Rent & Ride
            </p>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6 drop-shadow-lg">
              Explore Bermuda.<br />No Limits.
            </h2>
          </Reveal>
        </div>
      </div>

      {/* --- Part 2: Pricing Cards --- */}
      <div className="relative z-30 max-w-7xl mx-auto px-6 md:px-12 -mt-6 md:mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {rentalTiers.map((tier) => (
            // Each card is its own independent Reveal — no staggering
            <Reveal key={tier.id} y={36} duration={0.6} amount={0.1}>
              <div
                className={`relative rounded-3xl p-8 md:p-10 flex flex-col h-full transition-transform duration-500 hover:-translate-y-2 ${
                  tier.highlighted
                    ? 'bg-zinc-900 border border-white/20 shadow-2xl shadow-white/5 py-12 md:py-14'
                    : 'bg-zinc-900/40 backdrop-blur-md border border-white/5'
                }`}
              >
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
                  <p className="text-sm text-zinc-400 mt-4 leading-relaxed font-light">{tier.description}</p>
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

                {/* CTA */}
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
              </div>
            </Reveal>
          ))}
        </div>
      </div>

    </section>
  );
}