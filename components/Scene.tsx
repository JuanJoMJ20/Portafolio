"use client";

import { useRef } from "react";
import * as THREE from "three";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

// Fondo 3D: una nube de partículas que cambia de forma en cada capítulo.
// 0 esfera (inicio) → 1 campo de ondas (sobre mí) → 2 anillo (proyectos)
// → 3 doble hélice (experiencia) → 4 espiral (contacto).
// No hay animación por tiempo: la forma, el giro y la cámara dependen solo del scroll.

const VERTEX = /* glsl */ `
  uniform float uMorph;
  uniform float uSize;
  uniform float uPixel;
  attribute vec3 aS1;
  attribute vec3 aS2;
  attribute vec3 aS3;
  attribute vec3 aS4;
  attribute float aRand;
  varying float vAlpha;
  varying float vAccent;

  // Cada partícula arranca su cambio con un pequeño desfase para que la forma se disuelva
  float stage(float k) {
    return smoothstep(0.0, 1.0, clamp((uMorph - k) * 1.35 - aRand * 0.35, 0.0, 1.0));
  }

  void main() {
    vec3 p = position;
    p = mix(p, aS1, stage(0.0));
    p = mix(p, aS2, stage(1.0));
    p = mix(p, aS3, stage(2.0));
    p = mix(p, aS4, stage(3.0));

    // Entre forma y forma las partículas se abren hacia afuera, como una exhalación
    float burst = sin(3.14159265 * fract(uMorph)) * step(uMorph, 3.999);
    p += normalize(p + vec3(0.0001)) * burst * (0.2 + aRand * 0.9);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    // Tope de tamaño: las partículas que pasan junto a la cámara no se vuelven manchas
    gl_PointSize = min(uSize * uPixel * (0.45 + aRand * 0.55) / -mv.z, 6.0 * uPixel);
    vAlpha = clamp(1.3 - (-mv.z - 3.0) * 0.08, 0.35, 1.0);
    // Una de cada diez partículas lleva el color de acento
    vAccent = step(0.9, aRand);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uFg;
  uniform vec3 uAccent;
  varying float vAlpha;
  varying float vAccent;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d) * vAlpha * 0.8;
    gl_FragColor = vec4(mix(uFg, uAccent, vAccent), a);
  }
`;

