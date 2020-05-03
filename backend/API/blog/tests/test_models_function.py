from django.test import TestCase
from django.contrib.auth import get_user_model
from blog import models
from django.db import IntegrityError


def sample_post(category, user, is_published, title="The curry recipe",
                description="your fav indian dish"):
    return models.Post.objects.create(title=title, description=description,
                                      category=category, user=user)


def sample_recipe(post, name="Fish curry",
                  prep_time=10,
                  cook_time=30,
                  servings=2):
    return models.Recipe.objects.create(name=name,
                                        prep_time=prep_time,
                                        cook_time=cook_time,
                                        servings=servings,
                                        post=post)


def sample_review(post, user,
                  stars=4,
                  title="Unique",
                  description="Excellent work"):
    return models.Review.objects.create(post=post, user=user,
                                        stars=4,
                                        title="Unique",
                                        description="Excellent work")


class PostModelFunctionTest(TestCase):
    """Test Post model functions"""
    def setUp(self):
        self.user = get_user_model().objects.create(email="bob@hotmail.com",
                                                    password="password213",
                                                    name="Bob")
        self.category = models.Category.objects.create(
            title="Foodie"
        )

    def test_post_no_of_recipes_published(self):
        """Test Published Post no of recipes"""
        self.post = sample_post(self.category, self.user, True)
        self.post.post_recipes.add(sample_recipe(self.post))

        self.assertEqual(self.post.no_of_recipes(), 1)

    def test_post_no_of_reviews_published(self):
        self.post = sample_post(self.category, self.user, True)
        self.review = sample_review(
            post=self.post,
            user=self.user
        )
        self.post.post_reviews.add(self.review)

        self.assertEqual(self.post.no_of_reviews(), 1)

    def test_post_avg_rating_published(self):
        self.post = sample_post(self.category, self.user, True)
        user2 = get_user_model().objects.create(email="bob2@hotmail.com",
                                                password="testing123",
                                                name="Bob2")
        self.post.post_reviews.add(
            sample_review(
                post=self.post,
                user=self.user,
                stars=3))
        self.post.post_reviews.add(
            sample_review(
                post=self.post,
                user=user2,
                stars=5))

        self.assertEqual(self.post.avg_rating(), 4)


class ReviewModelFunctionTest(TestCase):
    """Test Review Model function and features"""
    def setUp(self):
        self.user = get_user_model().objects.create(email="bob@hotmail.com",
                                                    password="password213",
                                                    name="Bob")
        self.category = models.Category.objects.create(
            title="Foodie"
        )

    def test_review_unique_user_post(self):
        """Test unique user post on review"""
        self.post = sample_post(self.category, self.user, True)
        self.post.post_reviews.add(
            sample_review(
                post=self.post,
                user=self.user,
                stars=3))
        message = "No IntegrityError"
        try:
            self.post.post_reviews.add(
                sample_review(
                    post=self.post,
                    user=self.user,
                    stars=5))
        except IntegrityError:
            message = "Integrity Error"
        self.assertEqual(message, "Integrity Error")
