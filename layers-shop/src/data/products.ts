import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "layer-tee",
    slug: "layer-tee",
    title: "Layer Tee",
    price: 3800,
    currency: "USD",
    image: "/products/layer-tee.svg",
    images: ["/products/layer-tee.svg"],
    description: "Premium cotton tee with layered graphic print.",
    tags: ["tee", "tops"],
    featured: true,
  },
  {
    id: "layer-hoodie",
    slug: "layer-hoodie",
    title: "Layer Hoodie",
    price: 8900,
    currency: "USD",
    image: "/products/layer-hoodie.svg",
    images: ["/products/layer-hoodie.svg"],
    description: "Heavyweight fleece hoodie with subtle logo embroidery.",
    tags: ["hoodie", "outerwear"],
    featured: true,
  },
  {
    id: "layer-cap",
    slug: "layer-cap",
    title: "Layer Cap",
    price: 3200,
    currency: "USD",
    image: "/products/layer-cap.svg",
    images: ["/products/layer-cap.svg"],
    description: "Structured cap with adjustable strap and tonal logo.",
    tags: ["cap", "accessories"],
    featured: false,
  }
];
