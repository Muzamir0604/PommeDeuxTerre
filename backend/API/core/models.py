"""
Central Model for PommeDeux Terre
"""
import uuid
import os
from django.db import models
from django.conf import settings
from django.core.validators import MaxValueValidator, MinValueValidator

# pylint: disable=missing-function-docstring
# pylint: disable=missing-class-docstring

# TODO: create a many to many field for ingredients
# TODO: separate unit quantity from ingredients


def recipe_image_file_path(instance, filename):
    """Generate file path for new recipe image"""
    ext = filename.split('.')[-1]
    filename = f'{uuid.uuid4()}.{ext}'

    return os.path.join('upload/recipe/', filename)


class Instruction(models.Model):
    title = models.CharField(max_length=100)
    recipe = models.ForeignKey(
        'Recipe', related_name="recipe_instructions", null=True,
        on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.title


class Ingredient(models.Model):
    UNIT_CHOICES = (
        ('ml', 'millilitre'),
        ('L', 'litre'),
        ('tbsp', 'tablespoon'),
        ('tsp', 'teaspoon'),
        ('tcp', 'teacup'),
        ('cup', 'cup'),
        ('cm', 'centimetre'),
        ('m', 'metre'),
        ('g', 'gram'),
        ('kg', 'kilogram'),
        ('pc', 'piece(s)'),
        ('pinch', 'pinch(es)')

    )
    name = models.CharField(max_length=64)
    recipe = models.ForeignKey(
        'Recipe', related_name="recipe_ingredients", null=True,
        on_delete=models.CASCADE)
    quantity = models.IntegerField(
        validators=[MinValueValidator(1)], null=True, blank=True)
    unit = models.CharField(
        max_length=5, choices=UNIT_CHOICES, default=UNIT_CHOICES[0][0],
        null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=64)
    prep_time = models.IntegerField(validators=[MinValueValidator(1)])
    cook_time = models.IntegerField(validators=[MinValueValidator(1)])
    servings = models.IntegerField(validators=[MinValueValidator(1)])
    post = models.ForeignKey(
        'Post', related_name="post_recipes", null=True,
        on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return "%s" % (self.name)

# TODO: Resize image before saving
# https://stackoverflow.com/questions/57111648/how-to-resize-an-imagefield-image-before-saving-it-in-python-django-model


class PostImage(models.Model):
    post_id = models.ForeignKey(
        'Post', related_name="post_images", null=True,
        on_delete=models.CASCADE)
    image = models.ImageField(null=True, upload_to=recipe_image_file_path)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.image.name

    def image_tag(self):
        from django.utils.html import mark_safe
        return mark_safe('<img src="%s" width="100px" \
        height="100px" style="object-fit: cover;" />' % (self.image.url))
    image_tag.short_description = 'thumbnail'


class Category(models.Model):
    title = models.CharField(max_length=32, default="others")
    description = models.TextField(max_length=360, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=64, default="")
    description = models.TextField(max_length=360, default="")
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    is_published = models.BooleanField(default=False)
    tags = models.ManyToManyField('Tag')
    category = models.ForeignKey(
        Category, related_name="category_posts", on_delete=models.CASCADE,
        blank=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="user_posts",
        on_delete=models.CASCADE, blank=True)

    def no_of_recipes(self):
        recipes = Recipe.objects.filter(post=self)
        return len(recipes)

    def no_of_reviews(self):
        reviews = Review.objects.filter(post=self)
        return len(reviews)

    def avg_rating(self):
        sum = 0
        reviews = Review.objects.filter(post=self)
        for review in reviews:
            sum += review.stars
        if len(reviews) > 0:
            return sum/len(reviews)
        else:
            return 0

    def __str__(self):
        return "%s: %s" % (self.category, self.title)


class Tag(models.Model):
    """Tag to be used for a recipe"""
    name = models.CharField(max_length=255, unique=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,

    )
    def __str__(self):
        return self.name


class Review(models.Model):
    post = models.ForeignKey(
        Post, related_name="post_reviews", on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="user_reviews",
        on_delete=models.CASCADE)
    stars = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])
    title = models.CharField(max_length=32, null=True)
    description = models.TextField(max_length=360, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        unique_together = (('user', 'post'),)
        index_together = (('user', 'post'),)

    def __str__(self):
        return "%s: %s - %s" % (self.post, self.title, self.user)


class Reply(models.Model):
    title = title = models.CharField(max_length=64, default="")
    text = models.TextField(max_length=360, null=True)
    review = models.ForeignKey(
        Review, related_name="review_replies", on_delete=models.CASCADE)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, related_name="user_replies",
        on_delete=models.CASCADE)
