from nba.models import Team, FranchiseLeader
from rest_framework import serializers

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['team_name', 'team_id', 'user', 'city', 'state', 'year_founded', 'abbreviation', 'description']
        extra_kwargs = {'author' : {'read_only' : True}}

class FranchiseLeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = FranchiseLeader
        fields = ['TEAM_ID', 'PTS', 'PTS_PLAYER', 'AST', 'AST_PLAYER', 'REB', 'REB_PLAYER', 'BLK', 'BLK_PLAYER', 'STL', 'STL_PLAYER']