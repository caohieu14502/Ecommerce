from .models import Category, Product, User, Store
from rest_framework import serializers


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'password', 'avatar', 'store', 'user_role', 'status']
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
