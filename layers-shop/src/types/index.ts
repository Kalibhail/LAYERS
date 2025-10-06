export interface Product {
  id: string;
  slug: string;
  title: string;
  price: number; // in smallest currency unit (cents)
  currency: string; // e.g., "USD"
  image: string;
  images?: string[];
  description: string;
  tags?: string[];
  featured?: boolean;
}

export interface CartLine {
  id: string;
  slug: string;
  title: string;
  price: number; // in cents
  currency: string;
  image: string;
  quantity: number;
}

export interface CartState {
  lines: CartLine[];
}
