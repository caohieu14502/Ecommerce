from rest_framework.response import Response
from rest_framework import viewsets, generics, parsers, permissions, status
from ecommerce import serializers, paginators
from rest_framework.decorators import action
from .models import *


class CategoryViewSet(viewsets.ViewSet, generics.ListAPIView):
    queryset = Category.objects.filter(active=True).all()
    serializer_class = serializers.CategorySerializer

    def get_queryset(self):
        queries = self.queryset

        q = self.request.query_params.get("q")
        if q:
            queries = queries.filter(name__icontains=q)

        return queries

    @action(methods=['get'], detail=True)
    def products(self, request, pk):
        products = self.get_object().product_set.filter(active=True).all()

        store_id = self.request.query_params.get("store_id")
        if store_id:
            products = products.filter(store_id=store_id)

        return Response(serializers.ProductSerializer(products, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    # @action(methods=['get'], detail=True)
    # def categories(self, request, pk):
    #     categories1 = self.get_object().filter(product__store_id=1).values('name').distinct()
    #
    #     return Response(serializers.CategorySerializer(categories1, many=True, context={'request': request}).data,
    #                     status=status.HTTP_200_OK)


class ProductViewSet(viewsets.ViewSet, generics.ListAPIView, generics.RetrieveAPIView):
    queryset = Product.objects.all().order_by('?')
    serializer_class = serializers.ProductSerializer
    pagination_class = paginators.ProductPaginator

    def get_queryset(self):
        queries = self.queryset

        q = self.request.query_params.get("q")
        if q:
            queries = queries.filter(name__icontains=q)

        cate_id = self.request.query_params.get('cate_id')
        if cate_id:
            queries = queries.filter(category_id=cate_id)

        return queries


class StoreViewSet(viewsets.ViewSet, generics.RetrieveAPIView):
    queryset = Store.objects.all()
    serializer_class = serializers.StoreSerializer
    permission_classes = [permissions.IsAuthenticated()]

    @action(methods=['get'], detail=True)
    def categories(self, request, pk):
        categories = Category.objects.filter(product__store_id=self.get_object()).distinct()

        return Response(serializers.CategorySerializer(categories, many=True, context={'request': request}).data,
                        status=status.HTTP_200_OK)

    @action(methods=['post'], url_path='register-store', url_name='register-store', detail=False)
    def register_store(self, request):
        serializer = serializers.StoreSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView):
    queryset = User.objects.filter(is_active=True).all()
    serializer_class = serializers.UserSerializer
    parser_classes = [parsers.MultiPartParser]

    def get_permissions(self):
        if self.action.__eq__('current_user'):
            return [permissions.IsAuthenticated()]

        return [permissions.AllowAny()]

    @action(methods=['get'], url_path='current-user', url_name='current-user', detail=False)
    def current_user(self, request):
        return Response(serializers.UserSerializer(request.user).data)

