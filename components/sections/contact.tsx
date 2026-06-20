'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Linkedin, Mail, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: 'Message Sent',
      description: "Thank you for reaching out. I'll respond within 24 hours.",
    });

    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="contact" ref={ref} className="section-shell bg-background">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <p className="section-kicker">Get in Touch</p>
          <h2 className="section-title">Let&apos;s Collaborate</h2>
          <p className="section-copy mx-auto mt-4 max-w-3xl">
            Open to technical consulting, collaborative research, speaking
            engagements, and innovation partnerships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <h3 className="font-serif text-2xl font-bold text-foreground">
              Contact Information
            </h3>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3">
                <div className="icon-tile">
                  <Mail className="h-[18px] w-[18px]" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium text-foreground">Email</p>
                  <a
                    href="mailto:ambarishkhot@gmail.com"
                    className="break-words text-sm text-muted-foreground transition-colors hover:text-foreground sm:text-base"
                  >
                    ambarishkhot@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="icon-tile">
                  <Linkedin className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <p className="font-medium text-foreground">LinkedIn</p>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground sm:text-base"
                  >
                    Connect on LinkedIn
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="icon-tile">
                  <MapPin className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Location</p>
                  <p className="text-sm text-muted-foreground sm:text-base">
                    India, Cummins Technical Center
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-border pt-6">
              <p className="text-sm font-semibold text-foreground">
                Areas of Collaboration
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Technical consulting, collaborative research, speaking
                engagements, CFD simulation, emission solutions, and systematic
                innovation.
              </p>
              <p className="mt-3 text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">Mobile:</span>{' '}
                +91 9975428004
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="border-border"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-foreground"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="border-border"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label
                  htmlFor="organization"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Organization
                </label>
                <Input
                  id="organization"
                  name="organization"
                  placeholder="Your company or organization"
                  className="border-border"
                />
              </div>

              <div className="mt-4">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-foreground"
                >
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or inquiry..."
                  className="resize-none border-border"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="mt-5 w-full bg-foreground text-background hover:bg-foreground/90"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
