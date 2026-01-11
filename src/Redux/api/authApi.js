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
      providesTags: ["Products"],
    }),
    // === Add Product ===
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    // === Update Product ===
    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}/update/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    // === Product Details ===
    getProductDetails: builder.query({
      query: (id) => ({
        url: `/products/${id}/detail/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Products", id }],
    }),
    // === Delete Product ===
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsListQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useDeleteProductMutation,
} = authApi;
