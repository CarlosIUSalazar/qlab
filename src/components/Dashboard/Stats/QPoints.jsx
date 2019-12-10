/////////////// IMPORTS
import React from "react";
// components
import Title from "../Title";
// material ui
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

/////////////// UTILITIES
function preventDefault(event) {
  event.preventDefault();
}

/////////////// STYLES
const useStyles = makeStyles({
  depositContext: {
    flex: 1
  },
  points: {
    fontSize: "4.5rem"
  }
});

/////////////// COMPONENT
export default function QPoints() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>qPoints</Title>
      <Typography className={classes.points} component="p" variant="h4">
        9999
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {new Date().toDateString()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Buy goodies
        </Link>
      </div>
    </React.Fragment>
  );
}
