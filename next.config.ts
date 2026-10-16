import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática: `npm run build` genera la carpeta out/ lista para subir a Netlify
  output: "export",
  // Sin servidor no hay optimizador de imágenes; se sirven tal cual desde public/
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
