from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cart.models import Cart, CartItem
from cart.serializers import CartItemSerializer
from items.models import Item
from users.authentication import CustomJWTAuthentication
from users.models import UserAccount


# Create your views here.

class AddItemToCartView(APIView):
    def post(self, request):
        user = request.user
        print(request.user)
        print(request.data)
        if not user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        item_id = request.data.get('item_id')
        quantity = request.data.get('quantity', 1)

        item = get_object_or_404(Item, id=item_id)

        cart, _ = Cart.objects.get_or_create(user=user)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, item=item, defaults={'quantity': quantity})

        if not created:
            cart_item.quantity += quantity
            cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GetCartItemsByUserView(APIView):
    authentication_classes = [CustomJWTAuthentication]

    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)
        cart, _ = Cart.objects.get_or_create(user=user)
        cart_items = CartItem.objects.filter(cart=cart.id).all()
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data, status=200)


class DeleteItemFromCartView(APIView):
    def delete(self, request, item_id):
        user = request.user
        if not user.is_authenticated:
            return Response({'error': 'Authentication required'}, status=status.HTTP_401_UNAUTHORIZED)

        cart_item = get_object_or_404(CartItem, id=item_id, cart__user=user)
        if cart_item.quantity > 1:
            cart_item.quantity -= 1  # Decrease the quantity by 1
            cart_item.save()  # Save the updated cart item
            return Response({'message': 'One item was removed from the cart.'}, status=status.HTTP_200_OK)
        else:
            cart_item.delete()  # Delete the cart item if quantity is 1 or less
            return Response({'message': 'Item removed from the cart.'}, status=status.HTTP_204_NO_CONTENT)
