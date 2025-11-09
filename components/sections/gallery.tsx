'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { X } from 'lucide-react';

const galleryItems = [
  // {
  //   src: '/gallery/swe-patent-award.jpg',
  //   title: 'SWE Patent Recognition Award (2025)',
  //   description:
  //     'Global recognition by the Society of Women Engineers for patented engineering innovations.',
  // },
  {
    src: '/gallery/siemens-best-paper.jpeg',
    title: 'Best Technical Paper Award – Siemens (2023)',
    description:
      'Awarded during Simcenter Day 2023 for outstanding technical contribution.',
  },
  {
    src: '/gallery/publication-certificate.jpg',
    title: 'International Journal Publication (2018)',
    description:
      'Published in Applied Thermal Engineering (Elsevier), showcasing original CFD research.',
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
    <section id="gallery" ref={ref} className="py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Achievements Gallery
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A curated museum-style showcase featuring major awards, publications,
            and engineering recognitions.
          </p>
        </motion.div>

        {/* Museum Wall Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {galleryItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="cursor-pointer group"
              onClick={() => setModalImage(item.src)}
            >
              {/* Frame */}
              <div className="bg-muted rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="w-full h-72 flex items-center justify-center bg-background rounded-lg overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="max-h-full max-w-full object-contain rounded-lg"
                  />
                </div>
              </div>

              {/* Caption */}
              <div className="mt-4 text-center">
                <h3 className="font-serif text-xl font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setModalImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage}
              alt="Expanded"
              className="w-full h-auto max-h-[90vh] object-contain rounded-xl shadow-xl"
            />

            <button
              className="absolute -top-4 -right-4 bg-background text-foreground p-2 rounded-full shadow-md hover:bg-muted transition"
              onClick={() => setModalImage(null)}
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
