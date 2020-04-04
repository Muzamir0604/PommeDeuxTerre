from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from blog.serializers import ReviewSerializer


class UserListSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # creates token everytime user created
        token = Token.objects.create(user=user)
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password',
                  'first_name', 'last_name', 'email')
        extra_kwargs = {'password': {'write_only': True, 'required': True}}


class UserBlogDetailSerializer(serializers.ModelSerializer):
    user_reviews = ReviewSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'user_reviews')
        # extra_kwargs = {'password': {'write_only': True, 'required': True}}
