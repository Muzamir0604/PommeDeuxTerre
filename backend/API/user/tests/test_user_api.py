# from rest_framework import status
# from rest_framework.test import APITestCase

# from django.contrib.auth.models import User
# from django.urls import reverse


# USER_URL = reverse('user-list')


# def user_detail_url(user_id):
#     return reverse('user-detail', args=(user_id,))


# class PublicUserApiTests(APITestCase):
#     """ Test unauthenticated user API access"""
#     def setUp(self):
#         self.user = User.objects.create(username="Bob",
#                                         password="12345")

#     def test_create_user(self):
#         """Testing create user"""
#         url = USER_URL
#         data = {"username": "Muzamir", "password": "Password123"}

#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(User.objects.count(), 2)

#     def test_create_duplicate_user(self):
#         """Testing for duplicate user"""
#         url = USER_URL
#         data = {"username": "Bob", "password": "Password123"}

#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

#     def test_read_user(self):
#         """Test read list of users"""

#         url = USER_URL

#         response = self.client.get(url, format='json')

#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(User.objects.count(), 1)
#         self.assertEqual(response.json()[0]['username'], "Bob")
#         self.assertEqual(response.json()[0]['id'], 1)

#     def test_auth_required_for_detail(self):
#         """Test that authentication is required"""
#         res = self.client.get(user_detail_url(self.user.id))

#         self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


# class PrivateUserApiTests(APITestCase):
#     """Testing authenticated user API access"""
#     def setUp(self):
#         self.user = User.objects.create(username="Bob",
#                                         password="12345")
#         self.client.force_authenticate(self.user)

#     def test_update_user(self):
#         """ Test update user """
#         url = user_detail_url(self.user.id)

#         self.assertEqual(User.objects.count(), 1)

#         res = self.client.put(url, {"email": "muzamir@gmail.com"})

#         self.assertEqual(res.status_code, status.HTTP_200_OK)
#         self.assertEqual(User.objects.count(), 1)
#         self.assertEqual(User.objects.get(
#             username="Bob").email, "muzamir@gmail.com")

#     def test_delete_user(self):
#         """Testing delete user """
#         url = user_detail_url(self.user.id)
#         self.assertEqual(User.objects.count(), 1)

#         res = self.client.delete(url)

#         self.assertEqual(res.status_code, status.HTTP_204_NO_CONTENT)
#         self.assertEqual(User.objects.count(), 0)


from django.test import TestCase
from django.contrib.auth import get_user_model
from django.urls import reverse

from rest_framework.test import APIClient
from rest_framework import status

CREATE_USER_URL = reverse('user:create')
TOKEN_URL = reverse('user:token')
ME_URL = reverse('user:me')


def create_user(**param):
    return get_user_model().objects.create_user(**param)


class PublicUserApiTests(TestCase):
    """ Test the users API (public)"""

    def setUp(self):
        self.client = APIClient()

    def test_create_valid_user_success(self):
        """Test creating user with valid payload is successful"""
        payload = {
            'email': 'tes2t@gmail.com',
            'password': 'testpaswqdads',
            'name': 'Tadstafname'
        }

        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        user = get_user_model().objects.get(**res.data)
        self.assertTrue(user.check_password(payload['password']))
        self.assertNotIn('password', res.data)

    def test_user_exists(self):
        """Test creating user that already exists"""
        payload = {'email': 'test@gmail.com',
                   'password': 'testpass',
                   'name': 'TEst name'}
        create_user(**payload)

        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_password_too_short(self):
        """Test that the password must be more than 5 characters"""
        payload = {'email': 'test@gmail.com',
                   'password': 'pw',
                   'name': 'TEst name'}
        res = self.client.post(CREATE_USER_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        user_exists = get_user_model().objects.filter(email=payload['email']
                                                      ).exists()
        self.assertFalse(user_exists)

    def test_create_token_for_user(self):
        """Test that a token is created for the user"""
        payload = {'email': 'test@gmail.com',
                   'password': 'testpass'
                   }
        create_user(**payload)
        res = self.client.post(TOKEN_URL, payload)

        self.assertIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_200_OK)

    def test_create_token_invalid_credentials(self):
        """ Test that token is not created if invalid credentials are given"""
        create_user(email='test@gmail.com',
                    password='testpass'
                    )
        payload = {'email': 'test@gmail.com',
                   'password': 'wrong'
                   }

        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_no_user(self):
        """ Test that token is not created if user doesnt exist """
        payload = {'email': 'test@gmail.com',
                   'password': 'testpass'
                   }
        res = self.client.post(TOKEN_URL, payload)

        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_token_missing_field(self):
        """Test that email and password are required"""
        res = self.client.post(TOKEN_URL, {'email': 'one', 'password': ''})
        self.assertNotIn('token', res.data)
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)

    def test_retrieve_user_unauthorized(self):
        """Test that authentication is required for users"""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateUserApiTests(TestCase):
    """ Test the users API (private)"""

    def setUp(self):
        self.user = create_user(
            email="test@gmail.com",
            password="testpass",
            name="name"
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)

    def test_retrieve_profile_success(self):
        """Test retrieving profile for logged in user"""
        res = self.client.get(ME_URL)

        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, {
            'name': self.user.name,
            'email': self.user.email
        })

    def test_post_me_not_allowed(self):
        """Test that POST is not allowed on the me url"""
        res = self.client.post(ME_URL, {})

        self.assertEqual(res.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

    def test_update_user_profile(self):
        """ Test updating the user profile for authenticated user """
        payload = {'name': "new name", 'password': 'newpassword123'}

        res = self.client.patch(ME_URL, payload)

        self.user.refresh_from_db()

        self.assertEqual(self.user.name, payload['name'])
        self.assertTrue(self.user.check_password(payload['password']))
        self.assertEqual(res.status_code, status.HTTP_200_OK)
