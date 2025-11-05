'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Brain, Code2, Zap, Shield, Database, Workflow } from 'lucide-react';

const expertiseAreas = [
  {
    icon: Brain,
    title: 'Computational Fluid Dynamics',
    description: 'Advanced CFD analysis using ANSYS, Star CCM+, Converge, and COMSOL. Expert in single-phase flow, conjugate heat transfer, and multiphase reacting/non-reacting flows.',
  },
  {
    icon: Code2,
    title: 'Emission Solutions',
    description: 'Development of aftertreatment systems for BS-IV, Euro 5, Euro 6, and BS-VI standards. Specialized in SCR systems, DEF dosing, and urea deposit mitigation strategies.',
  },
  {
    icon: Zap,
    title: 'Simulation-Based Innovation',
    description: 'Leading simulation-driven product development including freeze-thaw analysis, spray simulation, and combustion modeling using KIVA-RIF for diesel engines.',
  },
  {
    icon: Shield,
    title: 'Systematic Problem Solving',
    description: 'TRIZ methodology expert and Six Sigma certified. Systematic innovation approach combining theory with practical engineering solutions for complex technical challenges.',
  },
  {
    icon: Database,
    title: 'Technical Leadership',
    description: 'Group leadership experience managing teams of 15-30 engineers. Delivered $4M+ in cost savings and led critical projects in aeroacoustics and mixer optimization.',
  },
  {
    icon: Workflow,
    title: 'Patents & Publications',
    description: 'Prime inventor on 8 original ideas and 17 derivative patents. Published 6 international papers and authored chapters in technical books by Springer and Begell House.',
  },
];

export default function Advisory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="advisory" ref={ref} className="py-32 bg-accent">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Advisory Focus
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Deep Expertise, Real Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Specialized knowledge across CFD analysis, emission control systems, and systematic innovation—delivering tangible results for complex engineering challenges.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-card p-8 rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border border-border cursor-pointer"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-foreground text-background mb-6 group-hover:scale-110 transition-transform duration-300">
                <area.icon className="h-7 w-7" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3">
                {area.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {area.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
