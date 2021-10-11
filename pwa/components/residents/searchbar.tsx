import * as React from 'react';
import Box from "@material-ui/core/Box";
import {Paper, TextField} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);

export default function Searchbar() {
  const classes = useStyles();

  return (
    <Paper elevation={1}>
      <Box
        className={classes.root}
        component="form"
      >
        <TextField id="outlined-basic" label="Zoeken" variant="outlined" className={classes.root}/>
      </Box>
    </Paper>
  );
}
