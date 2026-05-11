'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Custom Social Icons (Since Lucide removed brand icons) ---
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative w-full bg-zinc-950 border-t border-white/5 overflow-hidden pt-24 pb-8 md:pt-32 md:pb-12">
      
      {/* THE LOOPING CYCLIST ANIMATION */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "100vw" }}
        transition={{ 
          repeat: Infinity, 
          duration: 15, 
          ease: "linear" 
        }}
        className="absolute bottom-28 md:bottom-24 left-0 w-32 md:w-48 z-0 pointer-events-none opacity-60 grayscale"
        style={{
          // This superpower instantly deletes the black background of the video
          mixBlendMode: 'screen',
          // Much stronger fade on the top, left, and right edges
          WebkitMaskImage: 'radial-gradient(ellipse at bottom, black 20%, transparent 75%)',
          maskImage: 'radial-gradient(ellipse at bottom, black 20%, transparent 75%)'
        }}
      >
        <video 
          src="/videos/cyclist.webm" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-auto object-contain"
        />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-20 md:mb-24">
          
          {/* Brand & Newsletter Column */}
          <div className="col-span-1 md:col-span-5 lg:col-span-4 flex flex-col">
            <Link href="/" className="inline-block mb-6">
              <span className="text-white text-2xl font-bold uppercase tracking-[0.2em]">
                Dr. EV
              </span>
            </Link>
            <p className="text-zinc-400 text-sm font-light leading-relaxed mb-8 max-w-sm">
              Bermuda’s premier destination for high-performance electric bikes and scooters. Own the ride, or rent the experience.
            </p>
            
            {/* Newsletter Input */}
            <div className="relative max-w-md">
              <input 
                type="email" 
                placeholder="Join our newsletter" 
                className="w-full bg-zinc-900/50 border border-white/10 rounded-full py-4 pl-6 pr-32 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/30 transition-colors backdrop-blur-md"
              />
              <Button className="absolute right-1.5 top-1.5 bottom-1.5 bg-white text-black hover:bg-zinc-200 rounded-full px-6 text-xs tracking-widest font-bold uppercase transition-transform hover:scale-105">
                Subscribe
              </Button>
            </div>
          </div>

          <div className="hidden lg:block col-span-1"></div>

          {/* Links Columns */}
          <div className="col-span-1 md:col-span-7 lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-10">
            {/* Column 1 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-2">Fleet</h4>
              <Link href="#sales" className="text-sm text-zinc-400 hover:text-white transition-colors">E-Bikes</Link>
              <Link href="#sales" className="text-sm text-zinc-400 hover:text-white transition-colors">Scooters</Link>
              <Link href="#rentals" className="text-sm text-zinc-400 hover:text-white transition-colors">Rentals</Link>
              <Link href="#repairs" className="text-sm text-zinc-400 hover:text-white transition-colors">Repairs</Link>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-4">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-2">Company</h4>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Our Story</Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact Us</Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Careers</Link>
              <Link href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">FAQ</Link>
            </div>

            {/* Column 3 - Contact & Socials */}
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <h4 className="text-white text-xs font-bold uppercase tracking-[0.15em] mb-2">Connect</h4>
              <a href="mailto:hello@evbikes.bm" className="text-sm text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group">
                <Mail className="w-4 h-4" /> hello@evbikes.bm
              </a>
              <div className="flex items-center gap-4 mt-2">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:bg-white/10 hover:text-white transition-colors">
                  <TwitterIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-500 tracking-wide">
            © {new Date().getFullYear()} Dr. EV Bermuda. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-zinc-500 hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}