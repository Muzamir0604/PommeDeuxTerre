from rest_framework import serializers
from .models import Post, Review, Category


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ('id', 'stars', 'user', 'post', 'title', 'description')


class FilteredReviewSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.order_by('-created_at')[:3]
        return super(FilteredReviewSerializer, self).to_representation(data)


class LimitedReviewSerializer(serializers.ModelSerializer):
    class Meta:
        list_serializer_class = FilteredReviewSerializer
        model = Review
        fields = ('id', 'stars', 'user', 'post', 'title', 'description')


class PostSerializer(serializers.ModelSerializer):
    post_reviews = LimitedReviewSerializer(many=True, read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'title', 'description',
                  'no_of_reviews', 'avg_rating', 'post_reviews')


class FilteredPostSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.order_by('-created_at')[:7]
        return super(FilteredPostSerializer, self).to_representation(data)


class LimitedPostSerializer(serializers.ModelSerializer):
    reviews = LimitedReviewSerializer(many=True, read_only=True)

    class Meta:
        list_serializer_class = FilteredPostSerializer
        model = Post
        fields = ('id', 'title', 'description',
                  'no_of_reviews', 'avg_rating', 'created_at', 'post_reviews')


class CategorySerializer(serializers.ModelSerializer):
    posts = LimitedPostSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'title', 'description', 'posts']
