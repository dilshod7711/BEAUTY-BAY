import { api } from "./index";
import { Product } from "../type";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    product: build.query<Product[], void>({
      query: () => ({
        url: "/products.json",
      }),
      providesTags: ["BRANDS"],
    }),

    viewdeates: build.query<Product, number>({
      query: (id) => ({
        url: `/products/${id}.json`,
      }),
      providesTags: ["BRANDS"],
    }),
    blush: build.query<Product, void>({
      query: (body) => ({
        url: "/products.json?product_type=blush",
        body: body
      }),
      providesTags: ["BRANDS"],
    }),
    bronzer: build.query<Product, void>({
      query: (body) => ({
        url: "/products.json?product_type=bronzer",
        body: body
      }),
      providesTags: ["BRANDS"],
    }),
    Eyebrows: build.query<Product, void>({
      query: (body) => ({
        url: "/products.json?product_type=eyebrow",
        body: body
      }),
      providesTags: ["BRANDS"],
    }),
    eyeshadows: build.query<Product, void>({
      query: (body) => ({
        url: "/products.json?product_type=eyeshadow",
        body: body
      }),
      providesTags: ["BRANDS"],
    }),
    foundations: build.query<Product, void>({
      query: (body) => ({
        url: "/products.json?product_type=foundation",
        body: body
      }),
      providesTags: ["BRANDS"],
    }),
    lipliners: build.query<Product, void>({
      query: (body) => ({
        url: "/products.json?product_type=lip_liner",
        body: body
      }),
      providesTags: ["BRANDS"],
    }),
    lipstick: build.query<Product, void>({
      query: (body) => ({
        url: "/products.json?product_type=lipstick",
        body: body
      }),
      providesTags: ["BRANDS"],
    }),
    mascara: build.query<Product, void>({
      query: (body) => ({
        url: "/products.json?product_type=mascara",
        body: body
      }),
      providesTags: ["BRANDS"],
    }),
    nailpolishes: build.query<Product, void>({
      query: (body) => ({
        url: "/products.json?product_type=nail_polish",
        body: body
      }),
      providesTags: ["BRANDS"],
    }),
   searchquery: build.query<Product, void>({
      query: ( body ) => ({
        url: "products.json?product_type=$",
        body: body
       
      }),
      providesTags: ["BRANDS"],
    }),
  }),
});

export const { useProductQuery, useViewdeatesQuery, useBlushQuery, useBronzerQuery, useEyebrowsQuery, useEyeshadowsQuery, useFoundationsQuery, useLiplinersQuery, useLipstickQuery, useMascaraQuery, useNailpolishesQuery, useSearchqueryQuery } = authApi;
