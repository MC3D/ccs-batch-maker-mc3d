from django.contrib.auth import get_user_model
from django.conf import settings
from rest_framework import serializers
from rest_auth.models import TokenModel
from .models import Profile, Connection

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'is_staff',)


class TokenSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')

    class Meta:
        model = TokenModel
        fields = ('key', 'username', 'email')


class ConnectionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Connection
        fields = ('user', 'following', 'created')
        depth = 1


class FollowingSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='following.id')
    username = serializers.ReadOnlyField(source='following.username')

    class Meta:
        model = Connection
        fields = ('id', 'username', 'created')


class FollowerSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField(source='user.id')
    username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Connection
        fields = ('id', 'username', 'created')
        depth = 1


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
    following = FollowingSerializer(many=True, source='get_following')
    followers = FollowerSerializer(many=True, source='get_followers')


    class Meta:
        model = Profile
        fields = ('id', 'username', 'email', 'city', 'following', 'followers')
        depth = 1
