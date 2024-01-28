from django.urls import path, include
from rest_framework import routers
from ecommerce import views


router = routers.DefaultRouter()
router.register('categories', views.CategoryViewSet, basename='categories')
router.register('products', views.ProductViewSet, basename='products')
router.register('user', views.UserViewSet, basename='user')


urlpatterns = [
    path('', include(router.urls)),

]
