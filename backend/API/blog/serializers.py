from rest_framework import serializers
from .models import Post, Review
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # some of these fields are functions in model
        fields= ('id','username','password')
        # making password write only, cannot be read
        extra_kwargs = {'password':{'write_only':True,'required':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # creates token everytime user created
        token = Token.objects.create(user=user)
        return user

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        # some of these fields are functions in model
        fields= ('id','title','description','no_of_reviews', 'avg_rating')

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields= ('id','stars','user','post', 'title', 'description')
