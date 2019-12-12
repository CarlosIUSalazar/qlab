/////////////// IMPORTS
import React from "react";
import { useEffect } from "react";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// components
import Chart from "./Chart";
import QPoints from "./QPoints.jsx";
import PerformanceTable from "./PerformanceTable";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
// actions
import { getUserAndLogin } from "../../../store/actions/userActions";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

/////////////// COMPONENT
const Stats = props => {
  const classes = useStyles();
  const { auth } = props;

  useEffect(() => {
    if (auth.isLoaded) {
      props.getUserAndLogin(auth);
    }
    // eslint-disable-next-line
  }, [auth.isLoaded]);

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return (
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={9}>
        <Paper className={fixedHeightPaper}>
          <Chart />
        </Paper>
      </Grid>
      {/* QPoints */}
      <Grid item xs={12} md={4} lg={3}>
        <Paper className={fixedHeightPaper}>
          <QPoints />
        </Paper>
      </Grid>
      {/* PerformanceTable */}
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <PerformanceTable />
        </Paper>
      </Grid>
    </Grid>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getUserAndLogin: auth => dispatch(getUserAndLogin(auth))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(Stats);
