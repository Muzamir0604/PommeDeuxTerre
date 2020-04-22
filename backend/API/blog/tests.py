from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from accounts.views import UserDetail
from .views import ReviewAPIViewSet, PostViewSet, ImageUploadView
from .models import Review, Post, Category, PostImage
from rest_framework.authtoken.models import Token
from io import BytesIO
from PIL import Image
from django.core.files.base import ContentFile
# Remember to change SEtting TESTING = TRUE


class UserTests(APITestCase):
    """
    run CRUD on USER with Authentication
    url name:
    user-list
    user-detail
    user-full-detail
    """

    def test_empty_user(self):
        """
        we can read empty
        """
        url = reverse('user-list')

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 0)

    def test_create_user(self):
        """
        We can create user
        """
        url = reverse('user-list')
        data = {"username": "Bob", "password": "12345"}

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 1)

    def test_read_user(self):
        """
        We can read list of users
        only username and id
        """
        factory = APIRequestFactory()
        User.objects.create(username="Bob", password="12345")
        url = reverse('user-list')
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(response.json()[0]['username'], "Bob")
        self.assertEqual(response.json()[0]['id'], 1)

    def test_update_user(self):
        """
        we can update user
        """
        factory = APIRequestFactory()
        User.objects.create(username="Bob", password="12345")
        user = User.objects.get(username="Bob")
        view = UserDetail.as_view()
        url = reverse('user-detail', args=(user.id,))

        self.assertEqual(User.objects.count(), 1)

        request = factory.put(url, {"email": "muzamir@gmail.com"})
        force_authenticate(request, user=user)
        response = view(request, pk=user.id)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get(
            username="Bob").email, "muzamir@gmail.com")

    def test_delete_user(self):
        """
        We can delete user
        """
        factory = APIRequestFactory()
        User.objects.create(username="Bob", password="12345")
        user = User.objects.get(username="Bob")
        view = UserDetail.as_view()
        url = reverse('user-detail', args=(user.id,))

        self.assertEqual(User.objects.count(), 1)

        request = factory.delete(url)
        force_authenticate(request, user=user)
        response = view(request, pk=user.id)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 0)


class ReviewTests(APITestCase):
    """
    Only read and delete
    url name:
    reviews-list
    reviews-detail
    """

    def test_read_review(self):
        """"
        we can read review
        """
        factory = APIRequestFactory()
        User.objects.create(username="Bob", password="12345")
        user = User.objects.get(username="Bob")
        post = Post.objects.create(
            title="post-title", description="post-description", user=user)
        review = Review.objects.create(post_id=post.id,
                                       stars=4, title="great title", description="nice description", user=user)
        view = ReviewAPIViewSet.as_view({'get': 'list'})
        url = reverse('review-list')
        request = factory.get(url)
        force_authenticate(request, user=user)

        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Review.objects.count(), 1)
        self.assertEqual(Review.objects.get(user=user).title, "great title")

    def test_delete_review(self):
        """"
        we can delete review
        """
        factory = APIRequestFactory()
        User.objects.create(username="Bob", password="12345")
        user = User.objects.get(username="Bob")
        token = Token.objects.create(user=user)
        post = Post.objects.create(
            title="post-title", description="post-description", user=user, is_published=True)
        review = Review.objects.create(post_id=post.id,
                                       stars=4, title="great title", description="nice description", user=user)

        view = ReviewAPIViewSet.as_view({'delete': 'destroy'})
        # 'get': 'list',
        # 'post': 'create',
        # 'delete': 'destroy',
        # 'put': 'update',
        # 'patch': 'partial_update',

        url = reverse('review-detail', args=(review.id,))

        self.assertEqual(Review.objects.count(), review.id)

        request = factory.delete(url)
        force_authenticate(request, user=user, token=token)
        response = view(request, pk=review.id)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Review.objects.count(), 0)


class CategoryTests(APITestCase):
    """
    run CRUD on Category without Authentication
    url name:
    categories-list
    categories-detail
    """

    def setUp(self):
        self.user = User.objects.create(username="Bob", password="12345")
        self.category = Category.objects.create(
            title="TestCat", description="TestDescription")

        self.category.category_posts.create(
            title="post-title", description="post-description",
            user=self.user, is_published=True)
        self.post = Post.objects.get(category=self.category)
        self.post.post_reviews.create(
            stars=4, title="great title", description="nice description", user=self.user)

        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Review.objects.count(), 1)

    def test_read_category(self):

        factory = APIRequestFactory()
        url = reverse('category-list')
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(len(response.json()[0]['category_posts']), 1)
        self.assertEqual(
            response.json()[0]['category_posts'][0]['no_of_reviews'], 1)

    def test_create_category(self):
        factory = APIRequestFactory()
        url = reverse('category-list')
        response = self.client.post(
            url, {"title": "cat-title", "description": "cat-desc"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Category.objects.count(), 2)

    def test_delete_category(self):
        factory = APIRequestFactory()
        url = reverse('category-detail', args=(1,))
        response = self.client.delete(
            url, format='json')

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Category.objects.count(), 0)

    def test_update_category(self):
        factory = APIRequestFactory()
        url = reverse('category-detail', args=(1,))
        response = self.client.put(
            url, {"title": "Food", "description": "yummy"}, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Category.objects.get(id=1).title, "Food")


