import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // === LOGIN ===
    login: builder.mutation({
      query: (data) => ({
        url: "/accounts/login/",
        method: "POST",
        body: data,
      }),
    }),
    // === Product List ===
    getProductsList: builder.query({
      query: () => ({
        url: "/products/list/",
        method: "GET",
      }),
    }),
    // === Add Product ===
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create/",
        method: "POST",
        body: data,
      }),
    }),
    // === Update Product ===
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}/update/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsListQuery,
  useAddProductMutation,
  useUpdateProductMutation,
} = authApi;
