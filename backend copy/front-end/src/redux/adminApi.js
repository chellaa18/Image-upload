import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const adminApi = createApi({
  reducerPath: '',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (builder) => ({

    getAdminData: builder.query({
      query: () => 'admin',
      providesTags: ['Admin'],
    }),

    addTermsData: builder.mutation({
      query:({termsData})=>({
        url: 'admin/terms',
        method: 'POST',
        body: {termsData},
      }),
      invalidatesTags: ['Admin'],
    }),
    adminLogIn: builder.mutation({
      query: ( data ) => ({
        url: "admin/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
    getTermsData: builder.query({
      query: () => 'admin/terms',
      providesTags: ['Admin'],
    }),
   
  }),
  
});

export const { useGetAdminDataQuery, useAddTermsDataMutation, useAdminLogInMutation, useGetTermsDataQuery } = adminApi;
