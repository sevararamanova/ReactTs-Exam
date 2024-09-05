
export interface Product {
  id: number;
  name: string;
  category: string;
  image_link?: string;
  price: number;
  price_sign: string;
  brand: string;
  currency: string;
  description: string;
  variants?: Variant[]; 
  product_type:string;
}
export interface Variant {
  id: number;
  name: string;
}

export interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}
export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image_link?: string; // Add this line if `image_link` is optional
}