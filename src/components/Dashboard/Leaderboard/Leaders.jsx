/////////////// IMPORTS
import React from "react";
// components
import Title from "../Title";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions
import { addInvestment } from "../../../store/actions/leaderboardActions";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  },
  button: {
    minWidth: theme.spacing(9),
    borderRadius: 50,
    fontSize: 10,
    textTransform: "none",
    textDecoration: "none !important",
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    color: "rgb(92, 27, 249)",
    transition: "ease-in-out 0.15s",
    background: "whitesmoke",
    "&:hover": {
      background: "rgb(92, 27, 249)",
      color: "whitesmoke",
      cursor: "pointer"
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  }
}));

/////////////// COMPONENT
const Leaders = props => {
  const classes = useStyles();
  const { leaderboard } = props;
  const allUsers = leaderboard.board;
  const d = new Date(leaderboard.last_updated.seconds * 1000);
  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();
  const hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
  const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
  const sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
  const last_updated =
    year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;
  // console.log(allUsers, last_updated);

  // set props from redux
  const { auth } = props;
  // console.log(auth);
  return (
    <React.Fragment>
      <Title>Leaders</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Name</TableCell>
            <TableCell align="right">qPoints</TableCell>
            <TableCell align="right">qScore</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            (allUsers.sort((a, b) => {
              if (a.q_score < b.q_score) return 1;
              if (a.q_score > b.q_score) return -1;
              return 0;
            }),
            allUsers.map((row, id) => (
              <TableRow key={row.user_id}>
                <TableCell>{id + 1}</TableCell>
                <TableCell>{row.username}</TableCell>
                <TableCell align="right">{row.q_points}</TableCell>
                <TableCell align="right">
                  <Button
                    className={classes.button}
                    style={{ textDecoration: "none" }}
                    onMouseEnter={e => {
                      e.target.innerHTML = "Invest";
                    }}
                    onMouseLeave={e => {
                      e.target.innerHTML = row.q_score;
                    }}
                    onClick={() => {
                      console.log(auth);
                      const data = {
                        username: row.username,
                        date: new Date().toDateString(),
                        q_score: row.q_score,
                        q_points: row.q_points,
                        uid: auth.uid
                      };
                      props.addInvestment(data);
                    }}
                  >
                    {row.q_score}
                  </Button>
                </TableCell>
              </TableRow>
            )))
          }
        </TableBody>
      </Table>
      <div className={classes.seeMore}>LastUpdated {last_updated}</div>
    </React.Fragment>
  );
};

/////////////// REDUX
const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addInvestment: data => dispatch(addInvestment(data))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(Leaders);
