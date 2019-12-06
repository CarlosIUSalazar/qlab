import React from "react";
// firebase
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
// material ui
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./ListItems";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";

//Placeholder Avatar while account Loads - currently Vic
import placeholderAvatar from "../../assets/images/carefulwiththataxevic.gif";

// Firebasey Imports
import { connect } from "react-redux";

//Redux
import { compose } from "redux";
// import { firestoreConnect } from "react-redux-firebase";

//Routing
import { Redirect } from "react-router-dom";

// react-router
import { Link } from "react-router-dom";

//Actions
import { getUserAndLogin, userLogout } from "../../store/actions/userActions";

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  username: {
    margin: 0
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  button: {
    // background: "rgb(92,27,249)",
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 50,
    border: "solid white 1px",
    color: "#FFF",
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none !important",
    padding: "10px 10px 10px 10px"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    background:
      "linear-gradient(90deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
    color: "#fff"
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    background:
      "linear-gradient(90deg, rgba(169,101,255,1) 0%, rgba(92,27,249,1) 100%)",
    color: "#fff"
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
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
  },
  fixedHeight: {
    height: 240
  }
}));

const Sidebar = props => {
  const classes = useStyles();
  //Set Props from Redux
  const { auth, user } = props;

  //If Auth Not Loaded, Don't Worry
  if (auth.isLoaded) {
    //If No Auth, Redirect To Front Page
    if (auth.isEmpty) return <Redirect to="/login" />;
    //If Auth, get User Data and Set Login to True -- TODO, MAYBE THIS SHOULD GO ON THE LOGIN SCREEN?
    props.getUserAndLogin(auth.uid);
  }

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(
          classes.drawerPaper,
          !props.open && classes.drawerPaperClose
        )
      }}
      open={props.open}
    >
      <div className={classes.toolbarIcon}>
        <Grid container>
          <Grid item xs={4}>
            <Avatar
              alt="useravatar"
              src={auth.photoURL || placeholderAvatar}
            />
          </Grid>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          // xs={8}
          >
            <Typography
              className={classes.username}
              variant="subtitle1"
              display="block"
              gutterBottom
            >
              {user.userProfile ? user.userProfile.username : "...loading"}
            </Typography>
          </Grid>
        </Grid>
        <IconButton onClick={props.handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainListItems}</List>
      <Divider />
      <List>{secondaryListItems(props)}</List>
      <Divider />
      {/* <Link
        className={classes.button}
        style={{ textDecoration: "none" }}
        to="/quiz"
      >
        quiz
      </Link> */}
    </Drawer>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserAndLogin: authId => dispatch(getUserAndLogin(authId)),
    userLogout: () => dispatch(userLogout())
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Sidebar);
