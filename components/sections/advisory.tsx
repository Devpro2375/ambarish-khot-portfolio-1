'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code2, Database, Shield, Workflow, Zap } from 'lucide-react';

const items = [
  {
    icon: Brain,
    title: 'Computational Fluid Dynamics',
    desc: 'Expert in ANSYS, Star CCM+, Converge and COMSOL with specialization in single-phase flow, conjugate heat transfer, and reacting or multiphase systems.',
  },
  {
    icon: Code2,
    title: 'Emission Solutions',
    desc: 'SCR systems, DEF dosing strategy, urea deposit mitigation, and emission control development across BS-IV, Euro 5/6, and BS-VI standards.',
  },
  {
    icon: Zap,
    title: 'Simulation-Driven Innovation',
    desc: 'Freeze-thaw modeling, injector spray simulation, combustion modeling, and system-level optimization.',
  },
  {
    icon: Shield,
    title: 'Systematic Problem Solving',
    desc: 'TRIZ methodology practitioner and Six Sigma certified engineer with structured problem-solving expertise.',
  },
  {
    icon: Database,
    title: 'Technical Leadership',
    desc: 'Led teams of 15-30 engineers delivering over $4M in cost savings through simulation-driven product design.',
  },
  {
    icon: Workflow,
    title: 'Patents & Publications',
    desc: 'Prime inventor on 8 original patents and 17 derivative patents with 6 international publications and book chapters.',
  },
];

export default function Advisory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="advisory" ref={ref} className="section-shell bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-kicker">Advisory Focus</p>
          <h2 className="section-title">Deep Expertise That Drives Innovation</h2>
          <p className="section-copy mx-auto mt-4 max-w-3xl">
            A multidisciplinary engineering background blending simulation
            science, emissions development, advanced modeling, and systematic
            innovation.
          </p>
        </motion.div>

        <div className="grid gap-x-8 gap-y-6 md:grid-cols-2">
          {items.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex gap-4 border-b border-border pb-6 last:border-b-0 md:last:border-b md:[&:nth-last-child(-n+2)]:border-b-0"
            >
              <div className="icon-tile">
                <item.icon className="h-[18px] w-[18px]" />
              </div>

              <div className="min-w-0">
                <h3 className="font-serif text-lg font-bold leading-snug text-foreground sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
