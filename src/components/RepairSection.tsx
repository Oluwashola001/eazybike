'use client';

import { motion, Variants } from 'framer-motion';
import { Settings2, Zap, Wrench, Activity, ShieldCheck, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Added image paths for the new card designs
const services = [
  {
    id: 'battery',
    title: 'Battery & Electrical',
    description: 'Cell balancing, voltage diagnostics, and full battery rebuilds or replacements.',
    icon: Zap,
    image: '/images/repairs/battery.webp',
  },
  {
    id: 'motor',
    title: 'Motor Tuning & Repair',
    description: 'Hub motor servicing, controller programming, and torque optimization.',
    icon: Settings2,
    image: '/images/repairs/motor.webp',
  },
  {
    id: 'general',
    title: 'General Servicing',
    description: 'Brake bleeding, tire swaps, suspension tuning, and drivetrain lubrication.',
    icon: Wrench,
    image: '/images/repairs/general.webp',
  },
  {
    id: 'diagnostics',
    title: 'System Diagnostics',
    description: 'Advanced error code reading and firmware updates for all major e-bike brands.',
    icon: Activity,
    image: '/images/repairs/diagnostics.webp',
  },
];

export default function RepairSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  };

  return (
    <section id="repairs" className="relative w-full bg-black pt-4 pb-24 md:pt-16 md:pb-40 overflow-hidden">
      
      {/* Background glowing orb for depth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* --- LEFT COL: Authority & Trust --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const }}
            className="relative"
          >
            {/* Moody Image Graphic - Dialed back to be slightly visible and subtle */}
            <div className="absolute -inset-x-8 md:-inset-x-16 -inset-y-12 md:-inset-y-24 z-0 pointer-events-none">
              {/* Left/Right blend to fade horizontally */}
              <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-black z-10" />
              {/* Top blend (only targets the top edge) */}
              <div className="absolute inset-x-0 top-0 h-32 bg-linear-to-b from-black to-transparent z-10" />
              {/* Bottom blend (only targets the bottom edge) */}
              <div className="absolute inset-x-0 bottom-0 h-48 bg-linear-to-t from-black to-transparent z-10" />
              
              {/* ADJUST OPACITY HERE: Changed from opacity-20 to opacity-40 */}
              <img 
                src="/images/repairs/main-bg.webp" 
                alt="Mechanic Service" 
                className="w-full h-full object-cover object-center blur-[2px] opacity-60 grayscale"
              />
            </div>

            <div className="relative z-20">
              <div className="flex items-center gap-3 mb-6">
                <PenTool className="w-4 h-4 text-zinc-500" />
                <span className="text-zinc-400 tracking-[0.2em] text-xs font-semibold uppercase">
                  Service Center
                </span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mb-6 leading-[1.1]">
                We fix all bikes<br />
                <span className="text-zinc-500">& scooters.</span>
              </h2>
              
              <p className="text-base md:text-lg text-zinc-400 mb-10 max-w-md font-light leading-relaxed">
                Our certified technicians possess the specialized tools and expertise required to keep your premium electric rides performing at their absolute peak.
              </p>

              {/* Trust Signals */}
              <div className="flex flex-col gap-4 mb-12">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <ShieldCheck className="w-5 h-5 text-white" /> Genuine OEM Replacement Parts
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <ShieldCheck className="w-5 h-5 text-white" /> Fast Turnaround Times
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <ShieldCheck className="w-5 h-5 text-white" /> Post-Repair Diagnostics Report
                </div>
              </div>

              <Button className="bg-white text-black hover:bg-zinc-200 text-xs tracking-widest uppercase px-8 py-6 rounded-full font-semibold transition-transform hover:scale-105 duration-300">
                Book a Service
              </Button>
            </div>
          </motion.div>

          {/* --- RIGHT COL: Service Grid (Image Cards) --- */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  className="relative overflow-hidden bg-zinc-950 border border-white/5 rounded-3xl group min-h-[280px] md:min-h-[320px]"
                >
                  {/* Card Background Image with hover color transition */}
                  <div className="absolute inset-0 z-0">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                    />
                    {/* Gradient overlay to keep the text highly readable */}
                    <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content Overlay */}
                  <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
                    <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-auto border border-white/10 group-hover:bg-white/20 transition-colors duration-300">
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    
                    <div className="pt-8">
                      <h3 className="text-lg font-medium text-white mb-2">{service.title}</h3>
                      <p className="text-sm text-zinc-400 font-light leading-relaxed line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}