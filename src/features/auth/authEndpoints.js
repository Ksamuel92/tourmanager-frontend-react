import { tourManagerApi } from "../../services/api";
import { setCredentials } from "../../features/auth/authSlice";

export const authApiEndpoints = tourManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: "signup",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data, meta } = await queryFulfilled;
          //onSuccess side-effect
          const headers = meta.response.headers;
          const token = headers.get("Authorization");
          dispatch(setCredentials({ data, token }));
        } catch (err) {
          //onError side-effect
          // TODO: Handle error message here
        }
      },
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
  }),
});

export const { useLoginMutation, useSignUpMutation, useLogoutMutation } =
  authApiEndpoints;
