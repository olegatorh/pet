'use client';


import {useSearchItemsQuery} from "@/redux/features/itemsApiSlice";
import {useEffect, useState} from "react";
import {useDispatch} from 'react-redux';
import {setSearchData} from "@/redux/services/searchSlice";


export default function Search({placeholder}: { placeholder: string }) {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
    const {data, error, isLoading} = useSearchItemsQuery(debouncedSearchTerm, {
        skip: debouncedSearchTerm.length < 3  // Use debounced term for skipping
    });

    // Handle real-time input changes


    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 2000);  // Debounce time of 2000 ms

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    useEffect(() => {
        if (debouncedSearchTerm.length === 0) {
            dispatch(setSearchData(''));  // Clear search data if term is empty
        } else if (data) {
            dispatch(setSearchData(data));  // Set search data if there's valid data
        }
    }, [debouncedSearchTerm, data, dispatch]);


    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}