import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product } from '../../types/product-data';


export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: [ 'PRODUCTS'],
  endpoints: (builder) => ({
    getProductsByCategory: builder.query<Product[], string>({
      query: (category) => `products?category=${category}`,
      providesTags: ['PRODUCTS'],
    }),
   
  }),
});

export const { useGetProductsByCategoryQuery} = api;
