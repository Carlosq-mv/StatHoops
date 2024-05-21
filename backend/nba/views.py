from typing import Any
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from nba_api.stats.static import teams
from nba_api.stats.endpoints import commonteamroster
from nba_api.stats.endpoints import playercareerstats
from datetime import datetime
from .models import Team
from .serializers import TeamSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from .utils.nba_utils import Nba
from auth_app.serializers import UserSerializer
from .models import Team

class HomePageTeamsList(APIView):
    permission_classes = [IsAuthenticated]
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.nba = Nba()
        
    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        
        nba_teams = self.nba.list_of_teams()
        if nba_teams:
            return Response({'user': user_serializer.data, 'teams' : nba_teams}, status=status.HTTP_200_OK)
        else:
            return Response({'error' : 'Could not fetch NBA teams.'}, status=status.HTTP_400_BAD_REQUEST)

class TeamInfo(APIView):
    permission_classes = [IsAuthenticated]
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.nba = Nba()
        
    def get(self, request, team_name):
        team_id = self.nba.get_team_id(team_name)
        roster = commonteamroster.CommonTeamRoster(team_id=team_id).get_data_frames()[0]
        if roster is not None:
            return Response({'roster' : roster}, status=status.HTTP_200_OK)
        else:
            return Response({'error' : f'Could not fetch {team_name}\'s roster'}, status=status.HTTP_400_BAD_REQUEST)


class FollowTeam(APIView):
    permission_classes = [IsAuthenticated]
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.nba = Nba()
        
    def post(self, request, team_name):
        user = request.user
        user_serializer = UserSerializer(user)
        
        team_id = self.nba.get_team_id(team_name)
        team = Team.objects.create(team_name=team_name, team_id=team_id, user=user)
        return Response({'success' : 'new team followed'}, status=status.HTTP_201_CREATED)
    

# @api_view(['POST'])
# def follow_team(request, team_name):
#     team_id = team_dict[team_name]
