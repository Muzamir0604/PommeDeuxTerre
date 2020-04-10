from rest_framework import serializers
from .models import Post, Review, Category, PostImage, Ingredient, RecipeStep
from django.contrib.auth.models import User


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = "__all__"


class RecipeStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecipeStep
        fields = "__all__"


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        fields = "__all__"


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class PostTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title')


class ReviewSerializer(serializers.ModelSerializer):
    post = PostTitleSerializer(many=False)
    user = UserNameSerializer(many=False)

    class Meta:
        model = Review
        fields = ('id', 'title', 'description', 'stars', 'user', 'post')


class FilteredReviewSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.order_by('-created_at')[:3]
        return super(FilteredReviewSerializer, self).to_representation(data)


class LimitedReviewSerializer(serializers.ModelSerializer):
    user = UserNameSerializer(many=False)

    class Meta:
        list_serializer_class = FilteredReviewSerializer
        model = Review
        fields = ('id', 'stars', 'user', 'post', 'title', 'description')


class PostSerializer(serializers.ModelSerializer):
    post_images = ImageSerializer(many=True)
    post_ingredients = IngredientSerializer(many=True)
    post_recipesteps = RecipeStepSerializer(many=True)
    post_reviews = LimitedReviewSerializer(many=True, read_only=True)
    user = UserNameSerializer(many=False)

    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'post_images',
                  'no_of_reviews', 'avg_rating', 'post_reviews', 'user', 'post_ingredients', 'post_recipesteps')


class FilteredPostSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.order_by('-created_at')[:7]
        return super(FilteredPostSerializer, self).to_representation(data)


class LimitedPostSerializer(serializers.ModelSerializer):
    post_images = ImageSerializer(many=True)
    post_reviews = LimitedReviewSerializer(many=True, read_only=True)
    user = UserNameSerializer(many=False)

    class Meta:
        list_serializer_class = FilteredPostSerializer
        model = Post
        fields = ('id', 'title', 'description', 'post_images', 'user',
                  'no_of_reviews', 'avg_rating', 'created_at', 'post_reviews')


class CategorySerializer(serializers.ModelSerializer):
    category_posts = LimitedPostSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'title', 'description', 'category_posts']
