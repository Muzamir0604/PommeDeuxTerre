"""
Central admin for Pomme Deux Terre
"""
from django.contrib import admin
from core.models import Post, Review, Category, PostImage, Ingredient,\
    Instruction, Recipe, Tag
from nested_admin import NestedModelAdmin, NestedTabularInline
from django.db import models
from django.forms import Textarea, TextInput
# pylint: disable=missing-class-docstring
# https://django-filer.readthedocs.io/en/latest/installation.html
# Consider Django filer


class TagAdmin(NestedModelAdmin):
    model = Tag
    extra = 0
    field = ('id', 'name')
    readonly_fields = ('id',)


class IngredientInline(NestedTabularInline):
    model = Ingredient
    fk_name = "recipe"
    extra = 0
    formfield_overrides = {
        models.CharField: {'widget': TextInput(
            attrs={'rows': 2,
                   'cols': 40,
                   'style': 'height: 2em; width:30em;'})},
    }


class InstructionInline(NestedTabularInline):
    model = Instruction
    fk_name = "recipe"
    extra = 0
    formfield_overrides = {
        models.CharField: {'widget': Textarea(
                           attrs={'rows': 2,
                                  'cols': 40,
                                  'style': 'height: 3em; width:50em;'})},
    }


class RecipeAdmin(NestedModelAdmin):
    model = Recipe
    extra = 0

    list_display = ['name', 'post', 'created_at', 'updated_at']

    GRAPELLI_AUTOCOMPLETE_SEARCH_FIELDS = {
        "core": {
            "Recipe": {"id__iexact",
                       "name__icontains",
                       "post__icontains",
                       "post__post_recipes__icontains"
                       },
        }
    }
    inlines = [InstructionInline, IngredientInline]


class RecipeInline(NestedTabularInline):
    model = Recipe
    fk_name = "post"
    extra = 0
    inlines = [InstructionInline, IngredientInline]


class PostImageInline(NestedTabularInline):
    model = PostImage
    fk_name = "post_id"
    extra = 0
    field = ('image_tag', 'image')
    readonly_fields = ('image_tag',)


class PostAdmin(NestedModelAdmin):
    list_display = ['title', 'user', 'category', 'no_of_recipes', 'created_at',
                    'updated_at', 'no_of_reviews', 'avg_rating', 'is_published'
                    ]
    list_editable = ['category', 'is_published']

    inlines = [PostImageInline, RecipeInline]
    fields = (('title', 'category', 'is_published'), 'user', 'description', 'tags'
              )
    filter_horizontal = ('tags',)
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
# admin.site.register(Quantity)
admin.site.register(Tag, TagAdmin)
admin.site.register(Ingredient)
admin.site.register(Recipe, RecipeAdmin)
