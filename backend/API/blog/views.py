from django.shortcuts import render
from rest_framework import viewsets, status, generics
from rest_framework.decorators import action
from .models import Post, Review, Category
from .serializers import PostSerializer, ReviewSerializer, CategorySerializer
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from django_filters import rest_framework as filters


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']

    @action(detail=True, methods=['GET'])
    def reviews(self, request, pk=None):
        user = request.user
        post = Post.objects.get(id=pk)
        try:
            reviews = Review.objects.filter(post=post.id)
            serializer = ReviewSerializer(reviews, many=True)
            response = {'result': serializer.data}
            return Response(response, status=status.HTTP_200_OK)
        except ValueError:
            response = {'message': "Error in retrieving Reviews"}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['POST'])
    def review_post(self, request, pk=None):
        if 'stars' in request.data:
            post = Post.objects.get(id=pk)
            stars = request.data['stars']
            user = request.user
            try:
                review = Review.objects.get(user=user.id, post=post.id)
                review.stars = stars
                review.save()
                serializer = ReviewSerializer(review, many=False)
                response = {'message': 'Review updated',
                            'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)
            except:
                review = Review.objects.create(
                    user=user, post=post, stars=stars)
                serializer = ReviewSerializer(review, many=False)
                response = {'message': 'Review created',
                            'result': serializer.data}
                return Response(response, status=status.HTTP_200_OK)

        else:
            response = {'message': 'You need to provide stars'}
            return Response(response, status=status.HTTP_400_BAD_REQUEST)


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['post']

    # to overwrite the create and update function of viewset hence restricting use

    def update(self, request, *args, **kwargs):
        response = {'message': 'you can\'t update like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        response = {'message': 'you can\'t create like that'}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
