import { tourManagerApi } from "../../services/api";

const promoterApiEndpoints = tourManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromoters: builder.query({
      query: () => "promoters",
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map(({ slug }) => ({ type: "Promoter", slug })),
              { type: "Promoter", id: "LIST" },
            ]
          : ["Promoter"],
    }),
    getPromoterBySlug: builder.query({
      query: (slug) => `promoters/${slug}`,
      providesTags: (result, error, slug) => [{ type: "Promoter", slug }],
    }),
    addPromoter: builder.mutation({
      query: (body) => ({
        url: "promoters",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Promoter", id: "LIST" }],
    }),
    editPromoter: builder.mutation({
      query: (body) => ({
        url: `promoters/${body.slug}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Promoter", id }],
    }),
    deletePromoter: builder.mutation({
      query: (id) => ({
        url: `promoters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Promoter", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPromotersQuery,
  usegetPromoterByIdQuery,
  useAddPromoterQuery,
  useEditPromoterQuery,
  useDeletePromoterQuery,
} = promoterApiEndpoints;
