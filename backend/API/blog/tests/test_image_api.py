from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.urls import reverse

from io import BytesIO
from PIL import Image

from blog.models import Post, Category, PostImage
# Remember to change SEtting TESTING = TRUE

IMAGE_URL = reverse('upload-image')


class PrivateImageApiTests(APITestCase):
    """Test Authenticated Image API Access"""
    def setUp(self):
        self.user = get_user_model().objects.create(email="bob@hotmail.com",
                                                    password="12345",
                                                    name="Bob")
        self.client.force_authenticate(user=self.user)
        self.category = Category.objects.create(
            title="TestCat", description="TestDescription")
        self.post = Post.objects.create(
            title="post-title", description="post-description",
            category=self.category, is_published=True)

    @staticmethod
    def get_image_file(name, ext='png', size=(50, 50), color=(256, 0, 0)):
        file_obj = BytesIO()
        image = Image.new("RGBA", size=size, color=color)
        image.save(file_obj, ext)
        file_obj.seek(0)
        return ContentFile(file_obj.read(), name=name)

    def test_create_image(self):
        data = {"post_id": self.post.id,
                "image": self.get_image_file('image.png')}
        url = IMAGE_URL
        res = self.client.post(url, data)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PostImage.objects.count(), 1)

    def test_get_image(self):
        PostImage.objects.create(
            post_id=self.post, image=self.get_image_file('image.png'))

        url = IMAGE_URL
        res = self.client.get(url)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(PostImage.objects.count(), 1)
