import { apiSlice } from "./apiSlice" ;

const INTERVENTIONS_URL ="/intervention" ;

export const interventionApiSlice= apiSlice.injectEndpoints({
endpoints: (builder) =>({
getDasboardStats: builder.query({
query: () =>({
url : `${INTERVENTIONS_URL}/dashboard`,
method : "GET",
credentials : "include",
}),
}),

  getAllTask: builder.query({
  query: ({strQuery,isTrashed,search}) =>({
  url : `${INTERVENTIONS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
  method : "GET",
  credentials : "include",
  }),
  }),

  //create


  createTask: builder.mutation({
    query: (data) =>({
    url : `${INTERVENTIONS_URL}/create`,
    method : "POST",
    body : data ,
    credentials : "include",
    }),
    }),

    duplicateTask: builder.mutation({
      query: (id) =>({
      url : `${INTERVENTIONS_URL}/duplicate/${id}`,
      method : "POST",
      body : {} ,
      credentials : "include",
      }),
      }),

      updateTask: builder.mutation({
        query: (data) =>({
        url : `${INTERVENTIONS_URL}/update/${data._id}`,
        method : "PUT",
        body : data ,
        credentials : "include",
        }),
        }),


}),
});
export const {useGetDasboardStatsQuery , useGetAllTaskQuery , useCreateTaskMutation , useDuplicateTaskMutation , useUpdateTaskMutation} =interventionApiSlice