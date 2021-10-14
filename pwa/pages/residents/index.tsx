import React from "react";
import Layout from "../../components/common/layout";
import Grid from "@material-ui/core/Grid";
import PageHeader from "../../components/common/pageheader";
import Box from "@material-ui/core/Box";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Searchbar from "../../components/residents/searchbar";
import ResidentTable from "../../components/residents/table";

function Index() {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
      },
      marginTop: {
        marginTop: 20,
      },
    }),
  );

  const title = 'Inwoners'
  const description = 'Zoek op inwoner, BSN of trefwoord'
  const classes = useStyles();

  return <>
    <Layout title={title} description="waar kan ik deze description zien">

      <Grid container >
        <Grid item sm={12} md={12}>
          <PageHeader title={title} />
          <Box paddingTop={2} paddingBottom={2}>
            <p>{description}</p>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Searchbar />
            </Grid>
          </Grid>
          <Grid className={classes.marginTop} container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <ResidentTable />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  </>
}

export default Index
