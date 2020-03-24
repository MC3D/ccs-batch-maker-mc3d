from django.urls import path

from . import views

app_name = 'pantries'

urlpatterns = [
    path('<int:pk>/ingredients/', views.IngredientListCreateAPIView.as_view(), name='ingredient_list_create_api'),
]
