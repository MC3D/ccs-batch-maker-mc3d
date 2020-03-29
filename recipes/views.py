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


class RecipesListbyUserAPIView(generics.ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        user = self.request.user
        return Recipe.objects.filter(owner=user)

class RecipeListbyFollowerAPIView(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        # use double underscores (__) to look "through" relations
        return Recipe.objects.filter(owner__following_set__user=self.request.user)
