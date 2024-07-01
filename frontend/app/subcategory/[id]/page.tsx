"use client"


import {Item, useRetrieveItemsBySubCategoryQuery} from "@/redux/features/itemsApiSlice";
import Image from 'next/image';
import Link from "next/link";

export default function Page({params}: {
    params: { id: number }

}) {
    const {data: itemsData, error, isLoading} = useRetrieveItemsBySubCategoryQuery({subCategoryId: params.id});
    const host = process.env.NEXT_PUBLIC_HOST

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching items</div>;
    if (!itemsData) return <div>Item not found</div>;

   return (
       <div style={{
           marginTop: "10vh",
           display: 'grid',
           gridTemplateColumns: 'repeat(4, 1fr)', // 4 items per row
           gap: '16px',
       }}>
           {(itemsData as any)?.map((item: Item, index: number) => (
               <Link href={`/item/${item.id}`} key={index}>
                   <div style={{
                        marginBottom: '24px', // Adds space for the subcategory list
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                       <Image
                           src={`${host}${item.image}`}
                           alt={item.name}
                           unoptimized
                           width={150}
                           height={100}
                       />
                       <div style={{
                           fontSize: '24px', // Adjust font size as needed
                       }}>
                           {item.name}
                       </div>
                   </div>
               </Link>
           ))}
       </div>
   );
}