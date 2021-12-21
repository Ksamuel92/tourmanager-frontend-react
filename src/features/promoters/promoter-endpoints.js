import { tourManagerApi } from "../../services/api";

const promoterApiEndpoints = tourManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromoters: builder.query({
      query: () => "promoters",
      providesTags: ["Promoter"],
    }),
    addPromoter: builder.mutation({
      query: (body) => ({
        url: "promoters",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Promoter"],
    }),
    editPromoter: builder.mutation({
      query: (body) => ({
        url: `promoters/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Promoter"],
    }),
    deletePromoter: builder.mutation({
      query: (id) => ({
        url: `promoters/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Promoter"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPromotersQuery,
  useGetPromoterByIdQuery,
  useAddPromoterMutation,
  useEditPromoterMutation,
  useDeletePromoterMutation,
} = promoterApiEndpoints;
