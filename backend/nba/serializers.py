from nba.models import Team
from rest_framework import serializers
from django.contrib.auth.models import User


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['team_name', 'team_id', 'data_followed', 'user']
        extra_kwargs = {'author' : {'read_only' : True}}
        