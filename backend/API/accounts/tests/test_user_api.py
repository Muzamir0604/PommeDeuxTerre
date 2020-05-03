from rest_framework import status
from rest_framework.test import APITestCase

from django.contrib.auth.models import User
from django.urls import reverse


USER_URL = reverse('user-list')


def user_detail_url(user_id):
    return reverse('user-detail', args=(user_id,))


class PublicUserApiTests(APITestCase):
    """ Test unauthenticated user API access"""
    def setUp(self):
        self.user = User.objects.create(username="Bob",
                                        password="12345")

    def test_create_user(self):
        """Testing create user"""
        url = USER_URL
        data = {"username": "Muzamir", "password": "Password123"}

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(User.objects.count(), 2)

    def test_create_duplicate_user(self):
        """Testing for duplicate user"""
        url = USER_URL
        data = {"username": "Bob", "password": "Password123"}

        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_read_user(self):
        """Test read list of users"""

        url = USER_URL

        response = self.client.get(url, format='json')

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(response.json()[0]['username'], "Bob")
        self.assertEqual(response.json()[0]['id'], 1)

    def test_auth_required_for_detail(self):
        """Test that authentication is required"""
        res = self.client.get(user_detail_url(self.user.id))

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserApiTests(APITestCase):
    """Testing authenticated user API access"""
    def setUp(self):
        self.user = User.objects.create(username="Bob",
                                        password="12345")
        self.client.force_authenticate(self.user)

    def test_update_user(self):
        """ Test update user """
        url = user_detail_url(self.user.id)

        self.assertEqual(User.objects.count(), 1)

        res = self.client.put(url, {"email": "muzamir@gmail.com"})

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(User.objects.get(
            username="Bob").email, "muzamir@gmail.com")

    def test_delete_user(self):
        """Testing delete user """
        url = user_detail_url(self.user.id)
        self.assertEqual(User.objects.count(), 1)

        res = self.client.delete(url)

        self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(User.objects.count(), 0)
