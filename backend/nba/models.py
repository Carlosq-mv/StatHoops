from django.db import models
from django.contrib.auth.models import User


class Team(models.Model):
    team_name = models.CharField(max_length=32)
    team_id = models.IntegerField(default=0, null=False)
    date_followed = models.DateField(auto_now_add=True)
    user = models.ForeignKey(User, related_name="teams", on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.team_name