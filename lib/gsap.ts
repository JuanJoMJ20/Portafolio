"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Toda la coreografía vive dentro de esta media query: con movimiento reducido
// el sitio se muestra estático y completo.
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 768px)";

export { gsap, ScrollTrigger, useGSAP };
