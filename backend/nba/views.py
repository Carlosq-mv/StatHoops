from typing import Any
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from auth_app.serializers import UserSerializer
from .serializers import TeamSerializer, FranchiseLeaderSerializer
from .models import Team, FranchiseLeader
from .utils.nba_utils import Nba
from nba_api.stats.endpoints import commonteamroster, leaguestandings
import pandas as pd


class HomePageTeamsList(APIView):
    permission_classes = [AllowAny]
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

# TODO: Load Team Info into Database
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
        team_id = self.nba.get_team_id(team_name)
        
        t = Team.objects.filter(team_id=team_id, user=user).exists()
        if t: 
            Team.objects.get(team_id=team_id, user=user).delete()
            return Response({'unfollow' : 'You are now un following this teams'}, status=status.HTTP_200_OK)
        else:
            team = self.nba.get_team(team_id)
            stats = self.nba.franchise_leaders(team_id)
            
            new_user_team = Team.objects.create(team_name=team_name, team_id=team_id, user=user, city=team['city'], state=team['state'], abbreviation=team['abbreviation'], year_founded=team['year_founded'])
        return Response({'success' : 'new team followed'}, status=status.HTTP_201_CREATED)
    

class MyTeams(APIView):
    permission_classes = [IsAuthenticated]
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.nba = Nba()
    
    def get(self, request):
        user = request.user
        teams = Team.objects.filter(user=user)
        serializer = TeamSerializer(teams, many=True)
        
        return Response({'teams' : serializer.data})
    

class GetFranchiseLeaderData(APIView):
    permission_classes = [IsAuthenticated]
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.nba = Nba()
    
    def get(self, request, team_id):
        user = request.user
        try:
            team_data = FranchiseLeader.objects.get(TEAM_ID=team_id)
        except:
            return Response({'error' : 'data for team does not exists'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = FranchiseLeaderSerializer(team_data)

        return Response({'success' : serializer.data}, status=status.HTTP_200_OK)

class GetNBAStandings(APIView):
    permission_classes = [IsAuthenticated]
    def __init__(self, **kwargs: Any) -> None:
        super().__init__(**kwargs)
        self.nba = Nba()
    
    def get(self, request):
        standings = leaguestandings.LeagueStandings()
        standings_df = standings.get_data_frames()[0]

        # Filter the standings for the relevant columns
        standings_df = standings_df[['TeamID', 'TeamCity', 'TeamName', 'Conference', 'PlayoffRank']]

        # Sort by conference and playoff rank
        standings_df = standings_df.sort_values(by=['Conference', 'PlayoffRank'])

        # Separate into conferences
        east_teams = standings_df[standings_df['Conference'] == 'East'].head(16)
        west_teams = standings_df[standings_df['Conference'] == 'West'].head(16)

        # Convert to a more readable format
        east_standings = east_teams[['TeamCity', 'TeamName']].reset_index(drop=True)
        west_standings = west_teams[['TeamCity', 'TeamName']].reset_index(drop=True)

    
        return Response({'east' : east_standings, 'west' : west_standings})