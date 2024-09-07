
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
  price: number;  
}

export interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
}
export interface CartItem {
  id: number;
  image_link?: string;
  brand: string;
  name: string;
  price_sign: string;
  price: number;
  currency: string;
  product_type: string;
  quantity: number; 
}
export interface CartItem extends Product {
  quantity: number;
}
