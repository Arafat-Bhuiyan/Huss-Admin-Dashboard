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
    // === Update Category ===
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/${id}/update/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
    // === Delete Category ===
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/${id}/delete/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
    // === Dashboard Main Data ===
    getDashboardData: builder.query({
      query: () => ({
        url: "/admin/dashboard/summary/",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    // === Normal Admin Dashboard Data ===
    getNormalAdminDashboardData: builder.query({
      query: () => ({
        url: "/admin-dashboard-summary/",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
    // === Get Promotions ===
    getPromotions: builder.query({
      query: () => ({
        url: "/promotions/list/",
        method: "GET",
      }),
      providesTags: ["Promotions"],
    }),
    // === Create Promotions ===
    createPromotions: builder.mutation({
      query: (data) => ({
        url: "/promotions/create/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Promotions"],
    }),
    // === Update Promotions ===
    updatePromotions: builder.mutation({
      query: ({ id, data }) => ({
        url: `/promotions/update/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Promotions"],
    }),
    // === Delete Promotions ===
    deletePromotions: builder.mutation({
      query: (id) => ({
        url: `/promotion/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Promotions"],
    }),
    // === Users List ===
    getUsersList: builder.query({
      query: () => ({
        url: "/users-list/",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    //  === Update User ===
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/users/${id}/status/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Users"],
    }),
    //  === Wishlist Get ===
    getWishlist: builder.query({
      query: () => ({
        url: "/products/wishlist/count/",
        method: "GET",
      }),
      providesTags: ["Wishlist"],
    }),
    // === Single Wishlist Detail ===
    getSingleWishlistDetail: builder.query({
      query: (id) => ({
        url: `/wishlist/users/by/product/${id}/`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Wishlist", id }],
    }),
    // === Create Offer ===
    createOffer: builder.mutation({
      query: (data) => ({
        url: "/create/wishlist/offer/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Wishlist"],
    }),
    // === Tracking List ===
    getTrackingList: builder.query({
      query: () => ({
        url: "/trackings/",
        method: "GET",
      }),
      providesTags: ["Tracking"],
    }),
    // === Update Tracking ===
    updateTracking: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tracking/update/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Tracking", "Orders"],
    }),
    // === Delete Tracking ===
    deleteTracking: builder.mutation({
      query: (id) => ({
        url: `/tracking/delete/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tracking", "Orders"],
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
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetDashboardDataQuery,
  useGetPromotionsQuery,
  useCreatePromotionsMutation,
  useUpdatePromotionsMutation,
  useDeletePromotionsMutation,
  useGetUsersListQuery,
  useUpdateUserMutation,
  useGetWishlistQuery,
  useGetSingleWishlistDetailQuery,
  useCreateOfferMutation,
  useGetTrackingListQuery,
  useGetNormalAdminDashboardDataQuery,
  useUpdateTrackingMutation,
  useDeleteTrackingMutation,
} = authApi;
