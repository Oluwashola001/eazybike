'use client';

import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Zap, Gauge, X, ShieldCheck, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Types & Mock Data ---
type Category = 'All' | 'E-Bikes' | 'Mountain Bikes' | 'Scooters' | 'Mobility';

interface Product {
  id: string;
  name: string;
  category: Category;
  price: string;
  finance: string;
  range: string;
  speed: string;
  imageA: string;
  imageB: string;
}

// Updated data using premium, brand-agnostic fictional names
const products: Product[] = [
  // --- E-BIKES ---
  { id: 'eb1', name: 'Voltscape X1', category: 'E-Bikes', price: '$3,995', finance: 'As low as $130/mo', range: '40-75+ mi', speed: '28+ mph', imageA: '/bikes/eb1a.webp', imageB: '/bikes/eb1b.webp' },
  { id: 'eb2', name: 'Phantom Cruiser Pro', category: 'E-Bikes', price: '$3,695', finance: 'As low as $125/mo', range: '40-75+ mi', speed: '28+ mph', imageA: '/bikes/eb2a.webp', imageB: '/bikes/eb2b.webp' },
  { id: 'eb3', name: 'Urban Edge Commuter', category: 'E-Bikes', price: '$3,495', finance: 'As low as $115/mo', range: '40-75+ mi', speed: '28+ mph', imageA: '/bikes/eb3a.webp', imageB: '/bikes/eb3b.webp' },
  { id: 'eb4', name: 'Cargo Hauler Elite', category: 'E-Bikes', price: '$3,295', finance: 'As low as $110/mo', range: '40-75+ mi', speed: '28+ mph', imageA: '/bikes/eb4a.webp', imageB: '/bikes/eb4b.webp' },

  // --- MOUNTAIN BIKES ---
  { id: 'mb1', name: 'Trail Blazer M-Series', category: 'Mountain Bikes', price: '$3,595', finance: 'As low as $120/mo', range: '40-75+ mi', speed: '28+ mph', imageA: '/bikes/mb1a.webp', imageB: '/bikes/mb1b.webp' },
  { id: 'mb2', name: 'Ridge Runner Carbon', category: 'Mountain Bikes', price: '$3,295', finance: 'As low as $110/mo', range: '40-75+ mi', speed: '28+ mph', imageA: '/bikes/mb2a.webp', imageB: '/bikes/mb2b.webp' },
  { id: 'mb3', name: 'Summit Peak Enduro', category: 'Mountain Bikes', price: '$3,295', finance: 'As low as $110/mo', range: '40-75+ mi', speed: '28+ mph', imageA: '/bikes/mb3a.webp', imageB: '/bikes/mb3b.webp' },
  { id: 'mb4', name: 'Alpine Explorer XT', category: 'Mountain Bikes', price: '$3,295', finance: 'As low as $110/mo', range: '40-75+ mi', speed: '28+ mph', imageA: '/bikes/mb4a.webp', imageB: '/bikes/mb4b.webp' },

  // --- SCOOTERS ---
  { id: 'sc1', name: 'City Glide Ultra', category: 'Scooters', price: '$2,695', finance: 'As low as $90/mo', range: '30-50+ mi', speed: '28 mph', imageA: '/bikes/sc1a.webp', imageB: '/bikes/sc1b.webp' },
  { id: 'sc2', name: 'AeroDash X', category: 'Scooters', price: '$2,395', finance: 'As low as $80/mo', range: '30-50+ mi', speed: '28 mph', imageA: '/bikes/sc2a.webp', imageB: '/bikes/sc2b.webp' },
  { id: 'sc3', name: 'Volt Rider Max', category: 'Scooters', price: '$2,195', finance: 'As low as $75/mo', range: '30-50+ mi', speed: '28 mph', imageA: '/bikes/sc3a.webp', imageB: '/bikes/sc3b.webp' },
  { id: 'sc4', name: 'Metro Swift Pro', category: 'Scooters', price: '$1,495', finance: 'As low as $50/mo', range: '20-30+ mi', speed: '20 mph', imageA: '/bikes/sc4a.webp', imageB: '/bikes/sc4b.webp' },

  // --- MOBILITY ---
  { id: 'mo1', name: 'Comfort Cruiser Plus', category: 'Mobility', price: '$995', finance: 'As low as $35/mo', range: '2 hrs play', speed: '15 mph', imageA: '/bikes/mo1a.webp', imageB: '/bikes/mo1b.webp' },
  { id: 'mo2', name: 'Easy Rider Elite 4', category: 'Mobility', price: '$8,995', finance: 'As low as $250/mo', range: '100+ mi', speed: '85+ mph', imageA: '/bikes/mo2a.webp', imageB: '/bikes/mo2b.webp' },
  { id: 'mo3', name: 'Freedom Go Premium', category: 'Mobility', price: '$4,500', finance: 'As low as $150/mo', range: '40-75+ mi', speed: '28+ mph', imageA: '/bikes/mo3a.webp', imageB: '/bikes/mo3b.webp' },
  { id: 'mo4', name: 'Pathfinder Select', category: 'Mobility', price: '$4,000', finance: 'As low as $135/mo', range: '40-75+ mi', speed: '28+ mph', imageA: '/bikes/mo4a.webp', imageB: '/bikes/mo4b.webp' },
];

