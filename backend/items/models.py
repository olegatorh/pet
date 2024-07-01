from users.models import UserAccount
from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True, blank=False)
    description = models.TextField(blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='Сategories/', blank=True)

    def __str__(self):
        return self.name


class SubCategory(models.Model):
    name = models.CharField(max_length=50, unique=True, blank=False)
    description = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='Сategories/SubCategories/', blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='subcategories')

    def __str__(self):
        return self.name


# Create your models here.
class Item(models.Model):
    name = models.CharField(max_length=30)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    short_description = models.TextField(max_length=50, blank=True)
    description = models.TextField(max_length=500, blank=True)
    additional_info = models.CharField(max_length=100, blank=True)
    active = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(upload_to='Items/')
    author = models.ForeignKey(UserAccount, on_delete=models.CASCADE, blank=False, null=False)
    sub_category = models.ForeignKey(SubCategory, on_delete=models.CASCADE, blank=False, null=False,
                                     related_name='items')

    def __str__(self):
        return self.name


class Parameter(models.Model):
    name = models.CharField(max_length=100)
    category = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class ItemParameter(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    parameter = models.ForeignKey(Parameter, on_delete=models.CASCADE)
    value = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.parameter.name}, {self.value}"
