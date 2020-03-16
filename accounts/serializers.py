from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import serializers
from .models import Profile, Connection

User = get_user_model()

class ConnectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Connection
        fields = ('user', 'following', 'created')
        depth = 1


class UserSerializer(serializers.ModelSerializer):
    following = ConnectionSerializer(many=True, source='get_following')
    followers = ConnectionSerializer(many=True, source='get_followers')

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'profile', 'following', 'followers')
        depth = 1

class ProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = Profile
        fields = ('id', 'location',)
        depth = 1
