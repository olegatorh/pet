from rest_framework import serializers

from items.models import Item
from .models import CartItem


class CartItemSerializer(serializers.ModelSerializer):
    item = serializers.SlugRelatedField(slug_field='name', queryset=Item.objects.all())
    image = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'item', 'image', 'price', 'quantity', 'added_at']
        read_only_fields = ['id', 'added_at']

    def get_item(self, obj):
        return obj.item.name

    def get_image(self, obj):
        request = self.context.get('request')
        image_url = obj.item.image.url
        return request.build_absolute_uri(image_url) if request else image_url

    def get_price(self, obj):
        return obj.item.price
