"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, Lightbulb, Users } from "lucide-react";
import Image from "next/image";

const achievements = [
  {
    title: "SWE Innovator - Patent Recognition Award",
    year: "2025",
    label: "Global Patent Recognition",
    image: "/gallery/cummins-patent-wall.jpeg",
    imageAlt: "Cummins Technical Center India patent wall",
    icon: Award,
    summary:
      "Listed by the Society of Women Engineers under Patent Recognition as Ambarish Khot, D.Eng, Cummins Inc., with 2 patents.",
    details: [
      "Recognizes engineering-related patents granted in the previous three years.",
      "Highlights patented innovation work connected with Cummins engineering impact.",
    ],
    links: [
      {
        label: "Official SWE listing",
        href: "https://alltogether.swe.org/2025/09/2025-swe-recognition-recipients/",
      },
    ],
  },
  {
    title: "CII Industry-Academia Partnership",
    year: "2025",
    label: "Industry + University Collaboration",
    icon: Lightbulb,
    summary:
      "Cummins Technologies India Private Limited is featured in the CII Industry-Academia Partnership Compendium 2025 for the IIT Dharwad collaboration on urea dosing and droplet-wall interaction dynamics.",
    details: [
      "Project: Droplet Wall Interaction Dynamics During Urea Dosing in an After Treatment System.",
      "Leader listed in the CII compendium: Ambarish D Khot.",
    ],
    links: [
      {
        label: "CII award page",
        href: "https://cii-industryacademia.in/award_2025",
      },
      {
        label: "CII 2025 compendium",
        href: "https://cii-industryacademia.in/images/pdf/CII-Industry-Academia-Partnership-Compendium-2025.pdf",
      },
    ],
  },
  {
    title: "Key Panel Member - AI Conference",
    year: "2026",
    label: "DEP MeshWorks | AIWorks Conclave",
    image: "/gallery/dep-meshworks-aiworks-conclave-2026.jpeg",
    imageAlt: "DEP MeshWorks and AIWorks Conclave 2026 panel member recognition",
    icon: Users,
    summary:
      "Recognized as a panel member at the DEP MeshWorks | AIWorks Conclave 2026 on physics-driven predictive and generative AI for product development and manufacturing.",
    details: [
      "Event date shown on the recognition plaque: April 7, 2026.",
      "Focus area: physics-driven predictive AI, generative AI, and simulation-led engineering transformation.",
    ],
    links: [
      {
        label: "DEP AIWorks",
        href: "https://depusa.com/index.php/aiworks",
      },
      {
        label: "DEP MeshWorks",
        href: "https://depusa.com/index.php/meshworks",
      },
    ],
  },
];

export default function Awards() {
  return (
    <section id="awards" className="section-shell border-t border-border bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-kicker">Recent Recognition</p>

          <h2 className="section-title">Awards & Achievements</h2>

          <p className="section-copy mx-auto mt-4 max-w-3xl">
            Verified recognitions, industry collaborations, and technical AI
            leadership moments with source links.
          </p>
        </motion.div>

        <div className="space-y-4">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;

            return (
              <motion.article
                key={achievement.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.12 }}
                className="grid gap-4 rounded-lg border border-border bg-card p-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:p-4 md:grid-cols-[200px_1fr] md:items-stretch"
              >
                <div className="relative h-36 rounded-lg border border-border/60 bg-muted p-2 md:h-full md:min-h-[156px]">
                  <div className="relative h-full overflow-hidden rounded-md bg-background">
                    {achievement.image ? (
                      <Image
                        src={achievement.image}
                        alt={achievement.imageAlt}
                        fill
                        className="object-contain"
                        sizes="(min-width: 768px) 220px, 100vw"
                      />
                    ) : (
                      <div className="flex h-full flex-col justify-between bg-[linear-gradient(135deg,hsl(var(--foreground))_0%,hsl(var(--neutral-700))_58%,hsl(var(--accent-blue-700))_100%)] p-5 text-background">
                        <div className="flex items-center justify-between text-[11px] uppercase tracking-wider text-background/70">
                          <span>CII</span>
                          <span>{achievement.year}</span>
                        </div>
                        <div>
                          <p className="mb-2 font-serif text-2xl font-bold leading-tight">
                            Industry + Academia
                          </p>
                          <p className="text-xs leading-relaxed text-background/75">
                            Cummins x IIT Dharwad collaboration featured in the
                            2025 compendium.
                          </p>
                        </div>
                        <div className="h-1 w-20 bg-background/80" />
                      </div>
                    )}
                  </div>

                  <div className="absolute left-4 top-4 rounded-md bg-background/95 px-2.5 py-1 text-[11px] font-medium text-foreground shadow-sm">
                    {achievement.year}
                  </div>
                </div>

                <div className="flex min-w-0 flex-col py-1">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
                      <Icon className="h-[18px] w-[18px]" />
                    </div>

                    <div>
                      <p className="mb-1 text-xs uppercase tracking-wider text-muted-foreground">
                        {achievement.label}
                      </p>
                      <h3 className="font-serif text-xl font-bold leading-tight text-foreground sm:text-2xl">
                        {achievement.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {achievement.summary}
                  </p>

                  <ul className="mt-4 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                    {achievement.details.map((detail) => (
                      <li key={detail} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/70" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {achievement.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
                      >
                        {link.label}
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
