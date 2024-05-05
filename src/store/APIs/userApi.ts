import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL + "api/user/",
    credentials: "same-origin",
    mode:"cors"
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "register",
        method: "POST",
        body: credentials,
      }),
    }),
    protectedRoute: builder.query({
      query: (token) => ({
        url: "protected",
        method: "GET",
        headers:{
          "Authorization":`${token}`
        }
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = userApi;