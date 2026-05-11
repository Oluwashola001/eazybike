'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

// Defined navigation routes pointing to the section IDs we created
const navItems = [
  { label: 'Bikes', href: '#sales' },
  { label: 'Scooters', href: '#sales' },
  { label: 'Rentals', href: '#rentals' },
  { label: 'Repairs', href: '#repairs' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Custom smooth scroll handler with header offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        const headerOffset = 90; // Adjusts for the fixed header height so it doesn't cover titles
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setIsMobileMenuOpen(false); // Close mobile menu if it was open
    }
  };

  // Scroll to top when clicking the logo
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  // Handle glassmorphism on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
          isScrolled 
            ? 'bg-black/70 backdrop-blur-xl border-b border-white/5 py-4' 
            : 'bg-transparent border-transparent py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo Area */}
          <Link href="/" onClick={handleLogoClick} className="flex items-center gap-2 tracking-tighter relative z-50">
            <span className="text-white text-lg font-bold uppercase tracking-[0.2em]">
              EV BIKES
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-xs font-medium text-zinc-400 hover:text-white transition-colors tracking-widest uppercase"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 md:gap-4 relative z-50">
            <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10 hidden md:flex rounded-full">
              <ShoppingBag className="w-4 h-4" />
            </Button>
            
            <Link href="#rentals" onClick={(e) => handleNavClick(e, '#rentals')} className="hidden md:inline-flex">
              <Button className="bg-white text-black hover:bg-zinc-200 text-xs tracking-widest uppercase font-semibold rounded-full px-6 py-5 transition-transform hover:scale-105 duration-300">
                Book Rental
              </Button>
            </Link>

            {/* Mobile Menu Toggle Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden text-white rounded-full hover:bg-white/10"
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* --- Full-Screen Mobile Menu Overlay --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[100] bg-zinc-950/95 backdrop-blur-3xl flex flex-col px-6 pt-28 pb-12 overflow-y-auto"
          >
            {/* Close Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full z-50"
            >
              <X className="w-6 h-6" />
            </Button>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-8 mt-8">
              {navItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-4xl font-medium text-zinc-400 hover:text-white transition-colors tracking-tight flex items-center justify-between group"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Mobile Bottom Actions */}
            <div className="mt-auto pt-12 flex flex-col gap-4">
              <Link href="#rentals" onClick={(e) => handleNavClick(e, '#rentals')} className="w-full">
                <Button className="w-full bg-white text-black hover:bg-zinc-200 text-sm tracking-[0.15em] uppercase font-bold py-8 rounded-full">
                  Book Rental
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full bg-transparent border-white/10 text-white hover:bg-white/5 text-sm tracking-[0.15em] uppercase font-bold py-8 rounded-full flex items-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" /> View Cart
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}