"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "BS-VI & Euro 6 Emission Systems",
    category: "Product Development",
    description:
      "Developed advanced SCR and DEF systems for next-gen emission compliance.",
    impact: "$4M+ cost savings · 8 patents filed",
    tags: ["Emission Control", "CFD", "System Design"],
    image_url:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80",
  },
  {
    title: "Aeroacoustics Noise Mitigation",
    category: "Technical Innovation",
    description:
      "Built CFD models to predict and reduce noise without performance loss.",
    impact: "CMD Innovation Award Winner",
    tags: ["Acoustics", "CFD", "Innovation"],
    image_url:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
  {
    title: "Freeze-Thaw DEF Analysis",
    category: "Research & Development",
    description:
      "Created simulation for freeze-thaw DEF behavior to ensure reliability.",
    impact: "Patent pending · International paper",
    tags: ["Phase Change", "Multiphase Flow"],
    image_url:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80",
  },
  {
    title: "Simulation-Led Burner Rig",
    category: "Process Innovation",
    description:
      "Optimized SCR uniformity index to 0.99 using simulation-first design.",
    impact: "CMD Award · 40% faster dev cycle",
    tags: ["CFD", "Optimization", "Product Design"],
    image_url:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} className="py-24 bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-widest text-primary/70 mb-2">
            Featured Work
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Impact That Matters
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto">
            Compact showcase of engineering innovation and measurable results.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="group bg-card/70 backdrop-blur-md border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1.5 transition-all duration-300">
                {/* Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[11px] uppercase tracking-wide font-medium text-primary/70">
                      {project.category}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>

                  <h3 className="font-serif text-lg font-semibold text-foreground mb-2 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  <p className="text-xs text-primary/80 font-semibold mb-3">
                    {project.impact}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 text-[11px] bg-primary/10 text-primary rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
