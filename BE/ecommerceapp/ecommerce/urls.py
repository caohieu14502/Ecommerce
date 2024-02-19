from django.urls import path, include, re_path
from rest_framework import routers
from ecommerce import views, admin

router = routers.DefaultRouter()
router.register('categories', views.CategoryViewSet, basename='categories')
router.register('store', views.StoreViewSet, basename='store')
router.register('products', views.ProductViewSet, basename='products')
router.register('users', views.UserViewSet, basename='user')
router.register('reviews', views.ReviewViewSet, basename='reviews')


urlpatterns = [
    path('', include(router.urls)),
    path('admin/stats-count-admin/', admin.EcommerceAdminSite.stats),
    re_path(r'^admin/stats-revenue/(?P<month>[0-12]{1,2})/$', admin.EcommerceAdminSite.stats_revenue_view),
]
