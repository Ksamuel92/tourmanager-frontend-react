import { tourManagerApi } from "../../services/api";

const authApiEndpoints = tourManagerApi.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: 'signup',
        method: 'POST',
        body: credentials
      })
    }),
    
  }
})