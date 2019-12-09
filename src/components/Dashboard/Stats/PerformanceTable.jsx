import React from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "../Title";

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(0, "16 Nov, 2019", "José", "432", "✅❌❌✅✅", "4 Dec, 2019"),
  createData(
    1,
    "16 Nov, 2019",
    "Juanito",
    "43123",
    "❌❌✅❌✅",
    "2 Oct, 2019"
  ),
  createData(
    3,
    "16 Nov, 2019",
    "Miguelito",
    "654",
    "✅✅✅✅✅",
    "4 Nov, 2019"
  ),
  createData(4, "15 Nov, 2019", "Alejandra", "666", "✅❌❌❌❌", "3 Dec, 2019")
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles(theme => ({
  seeMore: {
    marginTop: theme.spacing(3)
  }
}));

export default function PerformanceTable() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Your Friends</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>qScore</TableCell>
            <TableCell>Performance</TableCell>
            <TableCell align="right">Last Login</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          Discover more investments
        </Link>
      </div>
    </React.Fragment>
  );
}
