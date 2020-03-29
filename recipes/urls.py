from django.urls import path

from . import views

app_name = 'recipes'

urlpatterns = [
    path('<int:pk>/', views.RecipeRetrieveUpdateDestroyAPIView.as_view(), name='recipe_retrieve_update_destroy_api'),
    path('following/', views.RecipeListbyFollowerAPIView.as_view(), name='recipe_list_by_follower'),
    path('', views.RecipeListCreateAPIView.as_view(), name='recipe_list_create_api'),
]
