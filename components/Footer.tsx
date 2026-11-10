"use client";

import { ArrowUp } from "lucide-react";
import Logo from "./Logo";
import Split from "./Split";
import CurrentYear from "./CurrentYear";
import { navLinks } from "./nav-links";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { useT } from "@/lib/i18n";
import { scrollToTarget } from "@/lib/lenis";

export default function Footer() {
  const t = useT();
  const socials = [
    { label: "GitHub", href: profile.contact.github },
    { label: "LinkedIn", href: profile.contact.linkedin },
    { label: "WhatsApp", href: profile.contact.whatsapp },
    { label: t(ui.contact.email), href: `mailto:${profile.contact.email}` },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-fg/10 bg-bg px-5 pt-16 md:px-8">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-3">
          <Logo className="mb-8 h-10 w-auto" />
          <p className="micro mb-5 text-fg/55">{t(ui.footer.index)}</p>
          <ul className="grid gap-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-sm decoration-accent decoration-2 underline-offset-4 hover:underline">
                  {t(link.label)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="micro mb-5 text-fg/55 md:mt-18">{t(ui.footer.social)}</p>
          <ul className="grid gap-2">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="text-sm decoration-accent decoration-2 underline-offset-4 hover:underline"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-start md:col-span-6 md:justify-end">
          <button
            type="button"
            onClick={() => scrollToTarget(0)}
            className="micro inline-flex items-center gap-3 rounded-full border border-fg/30 px-5 py-3 transition-colors hover:border-fg hover:bg-fg hover:text-bg"
          >
            {t(ui.footer.top)}
            <ArrowUp className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <p
        data-reveal="split"
        data-start="top bottom"
        data-end="bottom bottom"
        className="display mt-[12vh] whitespace-nowrap text-[16.5vw] leading-[0.78]"
        aria-hidden="true"
      >
        <Split text={profile.secondLine} by="chars" />
      </p>

      <div className="micro flex flex-col gap-1 border-t border-fg/10 py-5 text-fg/55 sm:flex-row sm:justify-between">
        <span>
          © <CurrentYear /> {profile.name}
        </span>
        <span>Next.js · GSAP · Lenis · Three.js</span>
      </div>
    </footer>
  );
}
