'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Settings2, Zap, Wrench, Activity, ShieldCheck, PenTool, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// --- Reusable Reveal Wrapper ---
const Reveal = ({
  children,
  className,
  y = 32,
  x = 0,
  duration = 0.65,
  amount = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  x?: number;
  duration?: number;
  amount?: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount, once: false });

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
};

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
  return (
    <section id="repairs" className="relative w-full bg-black">

      {/* --- Top Part: Repair Details --- */}
      <div className="relative pt-2 pb-24 md:pt-16 md:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* LEFT COL: slides in from the left */}
            <Reveal x={-30} y={0} duration={0.9} amount={0.1}>
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

                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <Button className="w-full sm:w-auto bg-white text-black hover:bg-zinc-200 text-xs tracking-widest uppercase px-8 py-6 rounded-full font-semibold transition-transform hover:scale-105 duration-300">
                    Book a Service
                  </Button>
                  <Link
                    href="#contact"
                    className="w-full sm:w-auto text-center sm:text-left text-white text-xs font-medium tracking-widest uppercase flex items-center justify-center sm:justify-start gap-2 group transition-colors hover:text-zinc-300 py-4 sm:py-0"
                  >
                    Contact Us
                    <ArrowRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>

            {/* RIGHT COL: each card reveals independently */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <Reveal key={service.id} y={28} duration={0.6} amount={0.1}>
                    <div className="relative overflow-hidden bg-zinc-950 border border-white/5 rounded-3xl group min-h-[280px] md:min-h-[320px]">
                      {/* Card Background Image */}
                      <div className="absolute inset-0 z-0">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover opacity-40 group-hover:opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
                      </div>

                      {/* Card Content */}
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
                    </div>
                  </Reveal>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      {/* --- Bottom Part: Cinematic Parallax Video Sequence --- */}
      <div className="relative w-full">

        {/* Sequence 1: Sticky base layer */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center z-10">
          <video
            src="https://hp2ls42lgzp8cbqy.public.blob.vercel-storage.com/break.webm"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/60 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

          <Reveal y={20} duration={0.8} amount={0.3} className="relative z-20 text-center">
            <h2
              className="text-5xl md:text-[8rem] leading-[0.9] font-black text-white tracking-tighter uppercase"
              style={{ textShadow: '0 20px 40px rgba(0,0,0,0.9), 0 4px 10px rgba(0,0,0,0.5)' }}
            >
              You <br />Break It
            </h2>
          </Reveal>
        </div>

        {/* Sequence 2: Scrolls over with feathered top edge */}
        <div className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center z-20 [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_15%)] [mask-image:linear-gradient(to_bottom,transparent,black_15%)]">
          <video
            src="https://hp2ls42lgzp8cbqy.public.blob.vercel-storage.com/fix.webm"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

          <Reveal y={20} duration={0.8} amount={0.3} className="relative z-20 text-center">
            <h2
              className="text-5xl md:text-[8rem] leading-[0.9] font-black text-white tracking-tighter uppercase"
              style={{ textShadow: '0 20px 40px rgba(0,0,0,0.9), 0 4px 10px rgba(0,0,0,0.5)' }}
            >
              We<br />Fix It
            </h2>
          </Reveal>
        </div>

      </div>

    </section>
  );
}