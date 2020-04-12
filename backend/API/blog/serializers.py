from rest_framework import serializers
from .models import Post, Review, Category, PostImage, Ingredient, Instruction, Recipe, Reply
from django.contrib.auth.models import User


class ReplySerializer(serializers.ModelSerializer):
    class Meta:
        model = Reply
        # exclude = ('created_at', 'updated_at', 'recipe')
        fields = "__all__"


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        exclude = ('created_at', 'updated_at', 'recipe')
        # fields = "__all__"


class InstructionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Instruction
        exclude = ('created_at', 'updated_at', 'recipe')


class RecipeSerializer(serializers.ModelSerializer):
    recipe_instructions = InstructionSerializer(many=True)
    recipe_ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ('id', 'name', 'prep_time', 'cook_time', 'servings',
                  'recipe_instructions', 'recipe_ingredients')


class ImageOnlySerializer(serializers.ModelSerializer):
    # TODO: GET full URL
    class Meta:
        model = PostImage
        fields = ('id', 'image')


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImage
        exclude = ('created_at', 'updated_at')


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
    review_replies = ReplySerializer(many=True)

    class Meta:
        model = Review
        fields = ('id', 'title', 'description', 'stars',
                  'user', 'post', 'review_replies')


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
    post_recipes = RecipeSerializer(many=True)
    post_reviews = LimitedReviewSerializer(many=True, read_only=True)
    user = UserNameSerializer(many=False)

    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'post_images',
                  'no_of_reviews', 'avg_rating', 'post_reviews', 'user', 'post_recipes')


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
