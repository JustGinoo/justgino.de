import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JustGino – Gino Wild",
    short_name: "JustGino",
    start_url: "/",
    display: "standalone",
    background_color: "#090d0a",
    theme_color: "#090d0a",
    icons: [
      { src: "/app/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/app/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/app/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
