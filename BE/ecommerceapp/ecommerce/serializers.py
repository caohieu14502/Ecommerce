from .models import Category, Product, User, Store, Review, Comment
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'avatar']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

        def create(self, validated_data):
            data = validated_data.copy()

            user = User(**data)
            user.set_password(data['password'])
            user.save()

            return user


class StoreSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Store
        fields = ['id', 'name', 'description', 'location', 'user']


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
