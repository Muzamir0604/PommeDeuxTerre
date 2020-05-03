
# https://django-filer.readthedocs.io/en/latest/installation.html
# Consider Django filer
from django.contrib import admin
from core.models import Post, Review, Category, PostImage, Ingredient,\
                    Instruction, Recipe


# from django.db import models
# from django.forms.models import ModelForm
from nested_admin import NestedModelAdmin, NestedTabularInline


class IngredientInline(NestedTabularInline):
    model = Ingredient
    fk_name = "recipe"
    extra = 0


class InstructionInline(NestedTabularInline):
    model = Instruction
    fk_name = "recipe"
    extra = 0


class RecipeAdmin(NestedModelAdmin):
    model = Recipe
    extra = 0

    inlines = [InstructionInline, IngredientInline]
    list_display = ['name', 'post', 'created_at', 'updated_at']


class RecipeInline(NestedTabularInline):
    model = Recipe
    fk_name = "post"
    extra = 0
    inlines = [InstructionInline, IngredientInline]

#  class ReviewInline(admin.StackedInline):
#     model = Review
#     fk_name = "post"
#     extra = 0


class PostImageInline(NestedTabularInline):
    model = PostImage
    fk_name = "post_id"
    extra = 0
    field = ('image_tag', 'image')
    readonly_fields = ('image_tag',)


# class PostImageAdmin(NestedModelAdmin):
#     list_display = ['id', 'image_tag', 'image']


class PostAdmin(NestedModelAdmin):
    list_display = ['title', 'user', 'category', 'no_of_recipes', 'created_at',
                    'updated_at', 'no_of_reviews', 'avg_rating', 'is_published'
                    ]
    list_editable = ['category', 'is_published']
    # radio_fields = {"post_recipes": admin.VERTICAL}
    inlines = [PostImageInline, RecipeInline]
    fields = (('title', 'category'), 'user', 'description', 'is_published')
    # search_fields = ['title', 'category']


class CategoryAdmin(NestedModelAdmin):
    list_display = ['title', 'created_at',
                    'updated_at']


class ReviewAdmin(NestedModelAdmin):
    # readonly_fields = ('title', 'title', 'post', 'user',
    #                    'stars', 'created_at', 'updated_at')
    list_display = ['title', 'post', 'user',
                    'stars', 'created_at', 'updated_at']


# Register your models here.
admin.site.register(Post, PostAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Category, CategoryAdmin)
# admin.site.register(PostImage, PostImageAdmin)
# admin.site.register(User)
admin.site.register(Recipe, RecipeAdmin)
