# from adminsortable2.admin import SortableInlineAdminMixin
# https://django-admin-sortable2.readthedocs.io/en/latest/usage.html#integrate-your-models
# TODO: add admin sortable for thumbnail purpose
from django.contrib import admin
from .models import Post, Review, Category, PostImage


from django.db import models
from django.forms.models import ModelForm


class ReviewInline(admin.StackedInline):
    model = Review
    fk_name = "post"
    extra = 0


class PostImageInline(admin.StackedInline):
    model = PostImage
    fk_name = "post_id"
    extra = 0
    field = ('image_tag', 'image')
    readonly_fields = ('image_tag',)


class PostImageAdmin(admin.ModelAdmin):
    list_display = ['id', 'image_tag', 'image']


class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at',
                    'updated_at', 'no_of_reviews', 'avg_rating']
    inlines = [ReviewInline, PostImageInline]


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at',
                    'updated_at']


class ReviewAdmin(admin.ModelAdmin):
    list_display = ['title', 'post', 'user',
                    'stars', 'created_at', 'updated_at']


# Register your models here.
admin.site.register(Post, PostAdmin)
admin.site.register(Review, ReviewAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(PostImage, PostImageAdmin)
