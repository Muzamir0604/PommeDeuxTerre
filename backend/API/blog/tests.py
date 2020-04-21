from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.contrib.auth.models import User
from rest_framework.test import APIRequestFactory
from rest_framework.test import force_authenticate
from accounts.views import UserDetail


# List of urls
# posts-list
# posts-detail
# reviews-list
# reviews-detail
# categories-list
# categories-detail
# upload-image

# Completed!
# user-list
# user-detail
# user-full-detail


class UserTests(APITestCase):
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
