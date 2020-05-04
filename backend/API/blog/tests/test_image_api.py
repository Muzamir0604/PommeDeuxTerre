import tempfile

from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth import get_user_model
from django.core.files.base import ContentFile
from django.urls import reverse

from PIL import Image

from core.models import Post, Category, PostImage
# Remember to change SEtting TESTING = TRUE

IMAGE_URL = reverse('upload-image')


def sample_post_image(post_id, image):
    return PostImage.objects.create(post_id=post_id, image=image)


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

    def tearDown(self):
        self.post.post_images.all().delete()

    def test_create_image(self):
        with tempfile.NamedTemporaryFile(suffix='.jpg') as ntf:
            img = Image.new('RGB', (10, 10))
            img.save(ntf, format='JPEG')
            ntf.seek(0)

            data = {"post_id": self.post.id,
                    "image": ntf}
            url = IMAGE_URL
            res = self.client.post(url, data)

        self.post.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PostImage.objects.count(), 1)

    def test_get_image(self):
        with tempfile.NamedTemporaryFile(suffix='.jpg') as ntf:
            img = Image.new('RGB', (10, 10))
            img.save(ntf, format='JPEG')
            ntf.seek(0)
            self.post.post_images.add(
                sample_post_image(post_id=self.post,
                                  image=ContentFile(ntf.read())
                                  )
                              )
            url = IMAGE_URL
            res = self.client.get(url)
        self.post.refresh_from_db()
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(PostImage.objects.count(), 1)
