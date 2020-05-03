from rest_framework import generics, authentication, permissions
from accounts.serializers import UserSerializer, AuthTokenSerializer
from pommedeuxterreapi.views import CustomObtainAuthToken
from rest_framework.settings import api_settings


class CreateUserView(generics.CreateAPIView):
    """Create a new user in the system"""
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class CreateTokenView(CustomObtainAuthToken):
    """ Create a new auth token for user in the system"""
    serializer_class = AuthTokenSerializer
    renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES


class ManageUserView(generics.RetrieveUpdateAPIView):
    """Manage the authenticated user"""
    serializer_class = UserSerializer
    authentication_classes = (authentication.TokenAuthentication,)
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        """ Retrieve and return authentication user"""

        return self.request.user
