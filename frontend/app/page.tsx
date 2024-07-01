"use client"

// Import React and Next.js components
import Image from 'next/image';
import {useLazyRetrieveSubCategoriesQuery, useRetrieveCategoriesQuery} from "@/redux/features/itemsApiSlice";
import {useState} from "react";
import {Spinner} from "@/components/common";
import Link from 'next/link';
import {useSelector} from "react-redux";


interface SubCategory {
    id: number;
    name: string;
    description: string;
    image: string;
    category: string; // або category: number; якщо ви зберігаєте ID головної категорії
}

// Інтерфейс для категорії
interface Category {
    id: number;
    name: string;
    description: string;
    image: string;
    sub_categories: SubCategory[]; // Масив об'єктів підкатегорії
}

// Import your redux features and components
// import { useLazyRetrieveSubCategoriesQuery, useRetrieveCategoriesQuery } from "@/redux/features/itemsApiSlice";

export default function Page() {
    const {data: categoriesData, error: categoriesError, isLoading: categoriesLoading} = useRetrieveCategoriesQuery();
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [triggerSubCategories, {
        data: subCategoriesData,
        isLoading: subCategoriesLoading
    }] = useLazyRetrieveSubCategoriesQuery();

    const items = useSelector((state: any) => state.searchData.items);
    const host = process.env.NEXT_PUBLIC_HOST

    const handleCategoryClick = (categoryId: number) => {
        setSelectedCategoryId(categoryId);
        triggerSubCategories({categoryId});
    };


    if (items.length !== 0) {
        return (
            <div>
                {items.map((item: any, index: number) => (
                    <p key={index}>{item.name}</p>
                ))}
            </div>
        )
    } else

    return (
        <div style={{ textAlign: "center" }}>
            <h1 style={{ marginTop: "3vh", marginBottom: "3vh" }}>Categories</h1>
            {categoriesLoading && <Spinner />}
            {categoriesError && <p>Error loading categories.</p>}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)', // 4 items per row
                gap: '16px',
            }}>
                {(categoriesData as any)?.map((category: Category) => (
                    <div key={category.id} style={{
                        marginBottom: '24px', // Adds space for the subcategory list
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '200px', // Adjust if needed
                            overflow: 'hidden',
                            cursor: 'pointer',
                        }} onClick={() => handleCategoryClick(category.id)}>
                            <Image src={`${host}/${category.image}`}
                                alt={category.name}
                                fill
                                priority={true}
                                sizes="100vw"
                                style={{ objectFit: "contain" }}
                            />
                            <div style={{
                                position: 'absolute',
                                top: '0',
                                left: '50%',
                                transform: 'translateX(-50%)', // Center horizontally
                                color: 'white',
                                textAlign: 'center',
                                fontSize: '24px', // Adjust font size as needed
                                marginTop: '8px', // Adjust vertical margin
                            }}>
                                {category.name}
                            </div>
                        </div>
                        {selectedCategoryId === category.id && (
                            subCategoriesLoading ? <Spinner /> : (
                                <div style={{ marginTop: '10px' }}>
                                    <ul style={{ paddingLeft: 0 }}>
                                        <li key={category.id} style={{ listStyle: 'none' }}>
                                            {(subCategoriesData as any)?.map((subCategory: SubCategory, index: number) => (
                                                <Link key={index} href={`/subcategory/${subCategory.id}`}
                                                    style={{
                                                        fontSize: '20px', // Adjust font size as needed
                                                        display: 'block', // Забезпечує, що кожен елемент займатиме всю ширину
                                                    }}>
                                                    {subCategory.name}
                                                </Link>
                                            ))}
                                        </li>
                                    </ul>
                                </div>
                            )
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
