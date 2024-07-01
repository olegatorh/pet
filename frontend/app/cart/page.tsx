'use client';


import {
    useDeleteCartItemMutation,
    useGetCartItemsQuery,
} from "@/redux/features/cartApiSlice";
import Image from 'next/image';
import {useLazyRetrieveSubCategoriesQuery} from "@/redux/features/itemsApiSlice";
import {it} from "node:test";
import {toast} from "react-toastify";
import {useEffect} from "react";

export default function Page() {
    const host = process.env.NEXT_PUBLIC_HOST
    const {data: cartItems, error, isLoading, refetch} = useGetCartItemsQuery(undefined);
    const [triggerDeleteItem, {isLoading: isDeleting, isSuccess, isError}] = useDeleteCartItemMutation();


    useEffect(() => {
        refetch();  // This will trigger fetching data whenever the component mounts
    }, [refetch]);  // 'refetch' is stable, but listing it ensures it's called if the function itself changes


    const removeItemFromCart = async (item_id: number) => {
        await triggerDeleteItem(item_id).unwrap();
        toast.success('Item removed from cart');
        // Optionally, you can refetch cart items here if the API does not automatically do it
    };
    if (isLoading) return <div>Loading...</div>;
    // Render error state
    if (error) return <div>Error: {error.toString()}</div>;
    return (
        <>
            <header className='bg-white shadow'>
                <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
                    <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                        Cart
                    </h1>
                </div>
            </header>

            <main className='mx-auto max-w-7xl py-6 my-8 sm:px-6 lg:px-8'>
                {cartItems?.map((item: any, index: number) => (
                    <div key={index}>
                        <li>{item.item}</li>
                        <div style={{
                            position: 'relative',
                            width: '200px',
                            height: '150px', // Adjust if needed
                            overflow: 'hidden',
                            cursor: 'pointer',
                        }}>
                            <Image src={`${host}${item.image}`} alt={item.name} layout='fill' objectFit='cover' unoptimized/>
                        </div>
                        <li>{item.quantity}</li>
                        <li>{item.price} $</li>
                        <button onClick={() => removeItemFromCart(item.id)} style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                            textDecoration: 'none',
                            border: '2px solid #4CAF50',
                            color: '#000000',
                            backgroundColor: '#af4c4c',
                            cursor: 'pointer',
                            borderRadius: '5px'
                        }}>
                            remove
                        </button>
                    </div>
                ))}
            </main>
        </>
    );
}