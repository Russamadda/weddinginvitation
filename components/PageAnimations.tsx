"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PageAnimations() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (preference.matches || !window.IntersectionObserver) return;
    const elements = document.querySelectorAll<HTMLElement>(
      ".home-intro h2, .invitation-copy, .envelope-composition, .celebration-line, .countdown-clock, .countdown-caption, .love-story-content > h1, .love-story-content > p, .story-portrait, .story-rings, .details-canvas > h1, .details-canvas > h2, .details-venue-photo, .details-by-car, .details-traveling, .details-speeches, .details-friday, .details-saturday, .details-sunday, .details-stay, .details-dress-copy, .details-gifts-copy, .faq-hero h1, .faq-bouquet, .faq-questions > section, .rsvp-page-intro"
    );
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    elements.forEach(element => {
      // Keep already-visible content readable immediately and enhance content below it.
      if (element.getBoundingClientRect().top >= window.innerHeight) {
        element.classList.add("reveal-ready");
        observer.observe(element);
      }
    });
    const revealAll = () => { if (preference.matches) elements.forEach(element => element.classList.add("reveal-visible")); };
    preference.addEventListener("change", revealAll);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", revealAll);
      elements.forEach(element => element.classList.remove("reveal-ready", "reveal-visible"));
    };
  }, [pathname]);
  return null;
}
