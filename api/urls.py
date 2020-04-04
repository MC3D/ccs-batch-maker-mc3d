from django.urls import path, include

app_name = 'api_v1'

urlpatterns = [
    path('', include('recipes.urls', namespace='recipes')),
    path('', include('accounts.urls', namespace='accounts')),
]
