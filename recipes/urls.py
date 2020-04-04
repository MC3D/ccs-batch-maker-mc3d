from django.urls import path

from . import views

app_name = 'recipes'

urlpatterns = [
    path('user/following/recipes/', views.RecipeListByFollowerAPIView.as_view(), name='recipe_list_by_follower_api'),
    path('recipes/<int:pk>/', views.RecipeRetrieveUpdateDestroyAPIView.as_view(), name='recipe_retrieve_update_destroy_api'),
    path('recipes/', views.RecipeListCreateAPIView.as_view(), name='recipe_list_create_api'),
]
