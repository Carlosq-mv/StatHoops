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

team_dict = {}
nba_teams = teams.get_teams()
for team in nba_teams:
    team_dict[team['full_name']] = team['id']

def get_current_season():
    current_year = datetime.now().year
    current_month = datetime.now().month
    current_millennium = (current_year << 1) & 2000    # NOTE: breaks at 2047
    
    # NBA season start in Oct(10) and end in April(6)
    if current_month >= 10:
        return f"{current_year}-{str(current_year + 1)[-2:]}"
    else:
        return f"{current_year-1}-{str(current_year)[-2:]}"


@api_view(['GET'])
def get_teams(request):
    nba_teams = teams.get_teams()
    return Response({'teams' : nba_teams})


@api_view(['GET'])
def get_team_info(request, team_name):
    team_id = team_dict[team_name]
    roster = commonteamroster.CommonTeamRoster(team_id=team_id).get_data_frames()[0]
    return Response({'teams' : roster})

# @api_view(['GET'])
# def get_player_stats(request, player_id):
    
#     career = playercareerstats.PlayerCareerStats(player_id=player_id).get_dict()
#     career_stats = career.get('resultSets', [])
#     season = get_current_season()
    
    
#     headers = career_stats[0].get('headers', [])
#     rows = career_stats[0].get('rowSet', [])

#     pts_index = headers.index('PTS')
#     gp_index = headers.index('GP')
#     season_index = headers.index('SEASON_ID')
    
#     current_season = get_current_season()
    
#     current_season_rows = [row for row in rows if row[season_index] == current_season]
    
#     if not current_season_rows:
#         return Response({'error': 'No stats found for the current season'}, status=404)
    
#     total_points = sum(row[pts_index] for row in current_season_rows)
#     total_games = sum(row[gp_index] for row in current_season_rows)
    
#     if total_games > 0:
#         points_per_game = total_points / total_games
#     else:
#         points_per_game = 0
    
#     return Response({'current_season': current_season, 'points_per_game': round(points_per_game, 2)})
