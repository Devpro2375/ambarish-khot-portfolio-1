'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DotPattern } from '@/components/ui/dot-pattern';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-accent to-background">
      <DotPattern />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* SWE Patent Recognition Award Badge */}
            <motion.div
              className="inline-flex items-center gap-2 text-sm text-foreground/90 bg-accent/60 rounded-full px-3 py-1 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
              Honored with SWE’s Patent Recognition Award — Global Engineering Honor (2025)
            </motion.div>

            <motion.p
              className="text-sm uppercase tracking-wider text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Technical Advisor | CFD Expert
            </motion.p>

            <motion.h1
              className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ambarish Khot
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Transforming complex engineering challenges into breakthrough innovations through advanced CFD simulation and systematic problem-solving.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 group"
              >
                <Link href="#insights">
                  Explore Insights
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border hover:bg-accent"
              >
                <Link href="#contact">Connect</Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-border hover:bg-accent"
              >
                <Link href="#gallery">Gallery</Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="aspect-square bg-gradient-to-br from-muted via-accent to-muted rounded-2xl overflow-hidden relative group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-foreground/10 to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-48 h-48 bg-muted-foreground/30 rounded-full blur-3xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="absolute left-1/2 top-1/2 h-[86%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-background/80 bg-background/80 p-2 shadow-2xl shadow-foreground/10 backdrop-blur-sm">
                <div className="relative h-full overflow-hidden rounded-xl bg-muted">
                  <Image
                    src="/hero-ambarish-khot.png"
                    alt="Portrait of Ambarish Khot"
                    fill
                    priority
                    className="object-cover object-[52%_24%]"
                    sizes="(min-width: 1024px) 31vw, 100vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-muted-foreground rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
