from django.urls import path

from . import views

app_name = 'recipes'

urlpatterns = [
    path('', views.RecipeListCreateAPIView.as_view(), name='recipe_list_create_api'),
]
