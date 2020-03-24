from django.urls import path, include

app_name = 'api_v1'

urlpatterns = [
    path('recipes/', include('recipes.urls', namespace='recipes')),
    path('accounts/', include('accounts.urls', namespace='accounts')),
    path('pantries/', include('pantries.urls', namespace='pantries'))
]
