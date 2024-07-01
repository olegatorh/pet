from rest_framework import serializers
from .models import Item, Category, SubCategory, ItemParameter, Parameter
from users.models import UserAccount


class ParameterSerializer(serializers.ModelSerializer):
    parameter = serializers.SlugRelatedField(slug_field='name', queryset=Parameter.objects.all())
    class Meta:
        model = ItemParameter
        fields = ['value', 'parameter']


class ItemsSerializer(serializers.ModelSerializer):
    sub_category = serializers.SlugRelatedField(slug_field='name', queryset=SubCategory.objects.all())
    author = serializers.SlugRelatedField(slug_field='first_name', queryset=UserAccount.objects.all())
    category = serializers.SerializerMethodField()
    parameters = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ['id', 'name', 'price', 'quantity', 'short_description', 'description', 'additional_info', 'active',
                  'timestamp', 'image', 'author', 'category', 'sub_category', 'parameters']

    def get_category(self, obj):
        return obj.sub_category.category.name

    def get_parameters(self, obj):
        parameters = ItemParameter.objects.filter(item=obj)
        return ParameterSerializer(parameters, many=True).data


class SubCategorySerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='name', read_only=True)

    class Meta:
        model = SubCategory
        fields = ['id', 'name', 'description', 'image', 'category']


class CategorySerializer(serializers.ModelSerializer):
    sub_categories = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'description', 'image', 'sub_categories']

    def get_sub_categories(self, obj):
        subcategories = SubCategory.objects.filter(category=obj)
        return SubCategorySerializer(subcategories, many=True).data
