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
    // === Order List ===
    getOrderList: builder.query({
      query: () => ({
        url: "/orders/list/",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    // === Terms and Conditions ===
    getTermsAndConditions: builder.query({
      query: () => ({
        url: "/cores/terms-conditions/",
        method: "GET",
      }),
      providesTags: ["Terms"],
    }),
    updateTermsAndConditions: builder.mutation({
      query: (data) => ({
        url: "/cores/terms-conditions/update/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Terms"],
    }),
    // === Privacy Policy ===
    getPrivacyPolicy: builder.query({
      query: () => ({
        url: "/cores/privacy-policy/",
        method: "GET",
      }),
      providesTags: ["Privacy"],
    }),
    // === Update Privacy Policy ===
    updatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/cores/privacy-policy/update/",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Privacy"],
    }),
    // === Category List ===
    getCategoryList: builder.query({
      query: () => ({
        url: "/categories/list/",
        method: "GET",
      }),
      providesTags: ["Category"],
    }),
    // === Create Category ===
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category"],
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
  useGetOrderListQuery,
  useGetTermsAndConditionsQuery,
  useUpdateTermsAndConditionsMutation,
  useGetPrivacyPolicyQuery,
  useUpdatePrivacyPolicyMutation,
  useGetCategoryListQuery,
  useCreateCategoryMutation,
} = authApi;
