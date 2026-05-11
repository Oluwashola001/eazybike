'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Hero() {
  const introVideoRef = useRef<HTMLVideoElement>(null);
  const loopVideoRef = useRef<HTMLVideoElement>(null);
  const [introFinished, setIntroFinished] = useState(false);

  // Speed up the intro video on page load
  useEffect(() => {
    if (introVideoRef.current) {
      introVideoRef.current.playbackRate = 2.0;
    }
  }, []);

  // Triggered the exact frame the assembly video ends
  const handleIntroEnd = () => {
    setIntroFinished(true);
    if (loopVideoRef.current) {
      loopVideoRef.current.play();
    }
  };

  // Cinematic staggered animation variants explicitly typed for Framer Motion
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    show: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)', 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } 
    },
  };

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden bg-black flex items-center justify-center">
      
      {/* Layer 1: Loop Video (Background Layer) */}
      <video
        ref={loopVideoRef}
        src="https://hp2ls42lgzp8cbqy.public.blob.vercel-storage.com/hero.webm"
        muted
        playsInline
        loop
        className="absolute inset-0 h-full w-full object-cover object-center z-0 scale-105 md:scale-100"
      />

      {/* Layer 2: Intro Video (Foreground Layer) */}
      <video
        ref={introVideoRef}
        src="https://hp2ls42lgzp8cbqy.public.blob.vercel-storage.com/loop.webm"
        autoPlay
        muted
        playsInline
        onEnded={handleIntroEnd}
        className={`absolute inset-0 h-full w-full object-cover object-center z-10 transition-opacity duration-1000 ease-in-out scale-105 md:scale-100 ${
          introFinished ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Layer 3: Subtle Bottom Gradient */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent z-20 pointer-events-none" />

      {/* Layer 4: The UI & Typography */}
      <div className="absolute bottom-0 left-0 w-full px-6 pb-12 md:px-16 md:pb-20 z-30 pointer-events-none">
        
        {introFinished && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start max-w-2xl pointer-events-auto"
          >
            <motion.h1 
              variants={itemVariants} 
              className="text-5xl md:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.1]"
            >
              Welcome to<br />
              <span className="text-zinc-500">Mr EAZYE</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants} 
              className="text-sm md:text-base text-zinc-400 mb-10 max-w-md font-light leading-relaxed"
            >
              Bermuda’s #1 E-Bike, Scooter & Repair Hub
            </motion.p>
            
            {/* Mobile-optimized button layout (Stacked on mobile, side-by-side on desktop) */}
            <motion.div variants={itemVariants} className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4 sm:gap-6">
              <Button className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-xs tracking-widest uppercase px-8 py-6 rounded-full font-semibold transition-transform hover:scale-105 duration-300">
                Explore Fleet
              </Button>
              <Link 
                href="#repairs" 
                className="w-full sm:w-auto text-center sm:text-left text-white text-xs font-medium tracking-widest uppercase flex items-center justify-center sm:justify-start gap-2 group transition-colors hover:text-zinc-300 py-4 sm:py-0"
              >
                Book Repair 
                <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}