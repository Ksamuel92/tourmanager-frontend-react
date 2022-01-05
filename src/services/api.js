import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourManagerApi = createApi({
  reducerPath: "tourManagerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001",
    refetchOnFocus: true,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authReducer.token;

      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Show", "Promoter"],
  endpoints: () => ({}),
});
