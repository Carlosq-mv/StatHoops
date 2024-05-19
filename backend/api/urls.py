from django.urls import path
from .views import auth, team

urlpatterns = [  
    path('create-account/', auth.create_account, name='create-account'),
    path('login/', auth.login, name='login'),
    path('home/', team.get_teams, name="get-teams"),
    path('team/<str:team_name>/', team.get_team_info, name='get-team-info'),
    # path('player/<str:player_id>/', home.get_player_stats, name='get-player-stats')
]
