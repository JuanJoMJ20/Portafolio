"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Split from "./Split";
import { profile } from "@/data/profile";
import { ui } from "@/data/ui";
import { useLang, useT } from "@/lib/i18n";

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full border-b border-fg/20 bg-transparent py-3 text-lg text-fg placeholder:text-fg/45 transition-colors focus:border-fg focus:outline-none";

// Capítulo 06: bloque cian con los canales a la izquierda y el formulario en una tarjeta
export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const t = useT();
  const lang = useLang();

  const channels = [
    { label: t(ui.contact.email), value: profile.contact.email, href: `mailto:${profile.contact.email}` },
    { label: "WhatsApp", value: profile.contact.whatsappLabel, href: profile.contact.whatsapp },
    { label: "LinkedIn", value: "Juan José Muñoz", href: profile.contact.linkedin },
    { label: "GitHub", value: "JuanJoMJ20", href: profile.contact.github },
  ];

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (!profile.contactEndpoint) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      // Cuerpo de formulario simple (sin preflight); el script responde { ok: true } al guardar la fila
      const res = await fetch(profile.contactEndpoint, {
        method: "POST",
        body: new URLSearchParams({
          name: String(data.get("nombre") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("mensaje") ?? ""),
          website: String(data.get("website") ?? ""),
          lang,
        }),
      });
      const result: { ok?: boolean } = await res.json();
      if (!result.ok) throw new Error("not saved");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      id="contacto"
      className="relative mt-[12vh] rounded-t-[2.5rem] bg-accent px-5 py-[14vh] text-on-accent md:px-8"
    >
      <div className="micro flex items-center gap-4">
        <span className="rounded-full bg-on-accent px-2 py-0.5 text-accent">06</span>
        <span>{t(ui.nav.contact)}</span>
        <span data-reveal="line" className="h-px flex-1 bg-on-accent/30" aria-hidden="true" />
      </div>

      <h2 data-reveal="split" data-end="top 30%" className="display mt-8 text-[clamp(4rem,17vw,17rem)] leading-[0.8]">
        <Split text={t(ui.contact.title)} by="chars" />
        <span>.</span>
      </h2>

      <div className="mt-[8vh] grid gap-12 md:grid-cols-12">
        <div className="min-w-0 md:col-span-5">
          <p data-reveal="rise" className="max-w-sm text-lg leading-snug">
            {t(ui.contact.intro)}
          </p>
          <ul className="mt-10">
            {channels.map((c) => (
              <li key={c.label} className="border-t border-on-accent/25 last:border-b">
                <a
                  href={c.href}
                  target={c.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 py-5"
                >
                  <span className="micro w-24 shrink-0 opacity-70">{c.label}</span>
                  <span className="min-w-0 flex-1 truncate text-lg font-medium tracking-tight md:text-xl">{c.value}</span>
                  <ArrowUpRight
                    className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="rise" className="min-w-0 rounded-[2rem] bg-bg p-6 text-fg md:col-span-6 md:col-start-7 md:p-10">
          <form onSubmit={handleSubmit} className="grid gap-8">
            {/* Campo trampa para bots: oculto para personas y lectores de pantalla */}
            <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <label className="grid gap-1">
              <span className="micro text-fg/65">{t(ui.contact.name)}</span>
              <input name="nombre" required autoComplete="name" placeholder={t(ui.contact.namePh)} className={inputClass} />
            </label>
            <label className="grid gap-1">
              <span className="micro text-fg/65">{t(ui.contact.email)}</span>
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder={t(ui.contact.emailPh)}
                className={inputClass}
              />
            </label>
            <label className="grid gap-1">
              <span className="micro text-fg/65">{t(ui.contact.message)}</span>
              <textarea
                name="mensaje"
                required
                rows={4}
                placeholder={t(ui.contact.messagePh)}
                className={`${inputClass} resize-y`}
              />
            </label>
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex items-center justify-between gap-3 rounded-full bg-accent px-7 py-4 text-sm font-medium text-on-accent transition-colors hover:bg-fg hover:text-bg disabled:opacity-60 md:justify-self-start"
            >
              {status === "sending" ? t(ui.contact.sending) : t(ui.contact.send)}
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <div aria-live="polite" className="micro mt-6 min-h-6">
            {status === "sent" && <p>{t(ui.contact.sent)}</p>}
            {status === "error" && (
              <p>
                {t(ui.contact.error)} {profile.contact.email}.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
