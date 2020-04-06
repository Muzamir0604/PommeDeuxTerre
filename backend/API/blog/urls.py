from django.urls import path
from django.contrib import admin
from .views import ReviewViewSet, PostViewSet, CategoryViewSet, ImageUploadView
from rest_framework import routers
from django.conf.urls import include

router = routers.DefaultRouter()
router.register('posts', PostViewSet)
router.register('reviews', ReviewViewSet)
router.register('categories', CategoryViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('uploads/', ImageUploadView.as_view())
]
