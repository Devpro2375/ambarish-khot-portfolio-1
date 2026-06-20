import Link from 'next/link';
import { Linkedin, Mail, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-2xl font-bold">Ambarish Khot</h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-background/70">
              Technical Advisor specializing in CFD, emission solutions, and
              simulation-based innovation.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="mt-3 grid grid-cols-2 gap-2 md:block md:space-y-2">
              {[
                'About',
                'Awards',
                'Gallery',
                'Advisory',
                'Vision',
                'Insights',
                'Projects',
                'Testimonials',
                'Contact',
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase()}`}
                    className="text-sm text-background/70 transition-colors hover:text-background"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">
              Connect
            </h4>
            <div className="mt-3 flex gap-3">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-background/15 p-2 text-background/70 transition-colors hover:text-background"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-background/15 p-2 text-background/70 transition-colors hover:text-background"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="mailto:ambarishkhot11@gmail.com"
                className="rounded-md border border-background/15 p-2 text-background/70 transition-colors hover:text-background"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-background/20 pt-6 text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} Ambarish Khot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
