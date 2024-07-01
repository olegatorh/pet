from django.http import Http404
from rest_framework import status
from items.models import Category, SubCategory
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .models import Item
from .serializers import ItemsSerializer, CategorySerializer, SubCategorySerializer
from django.db.models import Q


class CategoriesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)


class SubCategoriesView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, category_id):
        sub__categories = SubCategory.objects.filter(category=category_id)
        serializer = SubCategorySerializer(sub__categories, many=True)
        return Response(serializer.data)


class CategoryByIdView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, cat_id=None):
        try:
            category = Category.objects.get(id=cat_id)
            serializer = CategorySerializer(category)
            return Response(serializer.data)
        except Category.DoesNotExist:
            return Response({"error": "Category not found."}, status=status.HTTP_404_NOT_FOUND)


class ItemsByIdView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, item_id=None):
        try:
            item = Item.objects.get(id=item_id)
            serializer = ItemsSerializer(item)
            return Response(serializer.data)
        except Item.DoesNotExist:
            return Response({"error": "Item not found."}, status=status.HTTP_404_NOT_FOUND)


class ItemsBySubCategoryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, sub_category_id):
        try:
            items = Item.objects.filter(sub_category=sub_category_id)
            serializer = ItemsSerializer(items, many=True)
            return Response(serializer.data)
        except Item.DoesNotExist:
            return Response({"error": "Items not found for the specified category."}, status=status.HTTP_404_NOT_FOUND)


class SearchItemsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, search):
        print(search)
        items = Item.objects.filter(Q(name__icontains=search) | Q(description__icontains=search)
                                    ).order_by('name')
        serializer = ItemsSerializer(items, many=True)
        print(serializer.data)
        return Response(serializer.data)
