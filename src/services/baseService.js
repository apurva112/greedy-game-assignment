import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://go-dev.greedygame.com/v3/dummy/",
  tagTypes: [],
});

const baseService = createApi({
  reducerPath: "api",
  baseQuery: async function (...args) {
    const response = await baseQuery(...args);
    if (response?.data) {
      return response.data;
    }
    return response;
  },
  endpoints: () => ({}),
});

export default baseService;
