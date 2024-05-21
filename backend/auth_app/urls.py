from django.urls import path
from .views import CreateAccount, LoginUser, CurrentUserView

urlpatterns = [
    path('create-account/', CreateAccount.as_view(), name='create-account'),
    path('login/', LoginUser.as_view(), name='login-user'),
    path('current-user/', CurrentUserView.as_view(), name='get-current-user')

]
