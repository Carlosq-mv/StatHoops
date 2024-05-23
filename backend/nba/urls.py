from django.contrib import admin
from django.urls import path, include
from .views import HomePageTeamsList, TeamInfo, FollowTeam, MyTeams, GetFranchiseLeaderData

urlpatterns = [
    path('home/', HomePageTeamsList.as_view(), name='home-page'),
    path('team/<str:team_name>/', TeamInfo.as_view(), name='team-info'),
    path('team/<str:team_name>/follow/', FollowTeam.as_view(), name='follow-team'),
    path('my-teams/', MyTeams.as_view(), name='my-teams'),
    path('my-teams/franchise-leaders/<int:team_id>/', GetFranchiseLeaderData.as_view(), name='get-franchise-leaders')
]
