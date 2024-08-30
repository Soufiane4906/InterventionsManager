
import { apiSlice } from "./apiSlice" ;
const Customer_URL="/customer";


export const CustomerApiSlice = apiSlice.injectEndpoints({
endpoints :(builder)=>({
updateCustomer: builder.mutation({
query: (data) =>({
url : `${Customer_URL}/profile`,
method : "PUT",
body : data,
credentials: "include",

}),
}),

  deleteCustomer: builder.mutation({
    query: (id) =>({
    url : `${Customer_URL}/${id}`,
    method : "DELETE",
    credentials: "include",

    }),
    }),

    registerCustomer: builder.mutation({
      query: (data) =>({
      url : `${Customer_URL}/`,
      method : "POST",
      body : data,
      credentials: "include",

      }),
      }),


    CustomerAction: builder.mutation({
      query: (data) =>({
      url : `${Customer_URL}/${data.id}`,
      method : "PUT",
      credentials: "include",

      }),
      }),


    getCustomerList: builder.query({
      query: (data) =>({
      url : `${Customer_URL}/`,
      method : "GET",
      credentials: "include",

      }),
      }),


}),
});
//export
export const {useRegisterCustomerMutation,  useUpdateCustomerMutation , useGetCustomerListQuery , useDeleteCustomerMutation , useCustomerActionMutation } = CustomerApiSlice;