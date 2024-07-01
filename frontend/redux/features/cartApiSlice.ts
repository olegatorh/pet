import {apiSlice} from "@/redux/services/apiSlice";


const CartApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCartItems: builder.query({
            query: () => `cart/get/`,
            providesTags: ['Cart'], // Tag the query
        }),
        deleteCartItem: builder.mutation({
            query: itemId => ({
                url: `cart/delete/${itemId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cart'], // Invalidate to trigger a refetch
        }),
        addCartItem: builder.mutation({
            query: ({item_id, quantity}) => ({
                url: `cart/add/`,
                body: {item_id, quantity},
                method: 'POST',
            }),
        }),
    })
})


export const {
    useGetCartItemsQuery,
    useAddCartItemMutation,
    useDeleteCartItemMutation,
} = CartApiSlice