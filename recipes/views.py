from rest_framework import generics, permissions

from .serializers import RecipeSerializer
from .models import Recipe
from .permissions import IsOwnerOrReadOnly


class RecipeListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [permissions.IsAuthenticated]

    # modify to return public recipes and recipes of logged in user
    def get_queryset(self):
        return Recipe.objects.filter(is_public=True)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class RecipeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsOwnerOrReadOnly]

    # update to filter by is_public or is owner to view
    def get_queryset(self):
        return Recipe.objects.filter(is_public=True)


# class RecipeListByFollowerAPIView(generics.ListAPIView):
#     serializer_class = RecipeSerializer
#     permission_classes = [IsOwnerOrReadOnly]
#
#     def get_queryset(self):
#         return Recipe.objects.filter(owner=self.request.user)

class RecipeListByFollowerAPIView(generics.ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        # use double underscores (__) to look "through" relations
        return Recipe.objects.filter(owner__following_set__user=self.request.user)
