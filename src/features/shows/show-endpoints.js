import { tourManagerApi } from "../../services/api";

const showApiEndpoints = tourManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getShows: builder.query({
      query: (id) => "/api/shows",
      providesTags: ["Show"],
    }),
    addShow: builder.mutation({
      query: (body) => ({
        url: "/api/shows",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Show"],
    }),
    editShow: builder.mutation({
      query: (body) => ({
        url: `api/shows/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Show", "Promoter"],
    }),
    deleteShow: builder.mutation({
      query: (id) => ({
        url: `api/shows/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Show"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetShowsQuery,
  useAddShowMutation,
  useEditShowMutation,
  useDeleteShowMutation,
} = showApiEndpoints;
