import { useState, useEffect } from 'react'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import { Card, CardContent, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import api from '../api';
import IconButton from '@mui/material/IconButton';
import { listOfTeam } from '../constants';
import Loading from '../components/Loading';
interface MyTeams {
    team_name: string;
    team_id: number;
    id: number;
}

const Home = () => {
    const [myTeams, setMyTeams] = useState<MyTeams[]>([]);
    const navigator = useNavigate();
    const [isLoading, setIsLoading] = useState(false)
    

    useEffect(() => {
        setIsLoading(true);
        fetchMyTeams();
        setIsLoading(false)
    }, []);

    const fetchMyTeams = () => {
        api.get('nba/my-teams/')
        .then(response => {
            // console.log(response.data.teams)
            setMyTeams(response.data.teams)
        })
        .catch(error => {
            console.log(error)
        })
    }

    const followTeam = (team_name: string) => {
        api.post(`nba/team/${team_name}/follow/`)
        .then(response => {
            console.log(response.data);
            fetchMyTeams()
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }

    const handleClick = (team_name: string) => {
        navigator(`/team/${team_name}`)
    }
    if(isLoading) {
        return <Loading></Loading>
    }
    
  return (
        <>
            <Box sx={{ padding: 2, textAlign: 'center'  }}>
                <Typography variant="h4" gutterBottom>
                    Stat Hoops
                </Typography>
            
                <List sx={{ width: '100%', maxWidth: '95%', margin: '0 auto', bgcolor: 'background.paper', borderRadius: 2 }}>
                    {Object.entries(listOfTeam).map(([key, value]) => (
                        <Card key={key} variant="outlined" sx={{ marginBottom: 2 }}>
                            <ListItem sx={{ alignItems: 'center', padding: 0 }}>
                                <ListItemButton  sx={{ display: 'flex', alignItems: 'center' }}>
                                    
                                    <ListItemAvatar>
                                        <Avatar onClick={() => handleClick(key)} alt={key} src={`logos/${key}.png`} sx={{ width: 56, height: 56, marginRight: 2 }} />
                                    </ListItemAvatar>

                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="h6">{key}</Typography>
                                        <Typography variant="body2" color="textSecondary">{value}</Typography>
                                    </CardContent>

                                    <ListItemSecondaryAction sx={{ right: 15 }}>
                                        <IconButton sx={{ textTransform: 'none', color: '#737CCF'}} onClick={() => followTeam(key)}>
                                            {myTeams.some(myTeam => myTeam.team_name === key) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                                        </IconButton>
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
