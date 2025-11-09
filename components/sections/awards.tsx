"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";

export default function Awards() {
  return (
    <section
      id="awards"
      className="py-20 sm:py-28 bg-background border-t border-border"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="text-xs sm:text-sm uppercase tracking-wider text-muted-foreground mb-2 sm:mb-3">
            Recognition
          </p>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-snug">
            Awards & Achievements
          </h2>
        </motion.div>

        {/* Award Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-card border border-border p-6 sm:p-10 rounded-2xl shadow-md hover:shadow-xl transition-all"
        >
          <div className="flex items-start gap-4 sm:gap-6">
            {/* Icon */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl bg-foreground text-background shrink-0">
              <Award className="h-6 w-6 sm:h-7 sm:w-7" />
            </div>

            {/* Text */}
            <div className="flex-1">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-2 leading-snug">
                SWE Patent Recognition Award (2025)
              </h3>

              <p className="text-muted-foreground text-sm sm:text-lg leading-relaxed mb-3">
                Recognized globally by the Society of Women Engineers (SWE) for
                innovation excellence and patent contributions.
              </p>

              <p className="text-xs sm:text-sm text-muted-foreground">
                Message from Ambarish:
                <span className="block text-foreground font-medium mt-1">
                  “It gives me immense pleasure to share that I received the SWE
                  Patent Award as an innovator. This recognition is global. You
                  can search my name on the official awards list.”
                </span>
              </p>

              <a
                href="https://alltogether.swe.org/2025/09/2025-swe-recognition-recipients/"
                target="_blank"
                className="text-foreground underline mt-4 inline-block hover:text-foreground/80 text-sm sm:text-base"
              >
                View Official Award Listing →
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
