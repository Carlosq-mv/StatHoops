from django.db import models
from django.contrib.auth.models import User


class Team(models.Model):
    team_name = models.CharField(max_length=32, null=False)
    team_id = models.IntegerField(default=0, null=False)
    date_followed = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=100, null=True)
    city = models.CharField(max_length=32, default='', null=False)
    state = models.CharField(max_length=32, default='', null=False)
    abbreviation = models.CharField(max_length=32, default='', null=False)
    year_founded = models.IntegerField(default=0, null=False)
    user = models.ForeignKey(User, related_name="teams", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.team_name
    
class FranchiseLeader(models.Model):
    TEAM_ID = models.IntegerField(default=0, null=False)
    PTS = models.IntegerField(default=0, null=False)
    PTS_PLAYER = models.CharField(default='', null=False, max_length=64)
    AST = models.IntegerField(default=0, null=False)
    AST_PLAYER = models.CharField(default='', null=False, max_length=64)
    REB = models.IntegerField(default=0, null=False)
    REB_PLAYER = models.CharField(default='', null=False, max_length=64)
    BLK = models.IntegerField(default=0, null=False)
    BLK_PLAYER = models.CharField(default='', null=False, max_length=64)
    STL = models.IntegerField(default=0, null=False)
    STL_PLAYER = models.CharField(default='', null=False, max_length=64)
    
    def __str__(self) -> str:
        return f"Team ID: {self.TEAM_ID}"