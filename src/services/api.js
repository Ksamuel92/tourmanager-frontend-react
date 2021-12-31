import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourManagerApi = createApi({
  reducerPath: "tourManagerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tourmanager-backend.herokuapp.com/",
    refetchOnFocus: true,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().authReducer.token;
      headers.set(
        "Access-Control-Allow-Origin",
        "https://tourmanager-frontend.herokuapp.com/"
      );

      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Show", "Promoter"],
  endpoints: () => ({}),
});
