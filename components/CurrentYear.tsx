"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// El año se lee en el navegador (no durante el prerender), así se actualiza solo cada año
export default function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <>{year}</>;
}
