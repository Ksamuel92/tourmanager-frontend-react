import { tourManagerApi } from "./api";

const showApiEndpoints = tourManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getShows: builder.query({
      query: () => "shows",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Show", id })),
              { type: "Show", id: "LIST" },
            ]
          : ["Show"],
    }),
    getShowById: builder.query({
      query: (id) => `shows/${id}`,
      providesTags: (result, error, id) => [{ type: "Show", id }],
    }),
    addShow: builder.mutation({
      query: (body) => ({
        url: "shows",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Show", id: "LIST" }],
    }),
    editShow: builder.mutation({
      query: (body) => ({
        url: `shows/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Show", id }],
    }),
    deleteShow: builder.mutation({
      query: (id) => ({
        url: `shows/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Show", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetShowsQuery,
  usegetShowByIdQuery,
  useAddShowQuery,
  useEditShowQuery,
  useDeleteShowQuery,
} = showApiEndpoints;
