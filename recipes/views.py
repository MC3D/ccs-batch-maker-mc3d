from rest_framework import generics, permissions

from .serializers import RecipeSerializer
from .models import Recipe
from .permissions import IsOwnerOrReadOnly


class RecipeListCreateAPIView(generics.ListCreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(owner=user)


class RecipeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]


class UserRecipeListAPIView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Purchase.objects.filter(owner=user)
