from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now
from django.db import models


class User(AbstractUser):
    pass


# https://docs.djangoproject.com/en/3.0/topics/auth/customizing/#referencing-the-user-model
class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    city = models.CharField(max_length=255)

    def __str__(self):
        return self.user.username

    def get_following(self):
        return Connection.objects.filter(user=self.user)

    def get_followers(self):
        return Connection.objects.filter(following=self.user)


class Connection(models.Model):
    created = models.DateTimeField(default=now, editable=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='follower_set')
    following = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='following_set')

    # enforce that the user, following tuples are unique
    # Connection with this User and Following already exists error if you try to duplicate
    class Meta:
        unique_together = (('user', 'following'),)

    def __str__(self):
        return self.user.username
