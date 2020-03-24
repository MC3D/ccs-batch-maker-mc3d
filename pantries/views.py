from rest_framework import generics

from .models import Ingredient
from .serializers import IngredientSerializer

class IngredientListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()
