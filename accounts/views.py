from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404

from rest_framework import generics

from .serializers import ProfileSerializer, UserSerializer, ConnectionSerializer
from .models import Profile, Connection

User = get_user_model()


class FollowingListAPIView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(following_set__user=self.kwargs['pk'])


class FollowersListAPIView(generics.ListAPIView):
    serializer_class = UserSerializer

    def get_queryset(self):
        return User.objects.filter(follower_set__following=self.kwargs['pk'])


class UserListAPIView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class ProfileListCreateAPIView(generics.ListCreateAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ProfileRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class ConnectionCreateAPIView(generics.CreateAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer

    def perform_create(self, serializer):
        following = get_object_or_404(User, pk=self.kwargs['pk'])
        serializer.save(user=self.request.user, following=following)
