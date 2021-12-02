import { tourManagerApi } from "../../services/api";

export const authApiEndpoints = tourManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useLoginQuery, useSignupQuery, useLogoutQuery } =
  authApiEndpoints;