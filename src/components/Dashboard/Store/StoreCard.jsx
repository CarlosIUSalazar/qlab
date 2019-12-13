/////////////// IMPORTS
import React from "react";
// redux
import { compose } from "redux";
import { Typography, Grid } from "@material-ui/core";
// react-router
import { Link } from "react-router-dom";
// actions
import { openDialog } from "../../../store/actions/dialogActions";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart"; // redux
import { connect } from "react-redux";

/////////////// STYLES
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  button: {
    minWidth: "120px",
    margin: theme.spacing(3),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    borderRadius: 50,
    fontSize: 20,
    textTransform: "none",
    textDecoration: "none !important",
    padding: theme.spacing(2),
    color: "rgb(92, 27, 249)",
    transition: "ease-in-out 0.15s",
    background: "whitesmoke",
    "&:hover": {
      background: "rgb(92, 27, 249)",
      color: "whitesmoke"
    },
    boxShadow:
      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  }
}));

/////////////// COMPONENT
const StoreCard = props => {
  const classes = useStyles();

  const { itemData } = props;

  return (
    <Grid
      className={classes.root}
      container
      alignItems="center"
      justify="space-around"
      direction="column"
    >
      <Typography
        className={classes.title}
        component="h2"
        variant="h6"
        color="primary"
        gutterBottom
      >
        {itemData.name}
      </Typography>
      <ShoppingCartIcon fontSize="large" />
      <Typography className={classes.description} variant="body2">
        {itemData.description}
      </Typography>
      <Link
        to="/dashboard/store"
        className={classes.button}
        style={{ textDecoration: "none" }}
        onClick={() => {
          props.openDialog(true, {
            ...itemData,
            msg: `${itemData.name} for ${itemData.price}`,
            date: new Date().toString()
          });
        }}
      >
        {props.itemData.price}
        <span
          className="qPointsMark"
          style={{
            fontSize: "smaller"
          }}
        >
          <sup>ℚ</sup>
        </span>
      </Link>
    </Grid>
  );
};

/////////////// REDUX
const mapStateToProps = (state, ownProps) => {
  return {
    storeItems: state.store.items
  };
};
const mapDispatchToProps = dispatch => {
  return {
    openDialog: (open, data) => dispatch(openDialog(open, data))
  };
};

/////////////// EXPORTS
export default compose(connect(mapStateToProps, mapDispatchToProps))(StoreCard);
