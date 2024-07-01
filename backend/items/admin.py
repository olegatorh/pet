from django.contrib import admin

from items.models import Item, Category, SubCategory, Parameter, ItemParameter

# Register your models here.
# Register your models here.
admin.site.register(Category)
admin.site.register(SubCategory)
admin.site.register(Parameter)
admin.site.register(Item)
admin.site.register(ItemParameter)
