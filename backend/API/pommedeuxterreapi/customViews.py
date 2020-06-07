
from django.contrib.auth.forms import PasswordResetForm as DjangoPasswordResetForm
from rest_auth.serializers import (
    PasswordResetSerializer as RestAuthPasswordResetSerializer
)
from rest_auth.views import PasswordResetView as RestAuthPasswordResetView
from django.utils.translation import ugettext_lazy as _
from rest_framework.exceptions import ValidationError

class PasswordResetForm(DjangoPasswordResetForm):
    def get_users(self, email):
        users = tuple(super().get_users(email))
        if users:
            return users
        msg = _('"{email}" was not found in our system.')
        raise ValidationError({'email': msg.format(email=email)})


class PasswordResetSerializer(RestAuthPasswordResetSerializer):
    password_reset_form_class = PasswordResetForm


class PasswordResetView(RestAuthPasswordResetView):
    serializer_class = PasswordResetSerializer

    def __init__(self, *args, **kwargs):
        """Prints the name of the class if it is used."""
        print(self.__class__.__name__)
        super().__init__(*args, **kwargs)