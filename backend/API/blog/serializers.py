"""
Central Serializer for PommeDeuxTerre
"""
from rest_framework import serializers
from django.contrib.auth import get_user_model
from core.models import Post, Review, Category, PostImage, Ingredient,\
    Instruction, Recipe, Reply, Tag


# TODO: Reply model with serializer test
# TODO: client API serializer vs url test cases
# pylint: disable=missing-class-docstring
class FilteredTagSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.order_by('-created_at')[:4]
        return super(FilteredTagSerializer, self).to_representation(data)


class LimitedTagSerializer(serializers.ModelSerializer):
    class Meta:
        list_serializer_class = FilteredTagSerializer
        model = Tag
        fields = ('id', 'name')


class TagSerializer(serializers.ModelSerializer):
    """ Serializer for tag objects"""

    class Meta:
        model = Tag
        fields = ('id', 'name')
        read_only_fields = ('id',)


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
                  'recipe_instructions', 'recipe_ingredients', 'post')

    def create(self, validated_data):
        instructions = validated_data.pop('recipe_instructions')
        ingredients = validated_data.pop('recipe_ingredients')
        recipe = Recipe.objects.create(**validated_data)
        for instruction in instructions:
            Instruction.objects.create(recipe=recipe, **instruction)
        for ingredient in ingredients:
            Ingredient.objects.create(recipe=recipe, **ingredient)
        return recipe


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
        model = get_user_model()
        fields = ('id', 'name')


class PostTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title')


class ReviewSerializer(serializers.ModelSerializer):
    post = PostTitleSerializer(many=False)
    user = UserNameSerializer(many=False)

    class Meta:
        model = Review
        fields = ('id', 'title', 'description', 'stars',
                  'user', 'post')
        read_only_fields = ('id',)


class CategoryTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'title', 'description']
        read_only_fields = ('id',)


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
    post_images = ImageSerializer(many=True, required=False, read_only=True)
    post_recipes = RecipeSerializer(many=True, required=False, read_only=True)
    post_reviews = LimitedReviewSerializer(many=True, read_only=True)
    user = UserNameSerializer(many=False, required=False, read_only=True)
    tags = TagSerializer(many=True, required=False)

    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'post_images', 'category',
                  'no_of_reviews', 'avg_rating', 'post_reviews', 'user',
                  'post_recipes', 'is_published', 'tags')
        read_only_fields = ('id', 'no_of_reviews', 'avg_rating',
                            'post_reviews', 'post_recipes', 'post_images'
                            'tags')


class FilteredPostSerializer(serializers.ListSerializer):
    def to_representation(self, data):
        data = data.filter(is_published=True).order_by('-created_at')[:7]
        return super(FilteredPostSerializer, self).to_representation(data)


class LimitedPostSerializer(serializers.ModelSerializer):
    post_images = ImageSerializer(many=True)
    post_reviews = LimitedReviewSerializer(many=True, read_only=True)
    user = UserNameSerializer(many=False)
    tags = LimitedTagSerializer(many=True, read_only=True)

    class Meta:
        list_serializer_class = FilteredPostSerializer
        model = Post
        fields = ('id', 'title', 'description', 'post_images', 'user',
                  'no_of_reviews', 'avg_rating', 'created_at', 'updated_at', 'post_reviews', 'tags')


class CategorySerializer(serializers.ModelSerializer):
    category_posts = LimitedPostSerializer(many=True, read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'title', 'description', 'category_posts']
