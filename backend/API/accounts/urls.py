from django.urls import path
from .views import UserList, UserDetail, UserFullDetail
from django.conf.urls import include


urlpatterns = [
    path('users/', UserList.as_view(), name="user-list"),
    path('users/<int:pk>', UserDetail.as_view(), name="user-detail"),
    path('users/<int:pk>/reviews',
         UserFullDetail.as_view(), name="user-full-detail")
]
