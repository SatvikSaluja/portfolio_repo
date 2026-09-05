"use client";

import { useEffect } from "react";
import { BlackHole } from "@/components/ui/black-hole";
import { NAV_HTML, PAGE_CONTENT_HTML } from "./portfolio-content";
import "./portfolio.css";

export default function PortfolioPage() {
  // Sidebar scroll-spy: highlight the nav link for whichever section is in view.
  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".rail-link"),
    );
    const sections = links
      .map((l) => document.querySelector(l.getAttribute("href") || ""))
      .filter((el): el is Element => Boolean(el));
    if (!("IntersectionObserver" in window) || !sections.length) return;

    let current: string | null = null;
    function setActive(id: string) {
      if (id === current) return;
      current = id;
      links.forEach((l) => {
        l.classList.toggle("is-active", l.getAttribute("href") === "#" + id);
      });
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Fade-up reveal for cards and section headers as they scroll into view.
  useEffect(() => {
    let observer: IntersectionObserver | undefined;
    let fallback: ReturnType<typeof setTimeout> | undefined;
    try {
      const reduceMotion =
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion || !("IntersectionObserver" in window)) return;

      const targets = Array.from(
        document.querySelectorAll<HTMLElement>(".entry, .earlier-item, .section-head"),
      );
      if (!targets.length) return;

      targets.forEach((el, i) => {
        el.classList.add("reveal");
        el.style.transitionDelay = `${Math.min(i % 4, 3) * 70}ms`;
      });

      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      targets.forEach((el) => observer!.observe(el));

      // Safety net: never leave content invisible if something above goes wrong.
      fallback = setTimeout(() => {
        targets.forEach((el) => el.classList.add("is-visible"));
      }, 2500);
    } catch {
      document
        .querySelectorAll<HTMLElement>(".reveal")
        .forEach((el) => el.classList.add("is-visible"));
    }
    return () => {
      observer?.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="portfolio-scope">
      <div dangerouslySetInnerHTML={{ __html: NAV_HTML }} />
      <div className="page">
        <figure className="hero-banner" aria-hidden="true">
          <BlackHole className="hero-net" />
        </figure>
        <div dangerouslySetInnerHTML={{ __html: PAGE_CONTENT_HTML }} />
      </div>
    </div>
  );
}
