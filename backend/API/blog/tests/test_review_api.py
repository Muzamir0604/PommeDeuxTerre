from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model
from django.urls import reverse
from core.models import Review, Post


REVIEW_URL = reverse('review-list')


def review_detail_url(review_id):
    return reverse('review-detail', args=(review_id,))


class PublicReviewApiTests(APITestCase):
    """Test unauthenticated user API access"""
    def setUp(self):
        self.user = get_user_model().objects.create(email="bob@hotmail.com",
                                                    password="12345",
                                                    name="Bob")
        self.post = Post.objects.create(
            title="post-title",
            description="post-description",
            user=self.user)
        self.review = Review.objects.create(
            post_id=self.post.id,
            stars=4, title="great title",
            description="nice description", user=self.user)

    def test_auth_required_for_detail(self):
        """Test that authentication is required for review detail"""
        res = self.client.get(review_detail_url(self.review.id))

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_auth_required(self):
        """Test that authentication is required"""
        res = self.client.get(REVIEW_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateReviewApiTests(APITestCase):
    """Test authenticated user API access"""
    def setUp(self):
        self.user = get_user_model().objects.create(email="bob@hotmail.com",
                                                    password="12345",
                                                    name="Bob")
        self.client.force_authenticate(user=self.user)
        self.post = Post.objects.create(
            title="post-title",
            description="post-description",
            user=self.user)
        self.review = Review.objects.create(
            post_id=self.post.id,
            stars=4, title="great title",
            description="nice description", user=self.user)

    def test_read_review(self):
        """Test List reviews"""
        url = REVIEW_URL
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(Review.objects.count(), 1)
        self.assertEqual(Review.objects.get(user=self.user).title,
                         "great title")

    def test_delete_review(self):
        """Test delete review"""
        url = review_detail_url(self.review.id)
        self.assertEqual(Review.objects.count(), self.review.id)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Review.objects.count(), 0)
