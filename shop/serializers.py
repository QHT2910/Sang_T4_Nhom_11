from rest_framework import serializers
from .models import Product, User,Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_id', 'category_name']

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'
        # '__all__' không include category_name nên cần thêm

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category_name'] = instance.category.category_name if instance.category else None
        return data

    def get_category_name(self, obj):
        if obj.category:
            return obj.category.category_name
        return None

    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            return request.build_absolute_uri(obj.image.url)
        return None


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'