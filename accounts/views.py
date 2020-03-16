from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework import generics

from .serializers import ProfileSerializer, UserSerializer, ConnectionSerializer
from .models import Profile, Connection

User = get_user_model()

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

class ConnectionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer
