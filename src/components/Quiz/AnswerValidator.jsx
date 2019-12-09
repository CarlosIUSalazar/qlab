import React from 'react'
import { withStyles }  from '@material-ui/core'

const styles = {
    Confirmation: {
      padding: 20,
      marginTop: 10,
      marginBottom: 10,
      height: 60,
      backgroundColor: 'red',
      '&:hover': {
          backgroundColor: 'blue'
       }
    }
  };

function AnswerValidator (props) {
    return (
        <div>{props.answerConfirmation}</div>
    )
}

export default withStyles(styles)(AnswerValidator);
