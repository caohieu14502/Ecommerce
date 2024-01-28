from django.db import models
from django.contrib.auth.models import AbstractUser, Group
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model

class BaseModel(models.Model):
    created_date = models.DateField(auto_now_add=True, null=True)
    updated_date = models.DateField(auto_now=True, null=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class User(AbstractUser):
    user_role = models.ForeignKey(Group, on_delete=models.RESTRICT, related_name='user_role', default=1)
    status = models.CharField(max_length=50, null=False)
    avatar = CloudinaryField('avatar', null=True)

    def __str__(self):
        return self.status


class Store(BaseModel):
    name = models.CharField(max_length=100, null=False)
    description = RichTextField()
    location = models.CharField(max_length=100, null=False)
    user = models.OneToOneField(User, on_delete=models.RESTRICT, related_query_name='store')

    def __str__(self):
        return self.name


class Category(BaseModel):
    name = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name


class Product(BaseModel):
    name = models.CharField(max_length=100, null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    image = models.ImageField(upload_to='ecommerce/%Y/%m')
    description = RichTextField()
    quantity = models.IntegerField()
    category = models.ForeignKey(Category, on_delete=models.RESTRICT, related_query_name='product')
    store = models.ForeignKey(Store, on_delete=models.RESTRICT, related_query_name='product', editable=False)
    #editable

    def __str__(self):
        return self.name


class Order(models.Model):
    order_date = models.DateField(auto_now=True)
    user = models.ForeignKey(User, on_delete=models.RESTRICT, related_query_name='order')


class OrderDetail(models.Model):
    unit_price = models.DecimalField(max_digits=8, decimal_places=2, null=False)
    quantity = models.IntegerField()
    order = models.ForeignKey(Order, on_delete=models.RESTRICT, related_query_name='order-details')
    user = models.ForeignKey(User, on_delete=models.RESTRICT, related_query_name='order')


class Interaction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    class Meta:
        abstract = True


class Comment(Interaction):
    content = models.CharField(max_length=100, null=False)
    create_date = models.DateField(auto_now=True)
    product = models.ForeignKey(Product, on_delete=models.RESTRICT, related_query_name='product')


class Review(Interaction):
    star = models.IntegerField()
    note = models.CharField(max_length=100, null=False)
    store = models.ForeignKey(Store, on_delete=models.RESTRICT, related_query_name='product')


