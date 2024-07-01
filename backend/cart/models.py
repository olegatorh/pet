from django.db import models

from items.models import Item
from users.models import UserAccount


# Create your models here.

class Cart(models.Model):
    user = models.OneToOneField(UserAccount, on_delete=models.CASCADE, related_name='cart')
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.last_name


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)  # Linking to your Item model
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.quantity} of {self.item.name} at {self.cart}"
