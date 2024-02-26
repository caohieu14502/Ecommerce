from rest_framework.generics import get_object_or_404
from .models import Category, Product, User, Store, Review, Comment, OrderDetail, Order
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'last_name', 'first_name', 'avatar', 'store', 'user_role', 'status']

        extra_kwargs = {
            'password': {
                'write_only': True
            },
            'store': {
                'read_only': True
            },
            'status': {
                'read_only': True
            }
        }

    def create(self, validated_data):
        data = validated_data.copy()

        user = User(**data)
        user.set_password(data['password'])
        user.save()

        return user


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'description', 'location']

    def create(self, validated_data):
        request = self.context.get("request")

        user = User.objects.get(pk=request.user.pk)
        user.save()

        post = Store()
        post.name = validated_data['name']
        post.description = validated_data['description']
        post.location = validated_data['location']
        post.user = request.user

        post.save()

        return post


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')
    category = CategorySerializer()
    store = StoreSerializer()

    def get_image(self, product):
        if product.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri('/static/%s' % product.image.name)

            return '/static/%s' % product.image.name

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image', 'description', 'category', 'store']


class OrderDetailListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        o = Order()
        o.user = self.context.get('user')
        ods = []
        o.save()
        for item in validated_data:
            od = OrderDetail(**item, order=o)
            item["product"].quantity = item["product"].quantity - item["quantity"]
            item["product"].save()
            ods.append(od)
        return OrderDetail.objects.bulk_create(ods)


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = ['quantity', 'unit_price', 'product']
        list_serializer_class = OrderDetailListSerializer

    # Dung context de lay Product Id va tao Order o ben View
    def create(self, validated_data):
        pass


class ReviewSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Review
        fields = ['id', 'created_date', 'star', 'note', 'user']


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ['id', 'created_date', 'content', 'user']
