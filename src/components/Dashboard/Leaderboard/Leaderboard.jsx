/////////////// IMPORTS
import React from "react";
// components
import Leaders from "./Leaders";
import Dialog from "../../Utility/Dialog";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// react-router
import { Redirect } from "react-router-dom";
// redux
import { connect } from "react-redux";
import { compose } from "redux";
// actions
import { getLeaderboard } from "../../../store/actions/leaderboardActions";
import { addInvestment } from "../../../store/actions/investmentActions";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
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
  }
}));

/////////////// COMPONENT
const Leaderboard = props => {
  const classes = useStyles();
  React.useEffect(() => {
    props.getLeaderboard();
    // eslint-disable-next-line
  }, []);
  // set props from redux
  const { auth } = props;

  // if auth lot loaded, don't worry
  if (auth.isLoaded) {
    // if no auth, redirect to front page
    if (auth.isEmpty) return <Redirect to="/" />;
  }

  return (
    <React.Fragment>
      <Dialog dialogCallback={props.addInvestment} />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Leaders addInvestment />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getLeaderboard: () => dispatch(getLeaderboard()),
    addInvestment: (data, auth, user) =>
      dispatch(addInvestment(data, auth, user))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(
  Leaderboard
);
