import { useParams } from 'react-router-dom'
import AxiosInstance from '../components/Axios'
import { useEffect, useState } from 'react'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

interface TeamInfo {
    id: number;
    season: string;
    league_id: string;
    player: string;
    nickname: string;
    player_slug: string;
    num: string;
    position: string;
    height: string;
    weight: string;
    birth_date: string;
    age: number;
    exp: string;
    school: string;
    player_id: string;
    how_acquired: string;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));


const Team = () => {
    const { team_name } = useParams<{team_name: string}>();
    const [teamInfo, setTeamInfo] = useState<TeamInfo[]>([]);

    useEffect(() => {
        fetchTeamInfo();
    }, [team_name]);

    const fetchTeamInfo = () => {
        AxiosInstance.get(`/api/team/${team_name}`)
        .then(response => {
            console.log(response.data.teams)
            console.log(team_name)
            const data = response.data.teams;
            const transformedData: TeamInfo[] = data.TeamID.map((_: any, index: number) => ({
                id: data.TeamID[index],
                season: data.SEASON[index],
                league_id: data.LeagueID[index],
                player: data.PLAYER[index],
                nickname: data.NICKNAME[index],
                player_slug: data.PLAYER_SLUG[index],
                num: data.NUM[index],
                position: data.POSITION[index],
                height: data.HEIGHT[index],
                weight: data.WEIGHT[index],
                birth_date: data.BIRTH_DATE[index],
                age: data.AGE[index],
                exp: data.EXP[index],
                school: data.SCHOOL[index],
                player_id: data.PLAYER_ID[index],
                how_acquired: data.HOW_ACQUIRED[index],
              }));
        
              setTeamInfo(transformedData);
        })
        .catch(error => {
            console.log(error.response.data)
        })
    }
    
  return (
    <div>
      
        <Stack direction="row" spacing={2}>
            <Avatar src={`../public/logos/${team_name}.png`} />
            <h1>{team_name}</h1>
        </Stack>
      

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="customized table">
                <TableHead>
                <StyledTableRow>
                    <StyledTableCell>Num</StyledTableCell>
                    <StyledTableCell>Player</StyledTableCell>
                    <StyledTableCell align="right">Position</StyledTableCell>
                    <StyledTableCell align="right">Weight</StyledTableCell>
                    <StyledTableCell align="right">Experience</StyledTableCell>
                    <StyledTableCell align="right">School</StyledTableCell>
                </StyledTableRow>
                </TableHead>
                <TableBody>
                    {teamInfo.map((row) => (
                        <StyledTableRow
                        key={row.player_id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >

                        <StyledTableCell>{row.num}</StyledTableCell>

                        <StyledTableCell component="th" scope="row">
                            {row.player}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.position}</StyledTableCell>
                        <StyledTableCell align="right">{row.weight}</StyledTableCell>
                        <StyledTableCell align="right">{row.exp === "R" ? "Rookie year" :  row.exp + " years"}</StyledTableCell>
                    
                        <StyledTableCell align="right">{row.school}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    </div>
  )
}

export default Team
