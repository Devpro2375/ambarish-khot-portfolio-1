'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Compass, Heart, TrendingUp } from 'lucide-react';

const missions = [
  {
    icon: TrendingUp,
    title: 'Technology-Driven Innovation',
    description: 'Enable technology-driven business, product, and process innovation that creates measurable impact across industries.',
  },
  {
    icon: Target,
    title: 'Strengthen Make in India',
    description: 'Support Make in India export initiatives with deep footprint at grassroots level, building indigenous capabilities.',
  },
  {
    icon: Compass,
    title: 'Develop Technical Leaders',
    description: 'Retain and develop technical leaders to establish India as the intellectual capital of the world.',
  },
];

export default function Vision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="vision" ref={ref} className="py-32 bg-accent/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Vision & Mission
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Creating Impact Beyond Engineering
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background p-8 rounded-2xl shadow-sm"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-foreground text-background rounded-xl">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-foreground">
                Purpose
              </h3>
            </div>
            <div className="space-y-5 text-muted-foreground leading-relaxed">
              <p>
                India has sustained through centuries, maintaining its pride through sacrifice and resilience. Today's challenge: reclaiming our identity and converting traditional wisdom into tangible wealth.
              </p>
              <p>
                Our future is shaped by the actions we take today. Rather than repeating history's mistakes, we must become the restoring force that returns our nation to its truest potential.
              </p>
              <p className="font-semibold text-foreground text-lg pt-2">
                Building the technology and intellectual capital that will make India proud again.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-foreground to-foreground/90 text-background p-8 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-background text-foreground rounded-xl">
                <Target className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold">
                Vision
              </h3>
            </div>
            <p className="text-xl md:text-2xl leading-relaxed font-semibold">
              Make India proud by developing technology and intellectual capital to achieve <span className="underline decoration-2 underline-offset-4">$35 trillion GDP by 2047</span>.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="font-serif text-3xl font-bold text-foreground mb-12 text-center">
            Mission Pillars
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-background p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-border/50"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-accent rounded-lg">
                    <mission.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="text-sm font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="font-serif text-xl font-bold text-foreground mb-3">
                  {mission.title}
                </h4>
                <p className="text-muted-foreground leading-relaxed">
                  {mission.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <blockquote className="font-serif text-2xl text-foreground italic max-w-4xl mx-auto">
            "Today we are where we are because of our past deeds, and where we will be in the near future depends on the corrective actions we take today."
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}
