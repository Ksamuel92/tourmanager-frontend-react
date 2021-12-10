import { tourManagerApi } from "../../services/api";

const showApiEndpoints = tourManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getShows: builder.query({
      query: (id) => "shows",
      providesTags: ["Show"],
    }),
    addShow: builder.mutation({
      query: (body) => ({
        url: "shows",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Show"],
    }),
    editShow: builder.mutation({
      query: (body) => ({
        url: `shows/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Show", "Promoter"],
    }),
    deleteShow: builder.mutation({
      query: (id) => ({
        url: `shows/${id}`,
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
