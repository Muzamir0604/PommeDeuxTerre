from django.contrib import admin
from .models import Post, Review, Category

# Register your models here.
admin.site.register(Post)
admin.site.register(Review)
admin.site.register(Category)