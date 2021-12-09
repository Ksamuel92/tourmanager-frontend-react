import { tourManagerApi } from "../../services/api";
import { setCredentials, logoutUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

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
          const headers = meta.response.headers;
          const token = headers.get("Authorization");
          const user = data.data;

          dispatch(setCredentials({ user, token }));
        } catch (err) {
          //onError side-effect
          // TODO: Handle error message here
          console.log(err);
        }
      },
      inValidateTags: ["Show", "Promoter"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(credentials, { dispatch, queryFulfilled }) {
        try {
          const { data, meta } = await queryFulfilled;
          const headers = meta.response.headers;
          const token = headers.get("Authorization");
          const user = data.data;
          dispatch(setCredentials({ user, token }));
        } catch (err) {
          //TODO: Handle Error message
          console.log(err);
        }
      },
      inValidateTags: ["Show", "Promoter"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "DELETE",
      }),
      async onQueryStarted(body, { dispatch, queryFulfilled }) {
        try {
          const { data, meta } = await queryFulfilled;

          if (meta.response.ok) {
            dispatch(logoutUser());
          }
        } catch (err) {
          //TODO: Handle Error Message
          console.log(err);
        }
      },
      inValidateTags: ["Show", "Promoter"],
    }),
    currentUser: builder.query({
      query: () => "current_user",
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  useLogoutMutation,
  useCurrentUserQuery,
} = authApiEndpoints;
