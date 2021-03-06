"""pommedeuxterreapi URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from django.conf import settings
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf.urls.static import static
from .views import CustomObtainAuthToken
from rest_auth.views import PasswordResetConfirmView
from .customViews import PasswordResetView
urlpatterns = [
    path('grappelli/', include('grappelli.urls')),
    url(r'^_nested_admin/', include('nested_admin.urls')),
    path('admin/', admin.site.urls),
    path('auth/', CustomObtainAuthToken.as_view()),
    path('blog/', include('blog.urls')),
    path('accounts/', include('accounts.urls')),
    path('api/', include('rest_framework.urls')),
    path('reset_password/', PasswordResetView.as_view(),
         name='password_reset'),
    path('reset/<uidb64>/<token>/', PasswordResetConfirmView.as_view(),
         name='password_reset_confirm'),


]
urlpatterns += staticfiles_urlpatterns()
urlpatterns += static(
    settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
# urlpatterns += static(settings.MEDIA_URL,
#                       document_root=settings.MEDIA_ROOT)
