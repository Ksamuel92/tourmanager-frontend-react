import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { getState } from "@reduxjs/toolkit/";

export const tourManagerApi = createApi({
  reducerPath: "tourManagerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
  }),
  tagTypes: ["Show", "User", "Promoter", "UNAUTHORIZED", "LIST"],
  endpoints: () => ({}),
});
