'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  {
    title: 'BS-VI & Euro 6 Emission Systems',
    category: 'Product Development',
    description:
      'Developed advanced SCR and DEF systems for next-gen emission compliance.',
    impact: '$4M+ cost savings - 8 patents filed',
    tags: ['Emission Control', 'CFD', 'System Design'],
    image_url:
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80',
  },
  {
    title: 'Aeroacoustics Noise Mitigation',
    category: 'Technical Innovation',
    description:
      'Built CFD models to predict and reduce noise without performance loss.',
    impact: 'CMD Innovation Award Winner',
    tags: ['Acoustics', 'CFD', 'Innovation'],
    image_url:
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    title: 'Freeze-Thaw DEF Analysis',
    category: 'Research & Development',
    description:
      'Created simulation for freeze-thaw DEF behavior to ensure reliability.',
    impact: 'Patent pending - International paper',
    tags: ['Phase Change', 'Multiphase Flow'],
    image_url:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
  },
  {
    title: 'Simulation-Led Burner Rig',
    category: 'Process Innovation',
    description:
      'Optimized SCR uniformity index to 0.99 using simulation-first design.',
    impact: 'CMD Award - 40% faster dev cycle',
    tags: ['CFD', 'Optimization', 'Product Design'],
    image_url:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section
      id="projects"
      ref={ref}
      className="section-shell bg-gradient-to-b from-background via-accent/20 to-background"
    >
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-kicker">Featured Work</p>
          <h2 className="section-title">Impact That Matters</h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">
            A compact showcase of engineering innovation and measurable results.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-36 w-full overflow-hidden bg-muted">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
              </div>

              <div className="p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {project.category}
                  </span>
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>

                <h3 className="font-serif text-lg font-semibold leading-snug text-foreground">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                <p className="mt-3 text-xs font-semibold text-foreground">
                  {project.impact}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-accent px-2 py-1 text-[11px] font-medium text-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
