'use client';

import { useState } from 'react';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { MessageSquare, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function FeedbackForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(0);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const data = {
        name: formData.get('name') as string,
        email: formData.get('email') as string,
        feedback_type: formData.get('feedback_type') as string,
        message: formData.get('message') as string,
        rating: rating || undefined,
      };

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      toast({
        title: 'Feedback Submitted',
        description: 'Thank you for your valuable feedback!',
      });

      setIsOpen(false);
      (e.target as HTMLFormElement).reset();
      setRating(0);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to submit feedback. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-8 right-8 rounded-full h-14 w-14 shadow-lg bg-foreground text-background hover:bg-foreground/90 z-50"
          size="icon"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Share Your Feedback</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div>
            <Label htmlFor="feedback-name">Name</Label>
            <Input
              id="feedback-name"
              name="name"
              required
              placeholder="Your name"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="feedback-email">Email</Label>
            <Input
              id="feedback-email"
              name="email"
              type="email"
              required
              placeholder="your@email.com"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="feedback-type">Feedback Type</Label>
            <Select name="feedback_type" defaultValue="general" required>
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General Feedback</SelectItem>
                <SelectItem value="testimonial">Testimonial</SelectItem>
                <SelectItem value="technical">Technical Inquiry</SelectItem>
                <SelectItem value="collaboration">Collaboration Request</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Rate Your Experience (Optional)</Label>
            <div className="flex gap-2 mt-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      value <= rating
                        ? 'fill-yellow-500 text-yellow-500'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label htmlFor="feedback-message">Message</Label>
            <Textarea
              id="feedback-message"
              name="message"
              required
              rows={5}
              placeholder="Share your thoughts, suggestions, or collaboration ideas..."
              className="mt-2"
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-foreground text-background hover:bg-foreground/90"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
