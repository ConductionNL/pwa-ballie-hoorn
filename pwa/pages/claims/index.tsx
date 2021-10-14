import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from '@mui/material/Box';
import React from "react";
import Footer from "../../components/common/footer";
import Head from "next/head";
import Header from "../../components/common/header";
import PageHeader from "../../components/common/pageheader";
import Typography from '@mui/material/Typography';
import Link from 'next/link'

import Layout from "../../components/common/layout";
import Grid from "@mui/material/Grid";
import Hidden from '@mui/material/Hidden';
import ActionMenu from "../../components/common/actionmenu";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import ClaimsTable from "../../components/claims/table";

import makeStyles from '@mui/styles/makeStyles';
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  gridMarginTop: {
    marginTop: '20px',
  }
}));

function Index() {
  const classes = useStyles();

  const title = 'Waardepapieren';

  return <>
    <Layout title={title} description="waar kan ik deze description zien">
      <Grid container >
        <Hidden mdDown>
          <Grid item md={3}>
            <ActionMenu />
          </Grid>
        </Hidden>
        <Grid item sm={12} md={9}>
          <PageHeader title={title} />

          <Box paddingTop={3} paddingBottom={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Card className={classes.root}>
                  <CardContent>
                    <ClaimsTable/>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid className={classes.gridMarginTop} container spacing={2}>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Layout>
  </>;
}

export default Index
