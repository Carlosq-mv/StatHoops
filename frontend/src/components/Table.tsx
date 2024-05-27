import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import api from "../api";
import Grid from "@mui/material/Grid";

interface Column {
  id: "name" | "wins" | "losses" | "percentage";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "name", label: "Team", minWidth: 170 },
  //   { id: 'wins', label: 'Wins', minWidth: 100 },
  //   { id: 'losses', label: 'Losses', minWidth: 100 },
  //   { id: 'percentage', label: 'Win %', minWidth: 100 },
];

export default function ColumnGroupingTable() {
  const [eastStandings, setEastStandings] = useState([]);
  const [westStandings, setWestStandings] = useState([]);

  const fetchTeamStandings = () => {
    api
      .get("nba/standings/")
      .then((response) => {
        console.log(response.data);
        setEastStandings(response.data.east.TeamName);
        setWestStandings(response.data.west.TeamName);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    fetchTeamStandings();
  }, []);

  return (
    <Paper
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TableContainer
        sx={{ maxHeight: 440, justifyContent: "center", alignItems: "center" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                West Coast Teams
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {westStandings.map((name, index) => (
              <TableRow key={index} sx={{ border: "none" }}>
                <TableCell sx={{ border: "none" }} align="center">
                  <Grid container alignItems="center" spacing={5}>
                    <Grid item>{index + 1}</Grid>
                    <Grid item>{name}</Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={4}>
                East Coast Teams
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {eastStandings.map((name, index) => (
              <TableRow key={index} sx={{ border: "none" }}>
                <TableCell sx={{ border: "none" }} align="center">
                  <Grid container alignItems="center" spacing={5}>
                    <Grid item>{index + 1}</Grid>
                    <Grid item>{name}</Grid>
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
