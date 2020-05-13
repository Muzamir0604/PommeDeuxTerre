import tempfile
from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.urls import reverse
from django.db import transaction

from PIL import Image
from core.models import Post, Category, PostImage

POST_URL = reverse('post-list')


def post_detail_url(post_id):
    return reverse('post-detail', args=(post_id,))


def sample_post_image(post_id, image):
    return PostImage.objects.create(post_id=post_id, image=image)


class PublicPostApiTests(APITestCase):
    """Test unauthenticated Post API access"""
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
            stars=4, title="great title", description="nice description",
            user=self.user)
        with tempfile.NamedTemporaryFile(suffix='.jpg') as ntf:
            img = Image.new('RGB', (10, 10))
            img.save(ntf, format='JPEG')
            ntf.seek(0)
            self.post.post_images.add(
                sample_post_image(post_id=self.post,
                                  image=ContentFile(ntf.read())
                                  )
                              )
        self.post.post_recipes.create(
            name="new recipe", prep_time=10, cook_time=10, servings=10)

    def tearDown(self):
        self.post.post_images.all().delete()

    def test_read_posts_published(self):
        """ Test reading posts"""
        url = POST_URL
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.count(), 1)

    def test_read_posts_unpublished(self):
        """ Test reading unpublished post returns empty"""
        self.category.category_posts.add(
            Post.objects.create(
                                title="The curry post",
                                description="post-description",
                                user=self.user,
                                is_published=False,
                                category=self.category)
                                )
        url = POST_URL
        response = self.client.get(url, format='json')
        self.assertEqual(len(response.data), 1)


class PrivatePostApiTests(APITestCase):
    """Test authenticated Post API access"""

    def setUp(self):
        self.user = get_user_model().objects.create(email="bob@hotmail.com",
                                                    password="12345",
                                                    name="Bob")
        self.client.force_authenticate(user=self.user)

        self.category = Category.objects.create(
            title="TestCat", description="TestDescription")
        self.category.category_posts.create(
            title="post-title", description="post-description",
            user=self.user, is_published=True)
        self.post = Post.objects.get(category=self.category)
        self.post.post_reviews.create(
            stars=4, title="great title", description="nice description",
            user=self.user)
        with tempfile.NamedTemporaryFile(suffix='.jpg') as ntf:
            img = Image.new('RGB', (10, 10))
            img.save(ntf, format='JPEG')
            ntf.seek(0)
            self.post.post_images.add(
                sample_post_image(post_id=self.post,
                                  image=ContentFile(ntf.read())
                                  )
                              )
        self.post.post_recipes.create(
            name="new recipe", prep_time=10, cook_time=10, servings=10)

    def tearDown(self):
        self.post.post_images.all().delete()

    def test_create_posts(self):
        """Test create posts"""
        url = POST_URL
        payload = {
            "title": "best day ever",
            "description": "Best desc ever",
            "category": self.category.id,
            "is_published": False
        }
        with transaction.atomic():
            res = self.client.post(url, payload)
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)

    def test_delete_posts(self):
        """Test deleting post """

        self.assertEqual(Post.objects.count(), 1)
        url = post_detail_url(self.post.id)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Post.objects.count(), 0)

    def test_partial_update_posts(self):
        """Test partial updating posts """
        url = post_detail_url(self.post.id)
        payload = {
            "title": "post-changed-title",
            "description": "post-description",
        }
        res = self.client.patch(url, payload)
        self.post.refresh_from_db()
        self.assertEqual(self.post.title, payload['title'])
        self.assertEqual(self.post.is_published, True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_update_posts(self):
        """Test updating posts"""
        url = post_detail_url(self.post.id)
        category = Category.objects.create(title="NewCat")
        payload = {
            "title": "post_full_title",
            "description": "post-124",
            "category": category.id,
            "is_published": False
        }
        res = self.client.put(url, payload)
        self.post.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(self.post.title, payload['title'])
        self.assertEqual(self.post.description, payload['description'])
        self.assertEqual(self.post.category.id, payload['category'])
        self.assertEqual(self.post.is_published, payload['is_published'])
