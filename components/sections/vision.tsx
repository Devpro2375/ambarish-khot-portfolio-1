'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Compass, Heart, Target, TrendingUp } from 'lucide-react';

const missions = [
  {
    icon: TrendingUp,
    title: 'Technology-Driven Innovation',
    description:
      'Enable business, product, and process innovation that creates measurable impact across industries.',
  },
  {
    icon: Target,
    title: 'Strengthen Make in India',
    description:
      'Support export initiatives with deep grassroots capability and stronger indigenous technology development.',
  },
  {
    icon: Compass,
    title: 'Develop Technical Leaders',
    description:
      'Retain and develop technical leaders to establish India as a global intellectual capital.',
  },
];

export default function Vision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="vision" ref={ref} className="section-shell bg-accent/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-kicker">Vision & Mission</p>
          <h2 className="section-title">Creating Impact Beyond Engineering</h2>
        </motion.div>

        <div className="mb-12 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="surface-panel p-5 sm:p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-foreground text-background">
                <Heart className="h-[18px] w-[18px]" />
              </div>
              <h3 className="font-serif text-xl font-bold text-foreground sm:text-2xl">
                Purpose
              </h3>
            </div>
            <div className="space-y-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
              <p>
                India has sustained through centuries, maintaining its pride
                through sacrifice and resilience. The challenge now is to
                convert traditional wisdom into tangible wealth.
              </p>
              <p>
                The future is shaped by actions taken today. The focus is on
                building technology and intellectual capital with practical,
                measurable impact.
              </p>
              <p className="font-semibold text-foreground">
                Building the technology and intellectual capital that will make
                India proud again.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-lg bg-foreground p-5 text-background shadow-sm sm:p-6"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-background text-foreground">
                <Target className="h-[18px] w-[18px]" />
              </div>
              <h3 className="font-serif text-xl font-bold sm:text-2xl">
                Vision
              </h3>
            </div>
            <p className="font-serif text-2xl font-semibold leading-snug sm:text-3xl">
              Make India proud by developing technology and intellectual capital
              to achieve <span className="underline underline-offset-4">$35 trillion GDP by 2047</span>.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="mb-5 font-serif text-2xl font-bold text-foreground sm:text-3xl">
            Mission Pillars
          </h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {missions.map((mission, index) => (
              <motion.div
                key={mission.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="surface-panel p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <div className="icon-tile">
                    <mission.icon className="h-[18px] w-[18px]" />
                  </div>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h4 className="font-serif text-lg font-bold leading-snug text-foreground">
                  {mission.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {mission.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mx-auto mt-12 max-w-4xl border-t border-border pt-6 text-center font-serif text-xl italic leading-relaxed text-foreground sm:text-2xl"
        >
          Today we are where we are because of our past deeds, and where we will
          be in the near future depends on the corrective actions we take today.
        </motion.blockquote>
      </div>
    </section>
  );
}
