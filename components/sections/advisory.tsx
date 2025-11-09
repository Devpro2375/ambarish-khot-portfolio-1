"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code2, Zap, Shield, Database, Workflow } from "lucide-react";

const items = [
  {
    icon: Brain,
    title: "Computational Fluid Dynamics",
    desc: "Expert in ANSYS, Star CCM+, Converge and COMSOL with specialization in single-phase flow, conjugate heat transfer and reacting/multiphase systems.",
  },
  {
    icon: Code2,
    title: "Emission Solutions",
    desc: "SCR systems, DEF dosing strategy, urea deposit mitigation and emission control development across BS-IV, Euro 5/6, and BS-VI standards.",
  },
  {
    icon: Zap,
    title: "Simulation-Driven Innovation",
    desc: "Freeze–thaw modeling, injector spray simulation, combustion modeling (KIVA-RIF) and system-level optimization.",
  },
  {
    icon: Shield,
    title: "Systematic Problem Solving",
    desc: "TRIZ methodology practitioner and Six Sigma certified engineer with structured problem-solving expertise.",
  },
  {
    icon: Database,
    title: "Technical Leadership",
    desc: "Led teams of 15–30 engineers delivering over $4M in cost savings through simulation-driven product design.",
  },
  {
    icon: Workflow,
    title: "Patents & Publications",
    desc: "Prime inventor on 8 original patents and 17 derivative patents with 6 international publications and book chapters.",
  },
];

export default function Advisory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="advisory" ref={ref} className="py-24 bg-background">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-xs sm:text-sm tracking-wider text-muted-foreground uppercase mb-3">
            Advisory Focus
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Deep Expertise That Drives Innovation
          </h2>

          <p className="text-muted-foreground max-w-2xl sm:max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
            A multidisciplinary engineering background blending simulation
            science, emissions development, advanced modeling and systematic
            innovation.
          </p>
        </motion.div>

        {/* Items */}
        <div className="space-y-14 sm:space-y-16">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex items-start gap-4 sm:gap-6"
            >
              {/* Icon */}
              <div className="p-3 sm:p-4 bg-accent rounded-xl shadow-sm text-foreground shrink-0">
                <item.icon className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="font-serif text-xl sm:text-2xl font-bold mb-2 leading-snug">
                  {item.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm sm:text-base">
                  {item.desc}
                </p>

                <div className="h-[1px] w-full bg-border mt-5 sm:mt-6 opacity-60"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
