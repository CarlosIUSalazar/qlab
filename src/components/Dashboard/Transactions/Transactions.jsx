/////////////// IMPORTS
import React, { useEffect } from "react";
// components
import Title from "../Title";
// import StoreCard from "./StoreCard";
// actions
import { getTransactions } from "../../../store/actions/transactionsActions";
// material ui
import clsx from "clsx";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

// redux
import { connect } from "react-redux";
import { compose } from "redux";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  },
  tableRow: {
    height: "46px"
  },
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

/////////////// COMPONENT
const Transactions = props => {
  const classes = useStyles();
  // set props from redux
  const { auth, transactions } = props;
  useEffect(() => {
    if (auth.uid) {
      props.getTransactions(auth.uid);
    }
  }, [auth.uid]);

  // last_updated
  function date_formating(timeStamp, type) {
    const d = new Date(timeStamp * 1000);
    const year = d.getFullYear();
    const month = d.getMonth() < 9 ? "0" + d.getMonth() + 1 : d.getMonth() + 1;
    const day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
    const hour = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
    const min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
    const sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
    if (type === "date") return year + "/" + month + "/" + day;
    return year + "/" + month + "/" + day + " " + hour + ":" + min + ":" + sec;
  }

  console.log(transactions);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Title>Investment History</Title>
          <Table size="small">
            <TableHead>
              <TableRow className={classes.tableRow}>
                <TableCell>Name</TableCell>
                <TableCell>Earnings</TableCell>
                <TableCell>Cost</TableCell>
                <TableCell>Profit</TableCell>
                <TableCell>Invested Start</TableCell>
                <TableCell>Invested End</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                (transactions.investments.sort((a, b) => {
                  if (a.timestamp_start.seconds < b.timestamp_start.seconds)
                    return 1;
                  if (a.timestamp_start.seconds > b.timestamp_start.seconds)
                    return -1;
                  return 0;
                }),
                transactions.investments.map(row => (
                  <TableRow key={row.user_id} className={classes.tableRow}>
                    <TableCell>{row.username}</TableCell>
                    <TableCell align="right">{row.points_earned}</TableCell>
                    <TableCell align="right">{row.points_cost}</TableCell>
                    <TableCell align="right">
                      {row.points_earned - row.points_cost}
                    </TableCell>
                    <TableCell>
                      {date_formating(row.timestamp_start.seconds, "date")}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        if (row.timestamp_end) {
                          return date_formating(
                            row.timestamp_end.seconds,
                            "date"
                          );
                        } else {
                          return "-";
                        }
                      })()}
                    </TableCell>
                  </TableRow>
                )))
              }
            </TableBody>
          </Table>
          <div className={classes.seeMore}>
            LastUpdated{" "}
            {(() => {
              const last_updated = date_formating(
                transactions.last_updated.seconds
              );
              if (last_updated !== "NaN/NaN/NaN NaN:NaN:NaN") {
                return last_updated;
              }
            })()}
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    transactions: state.transactions,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getTransactions: authId => dispatch(getTransactions(authId))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  Transactions
);
