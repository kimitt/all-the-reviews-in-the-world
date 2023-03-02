from unicodedata import category
from rest_framework import serializers
from .models import Post
from category.serializers import CategorySerializer

class PostSerializer(serializers.ModelSerializer):
    thumbnail=serializers.CharField(source='get_thumbnail')
    video=serializers.CharField(source='get_video')
    category=CategorySerializer()
    class Meta:
        model = Post
        fields=[
            'author',
            'title',
            'slug',
            'thumbnail',
            'description',
            'image',
            'video',
            'short_description',
            'category',
            'published',
            'status',
            # 'tags',
            'visit_count',
            
        ]