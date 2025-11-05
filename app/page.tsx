import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Advisory from '@/components/sections/advisory';
import Vision from '@/components/sections/vision';
import Insights from '@/components/sections/insights';
import Projects from '@/components/sections/projects';
import Contact from '@/components/sections/contact';
import { Toaster } from '@/components/ui/toaster';
import { FeedbackForm } from '@/components/feedback-form';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Advisory />
      <Vision />
      <Insights />
      <Projects />
      <Contact />
      <FeedbackForm />
      <Toaster />
    </>
  );
}
