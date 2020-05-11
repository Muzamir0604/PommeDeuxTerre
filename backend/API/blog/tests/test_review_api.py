from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from core.models import Review, Post, Category


REVIEW_URL = reverse('review-list')


def review_detail_url(review_id):
    return reverse('review-detail', args=(review_id,))


def post_review_url(post_id):
    return reverse('post-detail', args=(post_id,)) + "review_post/"


def update_review_url(post_id):
    return reverse('post-detail', args=(post_id,)) + "review_update/"


def sample_user(email="bob@hotmail.com", password="12345", name="Bob"):
    return get_user_model().objects.create(email=email,
                                           password=password,
                                           name=name)


class PublicReviewApiTests(APITestCase):
    """Test unauthenticated user API access"""
    def setUp(self):
        self.user = sample_user()
        self.category = Category.objects.create(
            title="TestCat", description="TestDescription")
        self.post = Post.objects.create(
            title="post-title",
            description="post-description",
            user=self.user,
            category=self.category)
        self.review = Review.objects.create(
            post_id=self.post.id,
            stars=4, title="great title",
            description="nice description", user=self.user)

    def test_auth_required_for_detail(self):
        """Test that authentication is required for review detail"""
        res = self.client.get(review_detail_url(self.review.id))

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_read_review(self):
        """Test List reviews"""
        url = REVIEW_URL
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(Review.objects.count(), 1)
        self.assertEqual(Review.objects.get(user=self.user).title,
                         "great title")

    def test_no_access_create(self):
        """ Test Create No Access """
        url = post_review_url(self.post.id)
        user2 = sample_user(email="haryanto@hotmail.com",
                            password="1234561",
                            name="Muzamir")
        payload = {
            "title": "Great stuff",
            "description": "Thank you for sharing",
            "stars": 4,
            "post_id": self.post,
            "user": user2
        }
        res = self.client.post(url, payload)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_no_access_update(self):
        """ Test update review under Post"""
        url = update_review_url(self.post.id)
        payload = {
            "title": "Great stuff",
            "description": "Thank you for sharing",
            "stars": 4,
            "post_id": self.post,
            "user": self.user
        }
        res = self.client.put(url, payload)
        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateReviewApiTests(APITestCase):
    """Test authenticated user API access"""
    def setUp(self):
        self.user = sample_user()
        self.client.force_authenticate(user=self.user)
        self.category = Category.objects.create(
            title="TestCat", description="TestDescription")
        self.post = Post.objects.create(
            title="post-title",
            description="post-description",
            user=self.user,
            category=self.category)
        self.review = Review.objects.create(
            post_id=self.post.id,
            stars=4, title="great title",
            description="nice description", user=self.user)

    def test_create_review(self):
        """ Test Create Review under a Post """
        url = post_review_url(self.post.id)
        user2 = sample_user(email="haryanto@hotmail.com",
                            password="1234561",
                            name="Muzamir")
        self.client.force_authenticate(user=user2)
        payload = {
            "title": "Great stuff",
            "description": "Thank you for sharing",
            "stars": 4,
            "post_id": self.post,
            "user": user2
        }
        res = self.client.post(url, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data['message'], "Review created")

    def test_update_review(self):
        """ Test update review under Post"""
        url = update_review_url(self.post.id)
        payload = {
            "title": "Great stuff",
            "description": "Thank you for sharing",
            "stars": 4,
            "post_id": self.post,
            "user": self.user
        }
        res = self.client.put(url, payload)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_delete_review(self):
        """Test delete review"""
        url = review_detail_url(self.review.id)
        self.assertEqual(Review.objects.count(), self.review.id)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Review.objects.count(), 0)
