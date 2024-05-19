import { useState, useEffect } from 'react'
import AxiosInstance from '../components/Axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { Card, CardContent, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';

interface Team {
    id: number;
    full_name: string;
    abbreviation: string;
    nickname: string;
    city: string;
    state: string;
    year_founded: number;
}

const Home = () => {
    const navigator = useNavigate();
    const [teams, setTeams] = useState<Team[]>([]);
    
    useEffect(() => {
        fetchTeams();
      }, []);
      
    const fetchTeams = () => {
        AxiosInstance.get('/api/home')
        .then(response => {
            console.log(response.data.teams);
            setTeams(response.data.teams)
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }
    const handleClick = (team_name: string) => {
        navigator(`/team/${team_name}`)
    }
    
  return (
    <>
        <Box sx={{ padding: 2, textAlign: 'center'  }}>
            <Typography variant="h4" gutterBottom>
                Stat Hoops
            </Typography>
            <List sx={{ width: '100%', maxWidth: '95%', margin: '0 auto', bgcolor: 'background.paper', borderRadius: 2 }}>
                {teams.map((team) => (
                <Card key={team.id} variant="outlined" sx={{ marginBottom: 2 }}>
                    <ListItem sx={{ alignItems: 'center', padding: 0 }}>
                        <ListItemButton onClick={() => handleClick(team.full_name)} sx={{ display: 'flex', alignItems: 'center' }}>
                            
                            <ListItemAvatar>
                                <Avatar alt={team.full_name} src={`logos/${team.full_name}.png`} sx={{ width: 56, height: 56, marginRight: 2 }} />
                            </ListItemAvatar>

                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6">{team.full_name}</Typography>
                                <Typography variant="body2" color="textSecondary">{team.nickname}</Typography>
                            </CardContent>

                            <ListItemSecondaryAction sx={{ right: 16 }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<FavoriteBorderIcon />}
                                    sx={{ textTransform: 'none' }}
                                >
                                    Follow
                                </Button>
                            </ListItemSecondaryAction>

                        </ListItemButton>
                    </ListItem>
                </Card>
                ))}
            </List>
        </Box>
    </>
  )
}

export default Home
