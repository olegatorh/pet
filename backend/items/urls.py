from django.urls import path
from items.views import ItemsByIdView, ItemsBySubCategoryView, CategoriesView, CategoryByIdView, SubCategoriesView, SearchItemsView


urlpatterns = [
    path('item/all/<str:sub_category_id>/', ItemsBySubCategoryView.as_view(), name='items_by_sub_category'),
    path('item/<int:item_id>/', ItemsByIdView.as_view(), name='item_by_id'),
    path('item/search/<str:search>/', SearchItemsView.as_view(), name='search_items'),


    path('category/all/', CategoriesView.as_view(), name='categories'),
    path('sub/category/<int:category_id>/', SubCategoriesView.as_view(), name='sub_categories'),
    path('category/<int:category_id>/', CategoryByIdView.as_view(), name='category'),
]
