"use client";

import { useRef, useState } from "react";
import LangToggle from "./LangToggle";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import { navLinks } from "./nav-links";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { useT } from "@/lib/i18n";
import { scrollToTarget, setScrollLocked } from "@/lib/lenis";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const progress = useRef<HTMLSpanElement>(null);
  const t = useT();

  // Barra de avance del recorrido completo
  useGSAP(() => {
    gsap.matchMedia().add(MOTION_OK, () => {
      gsap.fromTo(
        progress.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: true },
        },
      );
    });
  });

  function toggle(next: boolean) {
    setOpen(next);
    setScrollLocked(next);
  }

  function go(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();
    toggle(false);
    scrollToTarget(href);
  }

  return (
    <nav aria-label="Principal" className="fixed inset-x-0 top-0 z-50">
      <div className="flex h-16 items-center justify-between gap-6 bg-linear-to-b from-bg via-bg/80 to-transparent px-5 md:px-8">
        <a href="#inicio" onClick={(e) => go(e, "#inicio")} className="flex items-center gap-3">
          <Logo className="h-7 w-auto" />
          <span className="hidden whitespace-nowrap text-base font-semibold tracking-tight sm:block">
            {profile.firstLine}
          </span>
          <span className="sr-only">{t(ui.nav.toHome)}</span>
        </a>

        <ul className="hidden items-center gap-5 whitespace-nowrap xl:flex">
          {navLinks.slice(1).map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => go(e, link.href)}
                className="micro text-fg/75 transition-colors hover:text-fg"
              >
                {t(link.label)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <LangToggle />
          <ThemeToggle />
          <a
            href={profile.cv}
            download
            className="micro flex h-9 items-center whitespace-nowrap rounded-full bg-accent px-4 text-on-accent transition-colors hover:bg-fg hover:text-bg"
          >
            <span className="max-sm:hidden">{t(ui.nav.cv)}</span>
            <span className="sm:hidden">CV</span>
          </a>
          <button
            type="button"
            onClick={() => toggle(!open)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="micro h-9 rounded-full border border-fg/25 px-3 xl:hidden"
          >
            {open ? t(ui.nav.close) : t(ui.nav.menu)}
          </button>
        </div>
      </div>

      <span
        ref={progress}
        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-accent"
        aria-hidden="true"
      />

      <div
        id="menu-movil"
        className={`fixed inset-0 top-16 bg-bg transition-[opacity,visibility] duration-300 xl:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-5 pt-8">
          {navLinks.map((link) => (
            <li key={link.href} className="border-b border-fg/10">
              <a
                href={link.href}
                onClick={(e) => go(e, link.href)}
                tabIndex={open ? 0 : -1}
                className="block py-3"
              >
                <span className="display text-[2.6rem]">{t(link.label)}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
