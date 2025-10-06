import type { MetadataRoute } from "next";

const routes = ["/", "/shop", "/faq", "/about", "/returns"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://localhost";
  const now = new Date().toISOString();
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: now }));
}
