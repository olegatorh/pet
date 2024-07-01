"use client"


import {useRetrieveItemByIdQuery} from "@/redux/features/itemsApiSlice";
import Image from "next/image";
import {useAddCartItemMutation} from "@/redux/features/cartApiSlice";
import {toast} from "react-toastify";


export default function Page({params}: {
    params: { id: number }
}) {

    const {data: itemData, error, isLoading} = useRetrieveItemByIdQuery({itemId: params.id})
    const [triggerAddItemToCart, {isLoading: isDeleting, isSuccess, isError}] = useAddCartItemMutation()
    const host = process.env.NEXT_PUBLIC_HOST

    const addToCart = async (item_id: number, quantity: number = 1) => {
        await triggerAddItemToCart({item_id, quantity})
        toast.success('Item added to cart');

    }


    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching items</div>;
    if (!itemData) return <div>Item not found</div>;

    return (
        <div>
            <div>
                <li>{itemData.name}</li>
                <li>price: {itemData.price}</li>
                <li>{itemData.description}</li>
                <li>{itemData.quantity}</li>
                <Image
                    src={`${host}/${itemData.image}`}
                    alt={itemData.name}
                    unoptimized
                    layout="fixed"
                    width={200}
                    height={150}
                />

                <div>
                    <br/>
                    <h1>параметри</h1>
                    {itemData.parameters.map((paramter, index) => (
                        <div key={index}>
                            <li>{paramter.parameter}</li>
                            <li>{paramter.value}</li>
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={() => addToCart(itemData.id)} style={{
                display: 'inline-block',
                padding: '10px 20px',
                fontSize: '16px',
                fontWeight: 'bold',
                textAlign: 'center',
                textDecoration: 'none',
                border: '2px solid #4CAF50',
                color: '#ffffff',
                backgroundColor: '#4CAF50',
                cursor: 'pointer',
                borderRadius: '5px'
            }}>
                buy
            </button>
        </div>
    )
}