class PostTests(APITestCase):
    """
    run CRUD and actions
    posts-list
    posts-detail
    """
    @staticmethod
    def get_image_file(name, ext='png', size=(50, 50), color=(256, 0, 0)):
        file_obj = BytesIO()
        image = Image.new("RGBA", size=size, color=color)
        image.save(file_obj, ext)
        file_obj.seek(0)
        return ContentFile(file_obj.read(), name=name)
    # FIXME: figure out how to test images and recipes
    # def test_create_posts(self):
    #     user = User.objects.create(username="Bob", password="12345")
    #     category = Category.objects.create(
    #         title="TestCat", description="TestDescription")
    #     factory = APIRequestFactory()
    #     url = reverse('post-list')
    #     data = {"title": "Post-Title", "description": "Post-Description",
    #             "user": user.id, "category": category.id}
    #     response = self.client.post(
    #         url, data, format='json')
    #     self.assertEqual(response.status_code, status.HTTP_201_CREATED)
    #     self.assertEqual(Post.objects.count(), 1)

    def test_read_posts(self):
        user = User.objects.create(username="Bob", password="12345")
        category = Category.objects.create(
            title="TestCat", description="TestDescription")
        post = Post.objects.create(
            title="post-title", description="post-description", user=user, category=category, is_published=True)
        factory = APIRequestFactory()
        url = reverse('post-list')
        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Post.objects.count(), 1)

    def test_delete_posts(self):

        user = User.objects.create(username="Bob", password="12345")
        token = Token.objects.create(user=user)
        category = Category.objects.create(
            title="TestCat", description="TestDescription")
        post = Post.objects.create(
            title="post-title", description="post-description", category=category, is_published=True)
        # never forget is_published =True because it is filtered
        self.assertEqual(Post.objects.count(), 1)

        view = PostViewSet.as_view({'delete': 'destroy'})

        factory = APIRequestFactory()
        url = reverse('post-detail', args=(post.id,))

        request = factory.delete(url)
        force_authenticate(request, user=user, token=token)
        response = view(request, pk=post.id)

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Post.objects.count(), 0)

    # def test_update_posts(self):
        # FIXME: figure out how to test images and recipes
        # user = User.objects.create(username="Bob", password="12345")
        # token = Token.objects.create(user=user)
        # category = Category.objects.create(
        #     title="TestCat", description="TestDescription")
        # post = Post.objects.create(
        #     title="post-title", description="post-description", user=user, category=category, is_published=True)
        # self.assertEqual(Post.objects.count(), 1)
        # view = PostViewSet.as_view({'put': 'update'})

        # factory = APIRequestFactory()
        # data = {"title": "changed-title", "description": "changed-description"}
        # url = reverse('post-detail', args=(post.id,))

        # request = factory.put(url)
        # force_authenticate(request, user=user, token=token)
        # response = view(request, pk=post.id)

        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertEqual(Post.objects.count(), 0)


class ImageTests(APITestCase):
    """
    POST and GET
    upload-image
    """

    @staticmethod
    def get_image_file(name, ext='png', size=(50, 50), color=(256, 0, 0)):
        # FIXME: delete actual images upon teardown
        file_obj = BytesIO()
        image = Image.new("RGBA", size=size, color=color)
        image.save(file_obj, ext)
        file_obj.seek(0)
        return ContentFile(file_obj.read(), name=name)

    def test_create_image(self):
        user = User.objects.create(username="Bob", password="12345")
        token = Token.objects.create(user=user)
        category = Category.objects.create(
            title="TestCat", description="TestDescription")
        post = Post.objects.create(
            title="post-title", description="post-description", category=category, is_published=True)

        view = ImageUploadView.as_view()

        data = {"post_id": post.id, "image": self.get_image_file('image.png')}
        factory = APIRequestFactory()
        url = reverse('upload-image')
        request = factory.post(url, data)
        force_authenticate(request, user=user, token=token)
        response = view(request, pk=post.id)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PostImage.objects.count(), 1)

    def test_get_image(self):
        user = User.objects.create(username="Bob", password="12345")
        token = Token.objects.create(user=user)
        category = Category.objects.create(
            title="TestCat", description="TestDescription")
        post = Post.objects.create(
            title="post-title", description="post-description", category=category, is_published=True)
        image = PostImage.objects.create(
            post_id=post, image=self.get_image_file('image.png'))
        view = ImageUploadView.as_view()
        factory = APIRequestFactory()
        url = reverse('upload-image')
        request = factory.get(url)
        force_authenticate(request, user=user, token=token)
        response = view(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(PostImage.objects.count(), 1)
