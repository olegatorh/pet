import {apiSlice} from '../services/apiSlice';


export interface Category {
    id: number;
    name: string;
    description: string;
    image: string | null;
    sub_categories?: SubCategory[]; // Додаємо опціональне поле для субкатегорій
}

interface CategoriesResponse {
    categories: Category[]; // Масив категорій
}

interface CategoryResponse {
    id: number;
    name: string;
    description: string;
    image: string | null;
    sub_categories: SubCategory[];
}
interface RetrieveCategoriesParams {
    categoryId: number;
}

export interface Item {
  id: number;
  name: string;
  price: string;
  quantity: number;
  short_description: string;
  description: string;
  additional_info: string;
  active: boolean;
  timestamp: string;
  image: string;
  author: string;
  category: string;
  sub_category: string;
  parameters: Params[]

  // Add other item properties here
}

export interface Params {
  value: string;
  parameter: string
}

export interface ItemsBySubCategoryResponse {
  items: Item[]; // This should match the expected shape of your API response
}

// Params that you'll pass when you want to retrieve items by subcategory
interface RetrieveItemsBySubCategoryParams {
  subCategoryId: number;
}interface RetrieveItemParam {
  itemId: number;
}

export interface SubCategory {
    id: number;
    name: string;
    description: string;
    image: string | null;
    category?: string;
}


const ItemsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        retrieveCategory: builder.query<Category, RetrieveCategoriesParams>({
            query: (params) => ({
                url: `/category/${params.categoryId}/`
            })
        }),

        retrieveCategories: builder.query<CategoriesResponse, void>({
            query: () => ({
                url: `/category/all/`
            })
        }),
        retrieveSubCategories: builder.query<Category, RetrieveCategoriesParams>({
            query: (params) => ({
                url: `sub/category/${params.categoryId}/`
            })
        }),
        retrieveItemsBySubCategory: builder.query<ItemsBySubCategoryResponse, RetrieveItemsBySubCategoryParams>({
            query: (params) => ({
                url: `item/all/${params.subCategoryId}/`
            })
        }),
        retrieveItemById: builder.query<Item, RetrieveItemParam>( {
            query: (params) => ({
                url: `item/${params.itemId}/`
            })
        }),
        searchItems: builder.query({
            query: (searchTerm) => ({
                url: `item/search/${encodeURIComponent(searchTerm)}/`
            }),
        })
    })
})


export const {
    useLazyRetrieveCategoryQuery,
    useRetrieveCategoriesQuery,
    useLazyRetrieveSubCategoriesQuery,
    useRetrieveItemsBySubCategoryQuery,
    useRetrieveItemByIdQuery,
    useSearchItemsQuery
} = ItemsApiSlice