'use client';

import { motion, useInView } from 'framer-motion';
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
    image_url:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
  },
  {
    title: 'Aeroacoustics Noise Prediction in Aftertreatment Systems',
    excerpt:
      'Advanced computational methods for predicting and mitigating noise in emission control systems using computational aeroacoustics techniques.',
    date: 'International Publication',
    category: 'Acoustics & CFD',
    read_time: '10 min read',
    slug: 'aeroacoustics-noise-prediction',
    image_url:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    title: 'Urea Deposit Mitigation Strategies in SCR Technology',
    excerpt:
      'Innovative approaches to prevent and mitigate urea crystallization in selective catalytic reduction systems through simulation and design optimization.',
    date: 'Research Publication',
    category: 'Emission Technology',
    read_time: '15 min read',
    slug: 'urea-deposit-mitigation',
    image_url:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
  },
];

export default function Insights() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="insights" ref={ref} className="section-shell bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-kicker">Insights</p>
          <h2 className="section-title">Research & Publications</h2>
          <p className="section-copy mx-auto mt-4 max-w-3xl">
            Technical insights on computational fluid dynamics, emission control
            systems, and systematic innovation methodologies.
          </p>
        </motion.div>

        <div className="divide-y divide-border">
          {fallbackArticles.map((article, index) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group py-6 first:pt-0 last:pb-0 sm:py-7"
            >
              <div className="grid grid-cols-1 gap-4 md:grid-cols-[180px_1fr] md:gap-6">
                <div className="relative h-40 w-full overflow-hidden rounded-lg bg-muted md:h-full md:min-h-[150px]">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {article.date}
                    </span>
                    <span>{article.category}</span>
                    <span>{article.read_time}</span>
                  </div>

                  <h3 className="font-serif text-xl font-bold leading-snug text-foreground sm:text-2xl">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {article.excerpt}
                  </p>
                  <Link
                    href={`/insights/${article.slug}`}
                    className="mt-4 inline-flex items-center text-sm font-medium text-foreground transition-colors hover:text-muted-foreground"
                  >
                    Read Article
                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
