'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Advisory', href: '#advisory' },
  { name: 'Vision', href: '#vision' },
  { name: 'Insights', href: '#insights' },
  { name: 'Projects', href: '#projects' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-sm shadow-sm border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between sm:h-[72px]">
          <Link href="/" className="font-serif text-xl font-bold tracking-tight text-foreground transition-colors hover:text-muted-foreground sm:text-2xl">
            AK
          </Link>

          <div className="hidden items-center gap-4 lg:flex xl:gap-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group relative text-xs font-medium text-muted-foreground transition-colors hover:text-foreground xl:text-sm"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-foreground transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <ThemeToggle />
            <Button
              asChild
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="space-y-3 px-4 py-4 sm:px-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Button
              asChild
              className="w-full bg-foreground text-background hover:bg-foreground/90"
            >
              <Link href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                Get in Touch
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
