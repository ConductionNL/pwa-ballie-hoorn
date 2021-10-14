import {useRouter} from 'next/router'
import Button from "@mui/material/Button";
import React from "react";
import Link from 'next/link'

import Header from "../../components/common/header";
import Container from "@mui/material/Container";
import Footer from "../../components/common/footer";
import Typography from '@mui/material/Typography';
import Layout from "../../components/common/layout";
import Grid from "@mui/material/Grid";
import Hidden from "@mui/material/Hidden";
import ActionMenu from "../../components/common/actionmenu";
import PageHeader from "../../components/common/pageheader";
import Box from "@mui/material/Box";


const Proof = () => {
  const router = useRouter()


  const title = 'Mijn claim';

    return <>
      <Layout title={title} description="waar kan ik deze description zien">

        <Grid container>
          <Hidden mdDown>
            <Grid item md={3}>
              <ActionMenu/>
            </Grid>
          </Hidden>

          <Grid item xs={12} md={9}>
            <PageHeader title={title}/>

            <Box paddingTop={2} paddingBottom={2}>
              <p>Beschrijving...</p>
            </Box>

          </Grid>
        </Grid>
      </Layout>
    </>;
  }


export default Proof
