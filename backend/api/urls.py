from django.urls import path
from .views import auth

urlpatterns = [
    path('login/', auth.register_user, name='register-user')
]
