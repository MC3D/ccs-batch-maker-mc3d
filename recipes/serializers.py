from rest_framework import serializers
from .models import Recipe

import requests

class RecipeSerializer(serializers.ModelSerializer):
    owner_id = serializers.ReadOnlyField(source='owner.id')
    owner_username = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Recipe
        fields = ('amount', 'cook_scale', 'cook_temp', 'cook_time', 'id', 'image', 'is_public', 'name', 'owner_id', 'owner_username', 'personal_notes', 'prep_time', 'steps', 'type', 'unit',)
