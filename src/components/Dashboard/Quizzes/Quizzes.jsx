import React from "react";
// components
import QuizCard from "./QuizCard";
// material ui
import clsx from "clsx";
import { Grid, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// styles
const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  paper: {
    padding: theme.spacing(3),
    display: "flex",
    overflow: "auto",
    flexDirection: "column"
  },
  fixedHeight: {
    height: 240
  }
}));

export default function Quizzes() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  let state = {
    // will get Quizzes from database
    Quizzes: [
      {
        quizId: "quiz1",
        quizTitle: "Mars",
        quizDescription: "The red planet."
      },
      {
        quizId: 2,
        quizTitle: "Oxygen",
        quizDescription: "It's everywhere."
      },
      {
        quizId: 3,
        quizTitle: "Mammals",
        quizDescription: "What are whales?"
      },
      {
        quizId: 4,
        quizTitle: "Japan",
        quizDescription: "Land of the rising sun."
      },
      {
        quizId: 5,
        quizTitle: "Derek's An Ass",
        quizDescription: "Totally."
      },
      {
        quizId: 6,
        quizTitle: "Astronomy",
        quizDescription: "Look right up!"
      }
    ]
  };

  return (
    <React.Fragment>
      <Grid container spacing={3} wrap="wrap">
        {state.Quizzes.map(quiz => {
          return (
            <Grid item xs lg={4}>
              <Paper className={fixedHeightPaper}>
                <QuizCard
                  quizTitle={quiz.quizTitle}
                  quizId={quiz.quizId}
                  quizDescription={quiz.quizDescription}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </React.Fragment>
  );
}
