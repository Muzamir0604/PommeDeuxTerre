from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth import get_user_model
from core.models import Category, Post, Review
from django.urls import reverse


CATEGORY_URL = reverse('category-list')


def category_detail_url(category_id):
    return reverse('category-detail', args=(category_id,))


def category_query_id(category_id):
    return CATEGORY_URL + '?category='+str(category_id)


class PublicCategoryApiTests(APITestCase):
    """Test unauthenticated user API access"""

    def setUp(self):
        self.user = get_user_model().objects.create(email="bob@hotmail.com",
                                                    password="12345",
                                                    name="Bob")
        self.category = Category.objects.create(
            title="TestCat", description="TestDescription")

        self.category.category_posts.create(
            title="post-title", description="post-description",
            user=self.user, is_published=True)
        self.post = Post.objects.get(category=self.category)
        self.post.post_reviews.create(
            stars=4,
            title="great title",
            description="nice description",
            user=self.user
            )

        self.assertEqual(get_user_model().objects.count(), 1)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Review.objects.count(), 1)

    def test_read_category(self):
        """Testing list categories """
        url = CATEGORY_URL
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(len(response.json()[0]['category_posts']), 1)
        self.assertEqual(
            response.json()[0]['category_posts'][0]['no_of_reviews'], 1)

    # TODO: read category by id
    def test_read_category_id(self):
        """ Test category query by id"""
        url = CATEGORY_URL
        url += '?category='+str(self.category.id)
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.json()[0]['category_posts']), 1)

    # TODO: Move create, delete and update to authenticated staff user only

    def test_create_category(self):
        """Test create Category"""
        url = CATEGORY_URL
        response = self.client.post(
            url, {"title": "cat-title", "description": "cat-desc"},
            format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 2)

    def test_delete_category(self):
        """ Test delete category"""
        url = category_detail_url(self.category.id)
        response = self.client.delete(
            url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Category.objects.count(), 0)

    def test_update_category(self):
        """ Test update category"""
        url = category_detail_url(self.category.id)
        response = self.client.put(
            url, {"title": "Food", "description": "yummy"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=1).title, "Food")
