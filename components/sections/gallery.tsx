'use client';

import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

const galleryItems = [
  {
    src: '/gallery/dep-meshworks-aiworks-conclave-2026.jpeg',
    title: 'DEP MeshWorks | AIWorks Conclave 2026',
    description:
      'Panel member recognition for physics-driven predictive and generative AI.',
  },
  {
    src: '/gallery/siemens-best-paper.jpeg',
    title: 'Best Technical Paper Award - Siemens',
    description:
      'Awarded during Simcenter Day 2023 for outstanding technical contribution.',
  },
  {
    src: '/gallery/publication-certificate.jpg',
    title: 'International Journal Publication',
    description:
      'Published in Applied Thermal Engineering, showcasing original CFD research.',
  },
  {
    src: '/gallery/cummins-patent-wall.jpeg',
    title: 'Cummins Patent Wall Recognition',
    description:
      'Patented engineering innovation featured at Cummins Technical Center India.',
  },
];

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [modalImage, setModalImage] = useState<string | null>(null);

  return (
    <section id="gallery" ref={ref} className="section-shell bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-kicker">Gallery</p>
          <h2 className="section-title">Achievements Gallery</h2>
          <p className="section-copy mx-auto mt-4 max-w-2xl">
            A curated showcase of awards, publications, and engineering
            recognitions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {galleryItems.map((item, index) => (
            <motion.button
              key={item.src}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-left"
              onClick={() => setModalImage(item.src)}
            >
              <div className="surface-panel p-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                <div className="relative h-48 overflow-hidden rounded-md bg-muted sm:h-56">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-contain p-2 transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </div>

              <div className="mt-3">
                <h3 className="font-serif text-base font-semibold leading-snug text-foreground sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {modalImage && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setModalImage(null)}
        >
          <motion.div
            initial={{ scale: 0.94 }}
            animate={{ scale: 1 }}
            className="relative w-full max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={modalImage}
              alt="Expanded achievement"
              className="max-h-[86vh] w-full rounded-lg object-contain shadow-xl"
            />

            <button
              type="button"
              className="absolute right-2 top-2 rounded-md bg-background p-2 text-foreground shadow-md transition hover:bg-muted sm:-right-3 sm:-top-3"
              onClick={() => setModalImage(null)}
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