function buildShapes(count: number) {
  const shapes = Array.from({ length: 5 }, () => new Float32Array(count * 3));
  const rand = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  const jitter = (amount: number) => (Math.random() - 0.5) * amount;

  const set = (shape: Float32Array, i: number, x: number, y: number, z: number) => {
    shape[i * 3] = x;
    shape[i * 3 + 1] = y;
    shape[i * 3 + 2] = z;
  };

  for (let i = 0; i < count; i++) {
    rand[i] = Math.random();

    // 0 · Esfera (espiral de Fibonacci)
    const y = 1 - (i / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const r = 2.3 + jitter(0.08);
    set(shapes[0], i, Math.cos(theta) * ring * r, y * r, Math.sin(theta) * ring * r);

    // 1 · Campo de ondas
    const gx = jitter(15);
    const gz = jitter(15);
    const gy = -1.3 + Math.sin(gx * 0.6) * Math.cos(gz * 0.5) * 0.55 + Math.sin(gz * 1.3 + gx * 0.4) * 0.18;
    set(shapes[1], i, gx, gy, gz);

    // 2 · Anillo (toro)
    const u = Math.random() * Math.PI * 2;
    const v = Math.random() * Math.PI * 2;
    const tube = 0.4 + Math.random() * 0.15;
    set(shapes[2], i, (2.1 + tube * Math.cos(v)) * Math.cos(u), tube * Math.sin(v), (2.1 + tube * Math.cos(v)) * Math.sin(u));

    // 3 · Doble hélice, con peldaños cada tanto
    const t = Math.random() * 2 - 1;
    const angle = t * Math.PI * 4 + (i % 2) * Math.PI;
    if (i % 7 === 0) {
      const k = Math.random() * 2 - 1;
      set(shapes[3], i, Math.cos(angle) * 1.3 * k, t * 4.2, Math.sin(angle) * 1.3 * k);
    } else {
      set(shapes[3], i, Math.cos(angle) * 1.3 + jitter(0.12), t * 4.2 + jitter(0.12), Math.sin(angle) * 1.3 + jitter(0.12));
    }

    // 4 · Espiral de tres brazos
    const dist = Math.pow(Math.random(), 0.6) * 5.5;
    const arm = dist * 0.9 + (i % 3) * ((Math.PI * 2) / 3) + jitter(0.5);
    set(shapes[4], i, Math.cos(arm) * dist, jitter(0.25) * (1 - dist / 6), Math.sin(arm) * dist);
  }

  return { shapes, rand };
}

export default function Scene() {
  const host = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const el = host.current;
    if (!el) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const count = mobile ? 9000 : 20000;
    const dpr = Math.min(window.devicePixelRatio, 1.75);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);

    const { shapes, rand } = buildShapes(count);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(shapes[0], 3));
    geometry.setAttribute("aS1", new THREE.BufferAttribute(shapes[1], 3));
    geometry.setAttribute("aS2", new THREE.BufferAttribute(shapes[2], 3));
    geometry.setAttribute("aS3", new THREE.BufferAttribute(shapes[3], 3));
    geometry.setAttribute("aS4", new THREE.BufferAttribute(shapes[4], 3));
    geometry.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

    // Los colores salen de los mismos tokens CSS que usa el resto del sitio
    const css = getComputedStyle(document.documentElement);
    const uniforms = {
      uMorph: { value: 0 },
      uSize: { value: mobile ? 34 : 40 },
      uPixel: { value: dpr },
      uFg: { value: new THREE.Color(css.getPropertyValue("--fg").trim()) },
      uAccent: { value: new THREE.Color(css.getPropertyValue("--accent").trim()) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader: VERTEX,
      fragmentShader: FRAGMENT,
      uniforms,
      transparent: true,
      depthWrite: false,
    });

    const group = new THREE.Group();
    group.add(new THREE.Points(geometry, material));
    scene.add(group);

    const state = { morph: 0, rotX: 0.2, rotY: 0, camZ: 9, camY: 0 };
    let dirty = true;
    const markDirty = () => {
      dirty = true;
    };

    const render = () => {
      if (!dirty) return;
      dirty = false;
      group.rotation.set(state.rotX, state.rotY, 0);
      camera.position.set(0, state.camY, state.camZ);
      camera.lookAt(0, 0, 0);
      uniforms.uMorph.value = state.morph;
      renderer.render(scene, camera);
    };
    gsap.ticker.add(render);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      markDirty();
    };
    window.addEventListener("resize", onResize);

    // Al cambiar de tema, las partículas toman los colores del nuevo tema
    const onTheme = () => {
      const tokens = getComputedStyle(document.documentElement);
      uniforms.uFg.value.set(tokens.getPropertyValue("--fg").trim());
      uniforms.uAccent.value.set(tokens.getPropertyValue("--accent").trim());
      markDirty();
    };
    window.addEventListener("themechange", onTheme);

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Recorrido de cámara a lo largo de toda la página
      gsap
        .timeline({
          defaults: { ease: "none" },
          onUpdate: markDirty,
          scrollTrigger: { trigger: document.documentElement, start: 0, end: "max", scrub: true },
        })
        .to(state, { rotY: Math.PI * 2.4, duration: 1 }, 0)
        .to(state, { camZ: 5.6, duration: 0.1 }, 0)
        .to(state, { camZ: 8.5, camY: 1.2, rotX: 0.5, duration: 0.15 }, 0.1)
        .to(state, { camZ: 7.5, camY: 0, rotX: 0.15, duration: 0.3 }, 0.3)
        .to(state, { camZ: 9.5, camY: 2.5, rotX: 0.7, duration: 0.3 }, 0.7);

      // Cada capítulo con data-scene suma un tramo de cambio de forma.
      // Se usa un objeto por tramo y se suman sus avances, así los tramos nunca se pisan.
      const sections = gsap.utils.toArray<HTMLElement>("[data-scene]");
      const legs = sections.map(() => ({ p: 0 }));
      sections.forEach((section, i) => {
        gsap.to(legs[i], {
          p: 1,
          ease: "none",
          onUpdate: () => {
            state.morph = legs.reduce((sum, leg) => sum + leg.p, 0);
            markDirty();
          },
          scrollTrigger: { trigger: section, start: "top bottom", end: "top 15%", scrub: true },
        });
      });

      // Zonas de lectura: cada sección con data-dim baja la escena a esa opacidad mientras
      // se lee y la devuelve al salir. Se queda con la atenuación más fuerte activa.
      const zones = gsap.utils.toArray<HTMLElement>("[data-dim]");
      const dims = zones.map(() => ({ p: 0 }));
      const applyDim = () => {
        const opacity = zones.reduce(
          (min, zone, i) => Math.min(min, 1 - (1 - Number(zone.dataset.dim)) * dims[i].p),
          1,
        );
        el.style.opacity = String(opacity);
      };
      zones.forEach((zone, i) => {
        // Si la sección tiene pin, se mide con su espaciador para cubrir todo el tramo fijado
        const trigger = zone.parentElement?.classList.contains("pin-spacer") ? zone.parentElement : zone;
        gsap
          .timeline({
            defaults: { ease: "none" },
            onUpdate: applyDim,
            scrollTrigger: { trigger, start: "top 75%", end: "bottom 25%", scrub: true },
          })
          .to(dims[i], { p: 1, duration: 0.12 })
          .to(dims[i], { p: 1, duration: 0.76 })
          .to(dims[i], { p: 0, duration: 0.12 });
      });
    });

    return () => {
      gsap.ticker.remove(render);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("themechange", onTheme);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  });

  return <div ref={host} className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />;
}
