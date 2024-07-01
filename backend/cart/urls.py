from django.urls import path

from cart.views import AddItemToCartView, DeleteItemFromCartView, GetCartItemsByUserView

urlpatterns = [
    path('cart/add/', AddItemToCartView.as_view(), name='add-item-to-cart'),
    path('cart/get/', GetCartItemsByUserView.as_view(), name='get-cart-items'),
    path('cart/delete/<int:item_id>/', DeleteItemFromCartView.as_view(), name='delete-item-from-cart'),
]