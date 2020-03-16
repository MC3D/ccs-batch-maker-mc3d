from django.shortcuts import render

from rest_framework import generics

from .serializers import RecipeSerializer
from .models import Recipe

class RecipeListCreateAPIView(generics.ListCreateAPIView):
    # permission_classes = (permissions.IsAuthenticated,)
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
