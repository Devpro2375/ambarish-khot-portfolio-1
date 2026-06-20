'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Globe, TrendingUp, Users } from 'lucide-react';
import { StatsCounter } from '@/components/ui/stats-counter';

const highlights = [
  {
    icon: Award,
    value: '18+',
    label: 'Years at Cummins',
  },
  {
    icon: Globe,
    value: '25+',
    label: 'Patents Worldwide',
  },
  {
    icon: TrendingUp,
    value: '$4M+',
    label: 'Cost Savings Delivered',
  },
  {
    icon: Users,
    value: '6',
    label: 'International Publications',
  },
];

function getNumericValue(str: string): number {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="section-shell bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-kicker">About</p>
          <h2 className="section-title">Engineering Excellence, Proven Results</h2>
          <p className="section-copy mx-auto mt-4 max-w-3xl">
            Nearly two decades of pioneering work in computational fluid
            dynamics and emission control systems at Cummins, transforming
            complex technical challenges into practical, high-impact solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
        >
          {highlights.map((item, index) => {
            const number = getNumericValue(item.value);
            const prefix = item.value.includes('$') ? '$' : '';
            const suffix = `${item.value.includes('M') ? 'M' : ''}${item.value.includes('+') ? '+' : ''}`;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="soft-panel p-4 text-center sm:p-5"
              >
                <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-background text-foreground shadow-sm">
                  <item.icon className="h-[18px] w-[18px]" />
                </div>
                <p className="mb-1 font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  <StatsCounter end={number} prefix={prefix} suffix={suffix} />
                </p>
                <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2"
        >
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Expertise
            </h3>
            <p className="section-copy">
              <span className="font-semibold text-foreground">
                Technical Advisor
              </span>{' '}
              at Cummins Emission Solutions, leading breakthrough innovations in
              aftertreatment systems and multiphase flow modeling.
            </p>
            <p className="section-copy">
              <span className="font-semibold text-foreground">
                M.S. in Computational Fluid Dynamics
              </span>{' '}
              from Moscow State University. Published author in Springer and
              Begell House technical books.
            </p>
            <p className="section-copy">
              Recipient of the{' '}
              <span className="font-semibold text-foreground">
                SWE Patent Recognition Award (2025)
              </span>
              , honoring patented innovations advancing engineering practice and
              impact.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Philosophy & Values
            </h3>
            <p className="section-copy">
              Personal mission:{' '}
              <span className="font-semibold italic text-foreground">
                &quot;Faster, better, easier & cheaper than my yesterday.&quot;
              </span>
            </p>
            <p className="section-copy">
              Combining{' '}
              <span className="font-semibold text-foreground">
                TRIZ innovation methodologies
              </span>{' '}
              with cutting-edge CFD simulation to solve complex engineering
              problems systematically.
            </p>
            <p className="section-copy">
              Committed to building India&apos;s intellectual capital and
              advancing the nation toward global technology leadership, guided by
              integrity, teamwork, and excellence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
