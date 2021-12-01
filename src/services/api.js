import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getState } from "@reduxjs/toolkit/";
export const tourManagerApi = createApi({
  reducerPath: "tourManagerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
    endpoints: (builder) => ({
      getShows: builder.query({
        query: () => "shows",
      }),
    }),
  }),
});

export const { useGetShowsQuery } = tourManagerApi;
