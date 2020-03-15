from django.urls import path
from django.contrib import admin
from .views import ReviewViewSet, PostViewSet, UserViewSet
from rest_framework import routers
from django.conf.urls import include



router =  routers.DefaultRouter()
router.register('posts',PostViewSet,basename='api')
router.register('reviews',ReviewViewSet,basename='api')
router.register('users', UserViewSet, basename='api')

urlpatterns = [
    path('', include(router.urls)),
]
