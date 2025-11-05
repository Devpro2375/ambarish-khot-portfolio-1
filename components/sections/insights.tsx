'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';

const fallbackArticles = [
  {
    title: 'Freeze-Thaw Analysis of Diesel Exhaust Fluid in SCR Systems',
    excerpt:
      'Comprehensive CFD study on freezing and defrosting behavior of urea solution in aftertreatment systems, enabling robust cold-weather operation.',
    date: 'Published Research',
    category: 'CFD & Phase Change',
    read_time: '12 min read',
    slug: 'freeze-thaw-def-analysis',
    image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
  },
  {
    title: 'Aeroacoustics Noise Prediction in Aftertreatment Systems',
    excerpt:
      'Advanced computational methods for predicting and mitigating noise in emission control systems using computational aeroacoustics techniques.',
    date: 'International Publication',
    category: 'Acoustics & CFD',
    read_time: '10 min read',
    slug: 'aeroacoustics-noise-prediction',
    image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    title: 'Urea Deposit Mitigation Strategies in SCR Technology',
    excerpt:
      'Innovative approaches to prevent and mitigate urea crystallization in selective catalytic reduction systems through simulation and design optimization.',
    date: 'Research Publication',
    category: 'Emission Technology',
    read_time: '15 min read',
    slug: 'urea-deposit-mitigation',
    image_url: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
  },
];

export default function Insights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="insights" ref={ref} className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
            Insights
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6">
            Research & Publications
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Technical insights on computational fluid dynamics, emission control systems, and systematic innovation methodologies.
          </p>
        </motion.div>

        <div className="space-y-12">
          {fallbackArticles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border-b border-border pb-12 last:border-b-0 group hover:bg-accent/30 -mx-4 px-4 py-6 rounded-lg transition-all duration-300 cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-3">
                  {article.image_url && (
                    <div className="relative h-48 lg:h-full w-full overflow-hidden rounded-lg mb-4 lg:mb-0">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                </div>

                <div className="lg:col-span-9">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    {article.date}
                  </div>
                  <p className="text-sm font-medium text-foreground mb-1">
                    {article.category}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    {article.read_time}
                  </p>

                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-foreground transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="inline-flex items-center text-sm font-medium text-foreground hover:gap-2 transition-all group"
                  >
                    Read Article
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
