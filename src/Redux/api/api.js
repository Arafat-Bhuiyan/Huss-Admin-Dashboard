import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://10.10.13.20:8005/api/v1",
  prepareHeaders: (headers, { getState }) => {
    // Try to get token from Redux state
    const token = getState().auth?.access || localStorage.getItem("access");
    // If token not in state, retrieve from local storage
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    } 
    return headers;
  },
});

export const api = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  tagTypes: ["users", "auth", "contents", "aboutUs", "coreValues"],
  endpoints: () => ({}),
});