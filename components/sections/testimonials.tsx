'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Send, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const testimonialPrompts = [
  'Technical collaboration',
  'Mentorship or guidance',
  'Conference or panel interaction',
];

type PublicTestimonial = {
  id: string;
  name: string;
  relationship?: string;
  organization?: string;
  message: string;
  rating?: number | null;
};

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<PublicTestimonial[]>([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [relationship, setRelationship] = useState('colleague');
  const [rating, setRating] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials');

        if (!response.ok) {
          throw new Error('Failed to load testimonials');
        }

        const data = await response.json();
        setTestimonials(Array.isArray(data) ? data : []);
      } catch {
        setTestimonials([]);
      } finally {
        setIsLoadingTestimonials(false);
      }
    };

    fetchTestimonials();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      const name = formData.get('name') as string;
      const email = formData.get('email') as string;
      const organization = formData.get('organization') as string;
      const message = formData.get('message') as string;

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          feedback_type: 'testimonial',
          rating: rating || undefined,
          message: [
            `Relationship: ${relationship}`,
            organization ? `Organization: ${organization}` : null,
            '',
            message,
          ]
            .filter(Boolean)
            .join('\n'),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit testimonial');
      }

      toast({
        title: 'Testimonial submitted',
        description: 'Thank you. It will be reviewed before publishing.',
      });

      form.reset();
      setRelationship('colleague');
      setRating(0);
    } catch {
      toast({
        title: 'Submission failed',
        description: 'Please try again or use the contact form.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="section-shell bg-background">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="section-kicker">Testimonials</p>
            <h2 className="font-serif text-3xl font-bold leading-tight text-foreground sm:text-4xl">
              Share your experience
            </h2>
            <p className="section-copy mt-4 max-w-xl">
              Colleagues, collaborators, students, and conference participants
              can share a short note about working with Ambarish. Submissions are
              reviewed before they are used on the website.
            </p>

            <div className="mt-6 space-y-3">
              {isLoadingTestimonials ? (
                <div className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
                  Loading testimonials...
                </div>
              ) : testimonials.length > 0 ? (
                testimonials.map((testimonial, index) => (
                  <motion.article
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08 }}
                    className="rounded-lg border border-border bg-card p-4 shadow-sm"
                  >
                    {testimonial.rating ? (
                      <div className="mb-3 flex gap-1">
                        {Array.from({ length: testimonial.rating }).map(
                          (_, i) => (
                            <Star
                              key={i}
                              className="h-4 w-4 fill-yellow-500 text-yellow-500"
                            />
                          ),
                        )}
                      </div>
                    ) : null}

                    <p className="text-sm leading-relaxed text-foreground">
                      &quot;{testimonial.message}&quot;
                    </p>

                    <div className="mt-4 border-t border-border pt-3">
                      <p className="font-medium text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {[testimonial.relationship, testimonial.organization]
                          .filter(Boolean)
                          .join(' - ')}
                      </p>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="grid gap-3">
                  {testimonialPrompts.map((prompt) => (
                    <div
                      key={prompt}
                      className="flex items-center gap-3 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm text-foreground"
                    >
                      <MessageSquareQuote className="h-4 w-4 shrink-0" />
                      <span>{prompt}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-lg border border-border bg-card p-4 shadow-sm sm:p-5"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label htmlFor="testimonial-name">Name</Label>
                  <Input
                    id="testimonial-name"
                    name="name"
                    required
                    placeholder="Your name"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="testimonial-email">Email</Label>
                  <Input
                    id="testimonial-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="mt-2"
                  />
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label>Relationship</Label>
                  <Select value={relationship} onValueChange={setRelationship}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="colleague">Colleague</SelectItem>
                      <SelectItem value="collaborator">Collaborator</SelectItem>
                      <SelectItem value="student">Student / Mentee</SelectItem>
                      <SelectItem value="conference">
                        Conference participant
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="testimonial-organization">
                    Organization
                  </Label>
                  <Input
                    id="testimonial-organization"
                    name="organization"
                    placeholder="Company / institute"
                    className="mt-2"
                  />
                </div>
              </div>

              <div>
                <Label>Rating</Label>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setRating(value)}
                      className="rounded-md p-1 transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`${value} star rating`}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          value <= rating
                            ? 'fill-yellow-500 text-yellow-500'
                            : 'text-muted-foreground/40'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="testimonial-message">Testimonial</Label>
                <Textarea
                  id="testimonial-message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Write a short testimonial about your experience..."
                  className="mt-2"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-foreground text-background hover:bg-foreground/90"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Testimonial'}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
