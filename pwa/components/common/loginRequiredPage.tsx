import React from "react";
import Layout from "../../components/common/layout";
import Grid from "@mui/material/Grid";

import makeStyles from '@mui/styles/makeStyles';
import {Typography} from "@mui/material";
import {LoginRequiredModal} from "./LoginRequiredModal";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  gridMarginTop: {
    marginTop: '20px',
  }
}));

function LoginRequiredPage() {
  const classes = useStyles();

  const title = 'Inloggen';

  return <>
    <Layout title={title} description="waar kan ik deze description zien">
      <Grid>
        <Grid sx={{textAlign: "center"}} item sm={12}>
          <Typography variant="h2" mb={4} mt={4} fontWeight="medium">
            Inloggen vereist
          </Typography>
          <Typography sx={{marginBottom: '50px'}}>
            Om de informatie op deze pagina te kunnen zien dient u ingelogd te zijn
          </Typography>
          <LoginRequiredModal />
        </Grid>
      </Grid>
    </Layout>
  </>;
}

export default LoginRequiredPage
