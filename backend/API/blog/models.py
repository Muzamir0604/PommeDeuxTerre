from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.
class Post(models.Model):
    title = models.CharField(max_length=32)
    description = models.TextField(max_length=360)

    def no_of_reviews(self):
        reviews =  Review.objects.filter(post=self)
        return len(reviews)

    def avg_rating(self):
        sum=0
        reviews = Review.objects.filter(post=self)
        for review in reviews:
            sum += review.stars
        if len(reviews)>0:
            return sum/len(reviews)
        else:
            return 0



class Review(models.Model):
    post = models.ForeignKey(Post, on_delete = models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    stars = models.IntegerField(validators=[MinValueValidator(1),MaxValueValidator(5)])
    title = models.CharField(max_length=32, null=True)
    description =models.TextField(max_length=360, null=True)

    class Meta:
        unique_together = (('user', 'post'),)
        index_together = (('user', 'post'),)