from .models import Category
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    thumbnail=serializers.CharField(source='get_thumbnail')
    class Meta:
        model = Category
        fields=['id', 'name', 'thumbnail']
        # read_only_fields = ('id',)