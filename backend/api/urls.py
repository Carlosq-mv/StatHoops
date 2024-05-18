from django.urls import path
from .views import auth

urlpatterns = [  
    path('create-account/', auth.create_account, name='create-account'),
    path('login/', auth.login, name='login')
]
