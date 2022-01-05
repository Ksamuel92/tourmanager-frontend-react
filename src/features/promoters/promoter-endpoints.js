import { tourManagerApi } from "../../services/api";

const promoterApiEndpoints = tourManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    getPromoters: builder.query({
      query: () => "/api/promoters",
      providesTags: ["Promoter"],
    }),
    addPromoter: builder.mutation({
      query: (body) => ({
        url: "/api/promoters",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Promoter"],
    }),
    editPromoter: builder.mutation({
      query: (body) => ({
        url: `/api/promoters/${body.id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Promoter"],
    }),
    deletePromoter: builder.mutation({
      query: (id) => ({
        url: `/api/promoters/${id}`,
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
