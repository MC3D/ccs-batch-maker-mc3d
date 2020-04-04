from django.urls import path

from . import views

app_name = 'accounts'

urlpatterns = [
    path('users/<int:pk>/following/', views.FollowingListAPIView.as_view(), name='following_list_api_view'),
    path('users/<int:pk>/followers/', views.FollowersListAPIView.as_view(), name='followers_list_api_view'),
    path('users/', views.UserListAPIView.as_view(), name='user_list_api'),
    path('profiles/', views.ProfileListCreateAPIView.as_view(), name='profile_list_create_api'),
    path('profiles/<int:pk>/', views.ProfileRetrieveUpdateDestroyAPIView.as_view(), name='profile_retrieve_update_destroy_api'),
    path('connections/', views.ConnectionCreateAPIView.as_view(), name='connection_create_api'),
]
