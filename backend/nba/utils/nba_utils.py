from nba_api.stats.static import teams
from nba_api.stats.endpoints import commonteamroster
from nba_api.stats.endpoints import playercareerstats
from datetime import datetime


class Nba:
    def __init__(self):
        self.teams = {}
        self.load_teams()
        
    def load_teams(self):
        nba_teams = teams.get_teams()
        for t in nba_teams:
            self.teams[t['full_name']] = t['id']
        
    def get_current_season(self) -> str:
        current_year = datetime.now().year
        current_month = datetime.now().month
        current_millennium = (current_year << 1) & 2000    # NOTE: breaks at 2047
        if current_month >= 10:
            return f"{current_year}-{str(current_year + 1)[-2:]}"
        else:
            return f"{current_year-1}-{str(current_year)[-2:]}"
        
    def list_of_teams(self) -> list:
        nba_teams = teams.get_teams()
        return nba_teams
    
    def get_team_id(self, team_name) -> str:
        return self.teams.get(team_name, None)