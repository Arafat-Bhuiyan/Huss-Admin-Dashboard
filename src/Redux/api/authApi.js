import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // === LOGIN ===
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login/",
        method: "POST",
        body: data,
      }),
    }),
    // === SIGNUP ===
    signup: builder.mutation({
      query: (data) => ({
        url: "/auth/signup/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
} = authApi;
