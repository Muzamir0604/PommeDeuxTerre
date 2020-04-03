from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token


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


# class UserReviewSerializer(serializers.ModelSerializer):
#     user_reviews = LimitedReviewSerializer(many=True, read_only=True)

#     class Meta:
#         model = User
#         fields = ['id', 'username', 'first_name', 'last_name', 'user_reviews']
