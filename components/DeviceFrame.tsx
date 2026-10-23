import type { Device } from "@/data/projects";

type DeviceFrameProps = { device: Device; children: React.ReactNode };

// Marcos de dispositivo dibujados con CSS: la captura va dentro de la pantalla.
// Son tinta en ambos temas porque siempre se apoyan sobre el bloque cian.
export default function DeviceFrame({ device, children }: DeviceFrameProps) {
  if (device === "laptop") {
    return (
      <div className="w-full">
        <div className="relative aspect-[16/10] overflow-hidden rounded-t-2xl border-[10px] border-b-[14px] border-on-accent bg-on-accent">
          {children}
        </div>
        <div className="-mx-[6%] h-3.5 rounded-b-2xl bg-on-accent" />
        <div className="mx-auto h-1.5 w-1/5 rounded-b-lg bg-on-accent/70" />
      </div>
    );
  }

  if (device === "phone") {
    return (
      <div className="relative mx-auto aspect-[9/19.5] w-[min(72%,280px)] overflow-hidden rounded-[2.6rem] border-[10px] border-on-accent bg-on-accent">
        {/* Sin isla dinámica dibujada: las grabaciones del celular ya la traen */}
        {children}
      </div>
    );
  }

  if (device === "watch") {
    return (
      <div className="relative mx-auto flex w-[min(70%,300px)] flex-col items-center">
        <div className="h-16 w-[56%] rounded-t-3xl bg-on-accent/80" aria-hidden="true" />
        <div className="relative aspect-square w-full overflow-hidden rounded-full border-[14px] border-on-accent bg-on-accent">
          {children}
        </div>
        <span className="absolute right-[-3%] top-1/2 h-10 w-3 -translate-y-1/2 rounded-r-md bg-on-accent" aria-hidden="true" />
        <div className="h-16 w-[56%] rounded-b-3xl bg-on-accent/80" aria-hidden="true" />
      </div>
    );
  }

  // Pantalla panorámica para el videojuego
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-[10px] border-on-accent bg-on-accent">
      {children}
    </div>
  );
}
