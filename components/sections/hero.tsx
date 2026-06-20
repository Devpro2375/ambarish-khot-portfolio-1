'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DotPattern } from '@/components/ui/dot-pattern';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-accent to-background pt-24 pb-16 sm:pt-28 lg:flex lg:min-h-screen lg:items-center lg:justify-center lg:py-28">
      <DotPattern />
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="mb-4 inline-flex max-w-full items-center gap-2 rounded-md bg-background/70 px-3 py-1.5 text-xs text-foreground/90 shadow-sm ring-1 ring-border/70 backdrop-blur sm:text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <span className="inline-block h-2 w-2 rounded-full bg-foreground" />
              Honored with SWE&apos;s Patent Recognition Award - Global
              Engineering Honor (2025)
            </motion.div>

            <motion.p
              className="mb-4 text-xs uppercase tracking-wider text-muted-foreground sm:mb-5 sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Technical Advisor | CFD Expert
            </motion.p>

            <motion.h1
              className="mb-5 font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Ambarish Khot
            </motion.h1>

            <motion.p
              className="mb-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Transforming complex engineering challenges into breakthrough
              innovations through advanced CFD simulation and systematic
              problem-solving.
            </motion.p>

            <motion.div
              className="flex flex-col gap-3 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                asChild
                size="lg"
                className="group bg-foreground text-background hover:bg-foreground/90"
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
            className="relative mx-auto w-full max-w-[280px] sm:max-w-xs lg:max-w-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <div className="group relative aspect-square overflow-hidden rounded-lg bg-gradient-to-br from-muted via-accent to-muted">
              <motion.div
                className="absolute inset-0 bg-gradient-to-tr from-foreground/10 to-transparent"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="h-36 w-36 rounded-full bg-muted-foreground/25 blur-3xl sm:h-44 sm:w-44"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              <div className="absolute left-1/2 top-1/2 h-[86%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-background/80 bg-background/85 p-2 shadow-xl shadow-foreground/10 backdrop-blur-sm">
                <div className="relative h-full overflow-hidden rounded-md bg-muted">
                  <Image
                    src="/hero-ambarish-khot.png"
                    alt="Portrait of Ambarish Khot"
                    fill
                    priority
                    className="object-cover object-[52%_24%]"
                    sizes="(min-width: 1024px) 31vw, 280px"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 lg:block">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="flex h-10 w-6 justify-center rounded-full border-2 border-muted-foreground pt-2">
            <div className="h-2 w-1 rounded-full bg-muted-foreground" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
