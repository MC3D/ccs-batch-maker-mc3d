from django.urls import path

from . import views

app_name = 'accounts'

urlpatterns = [
    path('profiles/<int:pk>/', views.ProfileRetrieveUpdateDestroyAPIView.as_view(), name='profile_retrieve_update_destroy_api'),
    path('profiles/', views.ProfileListCreateAPIView.as_view(), name='profile_list_create_api'),
    path('connections/', views.ConnectionListCreateAPIView.as_view(), name='connection_list_create_api'),
    path('', views.UserListAPIView.as_view(), name='user_list_api'),
]
