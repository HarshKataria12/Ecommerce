// Represents a selectable option like size or color
export interface Variant {
  id: string;
  label: string; 
  // examples: "S", "M", "Blue", "128GB"
}

// Main product returned from the backend API
export interface Product {
  id: string;

  // Basic product info
  name: string;
  imageUrl: string;   // product image URL

  // Pricing
  priceCents: number; // stored in cents to avoid float issues (e.g. 1999 = €19.99)
  currency: string;   // "EUR", "USD"

  // Categorization
  category: string;

  // Availability
  inStock: boolean;

  // Variant options (sizes, colors, etc.)
  variants: Variant[];
}
