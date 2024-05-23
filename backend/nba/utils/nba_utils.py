from nba_api.stats.static import teams
from nba_api.stats.endpoints import commonteamroster, franchiseleaders
from nba_api.stats.endpoints import playercareerstats
from datetime import datetime
import pandas as pd

class Nba:
    def __init__(self):
        self.teams = {}
        self.franchise_leaders_dict = {}
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

    def get_team(self, team_id):
        return teams.find_team_name_by_id(team_id)
    
    def franchise_leaders(self, team_id):
        franchise_leaders_data = franchiseleaders.FranchiseLeaders(team_id=team_id).get_dict()
        for header, value in zip(franchise_leaders_data['resultSets'][0]['headers'], franchise_leaders_data['resultSets'][0]['rowSet'][0]):
            self.franchise_leaders_dict[header] = value
            
        return self.franchise_leaders_dict