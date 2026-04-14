from rest_framework import serializers
from .models import Product, User


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url)
        return None


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'