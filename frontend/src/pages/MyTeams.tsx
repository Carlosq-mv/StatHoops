import api from '../api'
import { useEffect, useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';
import ReactCardFlip from "react-card-flip";
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import { TableCell, TableRow, TableContainer, TableBody, TableHead, Table } from '@mui/material';

interface Team {
    team_name: string;
    team_id: number;
    id: number;
    city: string;
    state: string;
    year_founded: number;
    abbreviation: string;
}

interface TeamStatLeaders {
    TEAM_ID: number;
    PTS: number;
    PTS_PERSON_ID: number;
    PTS_PLAYER: string;
    AST: number;
    AST_PERSON_ID: number;
    AST_PLAYER: string;
    REB: number;
    REB_PERSON_ID: number;
    REB_PLAYER: string;
    BLK: number;
    BLK_PERSON_ID: number;
    BLK_PLAYER: string;
    STL: number;
    STL_PERSON_ID: number;
    STL_PLAYER: string;
}

const MyTeams = () => {
    const navigate = useNavigate();
    const [myTeams, setTeams] = useState<Team[]>([]);
    const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({});
    const [teamLeaders, setTeamLeaders] = useState<TeamStatLeaders[]>([]);

    useEffect(() => {
        fetchMyTeams();
    }, []);

  
    useEffect(() => {
        myTeams.forEach((team) => {
            fetchTeamStatLeaders(team.team_id);
        });
    }, [myTeams]);
    

    const fetchMyTeams = () => {
        api.get('nba/my-teams/')
            .then(response => {
                // console.log(response.data.teams);
                setTeams(response.data.teams);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const fetchTeamStatLeaders = (team_id: number) => {
        api.get(`nba/my-teams/franchise-leaders/${team_id}`)
        .then(response => {
            // console.log(response.data.success)
            setTeamLeaders(prevState => ({
                ...prevState,
                [team_id]: response.data.success
            }));
            console.log(teamLeaders)
        })
        .catch(error => {
            console.log(error.response.data)
        })
    };


    const handleFlip = (team_id: number) => {
        setFlippedCards(prevState => ({
            ...prevState,
            [team_id]: !prevState[team_id]
        }));
    };

    return (
        <Grid container spacing={2}>
            {myTeams.map((team) => (
                <Grid item key={team.team_id} xs={12} sm={6} md={4} lg={3}>
                    <ReactCardFlip isFlipped={!!flippedCards[team.team_id]} flipDirection="vertical">
                        <Card sx={{ width: '100%', height: '100%' }}>
                            <CardHeader
                                avatar={
                                    <Avatar 
                                        sx={{ bgcolor: red[500] }} 
                                        aria-label="team logo" 
                                        src={`/logos/${team.team_name}.png`}
                                    >
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                titleTypographyProps={{ variant: 'subtitle1' }}
                                title={team.team_name}
                                subheaderTypographyProps={{ variant: 'body2' }}
                                subheader={`Year Founded: ${team.year_founded}`}
                            />
                            <CardMedia
                                component="img"
                                height="150"
                                image={`/logos/${team.team_name}.png`}
                                alt={team.team_name}
                                onClick={() => navigate(`/team/${team.team_name}`)}
                            />

                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {`Located in ${team.city}, ${team.state}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {`Abbreviation: ${team.abbreviation}`}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Click on {<ThreeSixtyIcon />} below for more info on team!
                                </Typography>
                                
                               
                            </CardContent>
                            
                            <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} disableSpacing>
                                <IconButton  onClick={() => handleFlip(team.team_id)}>
                                    <ThreeSixtyIcon />
                                </IconButton>
                            </CardActions>
                        </Card>

                        {/* Flipped Card Section */}
                        {/* NOTE: Look into refactoring this later */}
                        <Card sx={{ width: '100%', height: '100%' }}>
                            <CardHeader
                                avatar={
                                    <Avatar 
                                        sx={{ bgcolor: red[500] }} 
                                        aria-label="team logo" 
                                        src={`/logos/${team.team_name}.png`}
                                    >
                                    </Avatar>
                                }
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                titleTypographyProps={{ variant: 'subtitle1' }}
                                title={team.team_name}
                                subheaderTypographyProps={{ variant: 'body2' }}
                                subheader={`Year Founded: ${team.year_founded}`}
                            />
                            <CardContent>
                                <Typography variant="body2" color="text.secondary">
                                    {`More details about ${team.team_name}...`}
                                </Typography>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }}>Stat</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>Leader</TableCell>
                                                <TableCell style={{ fontWeight: 'bold' }}>Value</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }}>PTS</TableCell>
                                                <TableCell>{teamLeaders[team.team_id]?.PTS_PLAYER}</TableCell>
                                                <TableCell>{teamLeaders[team.team_id]?.PTS}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }}>AST</TableCell>
                                                <TableCell>{teamLeaders[team.team_id]?.AST_PLAYER}</TableCell>
                                                <TableCell>{teamLeaders[team.team_id]?.AST}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }}>REB</TableCell>
                                                <TableCell>{teamLeaders[team.team_id]?.REB_PLAYER}</TableCell>
                                                <TableCell>{teamLeaders[team.team_id]?.REB}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }}>BLK</TableCell>
                                                <TableCell>{teamLeaders[team.team_id]?.BLK_PLAYER}</TableCell>
                                                <TableCell>{teamLeaders[team.team_id]?.BLK}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell style={{ fontWeight: 'bold' }}>STL</TableCell>
                                                <TableCell>{teamLeaders[team.team_id]?.STL_PLAYER}</TableCell>
                                                <TableCell>{teamLeaders[team.team_id]?.STL}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>

                            <CardActions disableSpacing sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <IconButton onClick={() => handleFlip(team.team_id)}>
                                    <ThreeSixtyIcon />
                                </IconButton>
                            </CardActions>
                        </Card>

                    </ReactCardFlip>
                </Grid>
            ))}
        </Grid>
    );
};

export default MyTeams;
