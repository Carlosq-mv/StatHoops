from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # User authentication Urls (Auth_app)
    path('api/', include('auth_app.urls')),

    # NBA Urls (Nba app)
    path('nba/', include('nba.urls')),
    
    
    # JWT Routes for Token access and refresh
    path('api/token/', TokenObtainPairView.as_view(), name='get-token'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='refresh-token'),
    # REST Urls
    path('api-auth/', include("rest_framework.urls")),
]
