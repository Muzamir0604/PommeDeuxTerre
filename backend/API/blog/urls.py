from django.urls import path
from django.contrib import admin
from .views import ReviewAPIViewSet, PostViewSet, CategoryViewSet, ImageUploadView, ImageUploadOnly
from rest_framework import routers
from django.conf.urls import include

router = routers.DefaultRouter(trailing_slash=False)
router.register('posts', PostViewSet)
router.register('reviews', ReviewAPIViewSet)
router.register('categories', CategoryViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('uploads/', ImageUploadView.as_view(), name="upload-image"),
    path('image/', ImageUploadOnly.as_view())
]
