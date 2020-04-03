from django.contrib import admin
from .models import Post, Review, Category


class PostAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_at',
                    'updated_at', 'no_of_reviews', 'avg_rating']


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
