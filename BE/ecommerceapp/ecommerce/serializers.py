from .models import Category, Product, User, Store
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['id', 'name', 'location', 'description']


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



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'avatar']
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
