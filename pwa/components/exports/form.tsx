import * as React from 'react';
import Box from "@mui/material/Box";
import {Card, TextField} from '@mui/material';
import Grid from "@mui/material/Grid";
import MenuItem from '@mui/material/MenuItem';
import {Select, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel} from '@mui/material';
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import makeStyles from '@mui/styles/makeStyles';
import {useRouter} from "next/router";
import {useGet} from "restful-react";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
  },
  gridMarginTop: {
    marginTop: '20px',
  }
}));

export default function ExportsForm() {
  const classes = useStyles();

  return (
    <Box paddingTop={3} paddingBottom={2}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
          <Card className={classes.root}>
            <CardContent>
                  <Grid item md={12}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="dateFrom"
                      label="Date from"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid md={12}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="dateUntil"
                      label="Date until"
                      type="date"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="standard"
                    />
                  </Grid>
                  <Grid item md={12}>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="type"
                      label="File type"
                      type="text"
                      variant="standard"
                    />
                  </Grid>
              <Grid container spacing={4} style={{marginTop: 20}}>
                <Grid item xs={6} sm={6} md={6}>
                  <div>
                    <Button variant="outlined">Opslaan</Button>
                  </div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
