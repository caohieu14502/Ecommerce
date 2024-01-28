from .models import Category, Product, User
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField(source='image')

    def get_image(self, product):
        if product.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri('/static/%s' % product.image.name)

            return '/static/%s' % product.image.name

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'image' , 'category']


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