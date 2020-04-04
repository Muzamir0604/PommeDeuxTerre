from rest_framework import generics, views, status
from .serializers import UserListSerializer, UserSerializer, UserBlogDetailSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    permission_classes = (AllowAny,)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def update(self, request, *args, **kwargs):
        partial = True  # Here I change partial to True
        instance = self.get_object()
        serializer = self.get_serializer(
            instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)


class UserFullDetail(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserBlogDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


# TODO: Create a query to list out all posts and reviews by user. Minimized detail of post and review
