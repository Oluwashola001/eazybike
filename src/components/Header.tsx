'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger the glass effect after scrolling down 50px
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-700 ease-in-out ${
        isScrolled 
          ? 'bg-black/40 backdrop-blur-md border-b border-white/5 py-4' 
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo Area */}
        <Link href="/" className="flex items-center gap-2 tracking-tighter">
          <span className="text-white text-lg font-bold uppercase tracking-[0.2em]">
            Mr Eazye
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {['Bikes', 'Scooters', 'Rentals', 'Repairs'].map((item) => (
            <Link 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className="text-xs font-medium text-zinc-400 hover:text-white transition-colors tracking-widest uppercase"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white hover:bg-white/10 hidden md:flex rounded-full">
            <ShoppingBag className="w-4 h-4" />
          </Button>
          
          <Button className="hidden md:inline-flex bg-white text-black hover:bg-zinc-200 text-xs tracking-widest uppercase font-semibold rounded-full px-6 py-5">
            Book Rental
          </Button>

          {/* Mobile Menu Toggle */}
          <Button variant="ghost" size="icon" className="md:hidden text-white rounded-full">
            <Menu className="w-5 h-5" />
          </Button>
        </div>

      </div>
    </header>
  );
}