'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
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

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" ref={ref} className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            About
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Engineering Excellence, Proven Results
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nearly two decades of pioneering work in computational fluid dynamics and emission control systems at Cummins—transforming complex technical challenges into practical, high-impact solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent mb-4">
                <item.icon className="h-6 w-6 text-foreground" />
              </div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                {item.value.includes('+') ? (
                  <>
                    <StatsCounter end={parseInt(item.value)} />
                    {item.value.includes('M') ? 'M' : ''}
                    +
                  </>
                ) : (
                  <StatsCounter end={parseInt(item.value)} />
                )}
              </p>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Expertise
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Technical Advisor</span> at Cummins Emission Solutions, leading breakthrough innovations in aftertreatment systems and multiphase flow modeling.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">M.S. in Computational Fluid Dynamics</span> from Moscow State University. Published author in Springer and Begell House technical books.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">25 patents</span> spanning BS-IV, Euro 5, Euro 6, and BS-VI emission standards—driving global automotive innovation.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Philosophy & Values
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Personal mission: <span className="font-semibold text-foreground italic">"Faster, better, easier & cheaper than my yesterday."</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Combining <span className="font-semibold text-foreground">TRIZ innovation methodologies</span> with cutting-edge CFD simulation to solve complex engineering problems systematically.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Committed to building India's intellectual capital and advancing the nation toward global technology leadership—guided by integrity, teamwork, and excellence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
