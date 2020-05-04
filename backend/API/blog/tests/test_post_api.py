import tempfile
from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.urls import reverse

from io import BytesIO
from PIL import Image

from core.models import Post, Category, PostImage

POST_URL = reverse('post-list')


def post_detail_url(post_id):
    return reverse('post-detail', args=(post_id,))


def sample_post_image(post_id, image):
    return PostImage.objects.create(post_id=post_id, image=image)


class PublicPostApiTests(APITestCase):
    """Test unauthenticated Post API access"""

    @staticmethod
    def get_image_file(name, ext='png', size=(50, 50), color=(256, 0, 0)):
        file_obj = BytesIO()
        image = Image.new("RGBA", size=size, color=color)
        image.save(file_obj, ext)
        file_obj.seek(0)
        return ContentFile(file_obj.read(), name=name)

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
        # self.post.post_images.create(
        #     image=self.get_image_file('image.png'))
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

    def test_read_posts(self):
        """ Test reading posts"""
        url = POST_URL
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.count(), 1)


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
        # self.post.post_images.create(
        #     image=self.get_image_file('image.png'))
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

    @staticmethod
    def get_image_file(name, ext='png', size=(50, 50), color=(256, 0, 0)):
        file_obj = BytesIO()
        image = Image.new("RGBA", size=size, color=color)
        image.save(file_obj, ext)
        file_obj.seek(0)
        return ContentFile(file_obj.read(), name=name)

    # TODO: Create POST
    def test_delete_posts(self):
        """Test deleting post """

        self.assertEqual(Post.objects.count(), 1)
        url = post_detail_url(self.post.id)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Post.objects.count(), 0)

    def test_update_posts(self):
        """Test updating posts """
        url = post_detail_url(self.post.id)
        res = self.client.patch(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.count(), 1)