// --- 3D Hover Card Component ---
const ProductCard = ({ product, onClick }: { product: Product, onClick: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", willChange: "transform" }}
      className="relative group cursor-pointer w-full h-[450px] bg-zinc-900/40 border border-white/5 rounded-3xl p-6 flex flex-col justify-end overflow-hidden transition-colors hover:bg-zinc-900/60"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-zinc-500/10 rounded-full blur-3xl group-hover:bg-zinc-400/20 transition-all duration-500 z-0 pointer-events-none" />

      {/* Floating Product Image with Instant Src Swap on Hover */}
      <div 
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
        style={{ transform: "translateZ(50px)", willChange: "transform" }}
      >
        {/* Single image element that swaps source. Zero overlap. */}
        <motion.img
          layoutId={`product-image-${product.id}`}
          src={isHovered ? product.imageB : product.imageA}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className="absolute w-full max-h-[75%] object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Hidden image B to force browser preloading so the swap is instant */}
        <img 
          src={product.imageB} 
          alt="preload" 
          className="hidden" 
          aria-hidden="true" 
        />
      </div>

      {/* Card Content & Action Button */}
      <div className="relative z-30 transform transition-transform duration-500" style={{ transform: "translateZ(30px)" }}>
        <h3 className="text-2xl font-medium text-white mb-2">{product.name}</h3>
        
        <div className="flex items-center justify-between mt-2">
          <p className="text-xl font-light text-zinc-300">{product.price}</p>
          
          {/* Add to Cart Button (stopPropagation prevents the modal from opening when clicking the button) */}
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              // In the future, your actual add-to-cart logic will go here!
              console.log(`Added ${product.name} to cart`);
            }}
            className="bg-white/10 hover:bg-white text-white hover:text-black rounded-full px-5 py-2 h-auto text-xs font-semibold uppercase tracking-widest backdrop-blur-md border border-white/10 transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Add
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Section Component ---
export default function ProductGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories: Category[] = ['All', 'E-Bikes', 'Mountain Bikes', 'Scooters', 'Mobility'];
  
  const filteredProducts = products.filter(p => activeCategory === 'All' || p.category === activeCategory);

  return (
    <section id="sales" className="relative min-h-screen bg-black py-20 md:py-32 px-6 md:px-12 z-40">
      
      {/* Section Header & Filters */}
      <div className="max-w-7xl mx-auto mb-12 md:mb-16 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 md:gap-8">
        <div>
          <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-2 md:mb-4">Shop the Fleet</h2>
          <p className="text-zinc-400 font-light max-w-md text-sm md:text-base">Own the ultimate ride. Engineered for performance, designed for the island.</p>
        </div>
        
        {/* Swipeable Pill Filter */}
        <div className="w-full lg:w-auto overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] -mx-6 px-6 lg:mx-0 lg:px-0 pb-4 lg:pb-0">
          <div className="inline-flex gap-2 bg-zinc-900/50 p-1.5 rounded-full border border-white/5 backdrop-blur-md whitespace-nowrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[10px] md:text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-white text-black shadow-lg' 
                    : 'text-zinc-500 hover:text-white hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid Layout - 2-column cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 perspective-1000">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map(product => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
            >
              <ProductCard product={product} onClick={() => setSelectedProduct(product)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Centered Popup Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProduct(null)} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 pt-24 md:p-6 md:pt-28"
          >
            {/* The Modal Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-5xl bg-zinc-950 border border-white/10 rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] md:max-h-[80vh]"
            >
              {/* Close Button */}
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedProduct(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full z-50 bg-black/20 backdrop-blur-md border border-white/5"
              >
                <X className="w-5 h-5" />
              </Button>

              {/* Left: Product Image Showcase */}
              <div className="w-full md:w-1/2 bg-gradient-to-br from-zinc-900/80 to-black p-8 md:p-12 flex items-center justify-center relative min-h-[300px] md:min-h-[500px]">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white/5 rounded-full blur-[80px] z-0 pointer-events-none" />
                
                {/* Connects to imageA from the grid for the seamless transition */}
                <motion.img
                  layoutId={`product-image-${selectedProduct.id}`}
                  src={selectedProduct.imageA}
                  alt={selectedProduct.name}
                  className="w-full max-w-md h-auto object-contain z-10 drop-shadow-2xl"
                  style={{ willChange: "transform" }}
                />
              </div>

              {/* Right: Product Details & Checkout */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
                <div className="mb-8">
                  <p className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mb-3">{selectedProduct.category}</p>
                  <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white mb-6">{selectedProduct.name}</h2>
                  
                  <div className="flex items-end gap-4 mb-2">
                    <span className="text-3xl md:text-4xl font-light text-white">{selectedProduct.price}</span>
                  </div>
                  <p className="text-sm text-zinc-400 font-medium tracking-wide">{selectedProduct.finance}</p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-6 py-6 border-y border-white/10 mb-8">
                  <div>
                    <div className="flex items-center gap-2 text-zinc-500 mb-2">
                      <Zap className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-[0.15em] font-bold">Est. Range</span>
                    </div>
                    <p className="text-xl text-white font-light tracking-wide">{selectedProduct.range}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-zinc-500 mb-2">
                      <Gauge className="w-4 h-4" />
                      <span className="text-[10px] uppercase tracking-[0.15em] font-bold">Top Speed</span>
                    </div>
                    <p className="text-xl text-white font-light tracking-wide">{selectedProduct.speed}</p>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-zinc-500" /> 2-Year Comprehensive Warranty
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-400">
                    <ShieldCheck className="w-4 h-4 text-zinc-500" /> Free Island-Wide Delivery
                  </li>
                </ul>

                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                  <Button className="flex-1 bg-white text-black hover:bg-zinc-200 text-xs tracking-[0.15em] uppercase py-6 rounded-full font-bold flex items-center justify-center gap-2">
                    <ShoppingCart className="w-4 h-4" /> Add to Cart
                  </Button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}