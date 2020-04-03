from rest_framework import serializers
from .models import Post, Review, Category



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model= Category
        fields = ['id','title','description']

class PostSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Post
        fields= ('id','category','title','description','no_of_reviews', 'avg_rating',)


class PostListSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField(many=False)
    class Meta:
        model = Post
        fields = ['category', 'title','description']
 
    
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields= ('id','stars','user','post', 'title', 'description')
