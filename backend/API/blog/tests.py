from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from accounts.views import UserDetail
from .views import ReviewAPIViewSet
from .models import Review, Post, Category
from rest_framework.authtoken.models import Token

# List of urls
# posts-list
# posts-detail


# upload-image


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
        # print(response.json()[0]['username'])
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
        # attempted trailing slash =False
        # checked the url
        # works on Postman
        # CORS origin allow - included localhost address
        # header returns:  {'content-type': ('Content-Type', 'text/html; charset=utf-8'), 'vary': ('Vary', 'Accept'), 'allow': ('Allow', 'GET, HEAD, OPTIONS')}

        # FIXME: figure out the issue with delete works on PostMan
        """"
        we can delete review
        """
        # factory = APIRequestFactory()
        # User.objects.create(username="Bob", password="12345")
        # user = User.objects.get(username="Bob")

        # post = Post.objects.create(
        #     title="post-title", description="post-description", user=user)
        # review = Review.objects.create(post_id=post.id,
        #                                stars=4, title="great title", description="nice description", user=user)
        # view = ReviewAPIViewSet.as_view({'get': 'destroy'})

        # self.assertEqual(Review.objects.count(), 1)

        # url = reverse('review-detail', args=(review.id,))

        # request = factory.delete(url)
        # force_authenticate(request, user=user)
        # print(url)
        # print(request)

        # response = view(request, pk=review.id)
        # print(response._headers)
        # self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        # self.assertEqual(Review.objects.count(), 0)
        # self.assertEqual(Review.objects.get(user=user).title, "great title")


class CategoryTests(APITestCase):
    """
    run CRUD on Category without Authentication
    url name:
    categories-list
    categories-detail
    """

    def setUp(self):
        user = User.objects.create(username="Bob", password="12345")
        category = Category.objects.create(
            title="TestCat", description="TestDescription")
        post = Post.objects.create(
            title="post-title", description="post-description", user=user, category=category)
        review = Review.objects.create(post_id=post.id,
                                       stars=4, title="great title", description="nice description", user=user)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Category.objects.count(), 1)
        self.assertEqual(Post.objects.count(), 1)
        self.assertEqual(Review.objects.count(), 1)

    def test_read_category(self):
        # FIXME: ensure Read category with post and review attached

        factory = APIRequestFactory()
        url = reverse('category-list')
        response = self.client.get(url, format='json')
        # print(response.json()[0])

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(Category.objects.count(), 1)
        # self.assertEqual(response.json()[0]['category_posts'], "Bob")
        # self.assertEqual(response.json()[0]['id'], 1)

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
