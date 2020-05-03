from django.urls import path
# from .views import UserList, UserDetail, UserFullDetail
# from django.conf.urls import include
from user import views

# urlpatterns = [
#     path('users/', UserList.as_view(), name="user-list"),
#     path('users/<int:pk>', UserDetail.as_view(), name="user-detail"),
#     path('users/<int:pk>/reviews',
#          UserFullDetail.as_view(), name="user-full-detail")
# ]

app_name = 'user'

urlpatterns = [
    path('create/', views.CreateUserView.as_view(), name='create'),
    path('token/', views.CreateTokenView.as_view(), name='token'),
    path('me/', views.ManageUserView.as_view(), name='me'),
]
