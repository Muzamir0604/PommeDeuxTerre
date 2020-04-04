from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


class Category(models.Model):
    title = models.CharField(max_length=32, default="others")
    description = models.TextField(max_length=360, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    def __str__(self):
        return self.title


class Post(models.Model):
    title = models.CharField(max_length=32, default="title")
    description = models.TextField(max_length=360, default="description")
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    category = models.ForeignKey(
        Category, related_name="category_posts", on_delete=models.CASCADE, null=True)
    user = models.ForeignKey(
        User, related_name="user_posts", on_delete=models.CASCADE, null=True)

    def no_of_reviews(self):
        reviews = Review.objects.filter(post=self)
        return len(reviews)

    def avg_rating(self):
        sum = 0
        reviews = Review.objects.filter(post=self)
        for review in reviews:
            sum += review.stars
        if len(reviews) > 0:
            return sum/len(reviews)
        else:
            return 0

    def __str__(self):
        return self.title


class Review(models.Model):
    post = models.ForeignKey(
        Post, related_name="post_reviews", on_delete=models.CASCADE)
    user = models.ForeignKey(
        User, related_name="user_reviews", on_delete=models.CASCADE)
    stars = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)])
    title = models.CharField(max_length=32, null=True)
    description = models.TextField(max_length=360, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)

    class Meta:
        unique_together = (('user', 'post'),)
        index_together = (('user', 'post'),)

    def __str__(self):
        return "%s: %s - %s" % (self.post, self.title, self.user)
