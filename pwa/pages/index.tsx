import React from 'react';
import Grid from '@mui/material/Grid';

import ActionMenu from 'components/common/actionmenu';
import { RestfulProvider } from "restful-react";

import Layout from 'components/common/layout';
import {setCookie} from "../components/utility/CookieHandler";
import {useRouter} from "next/router";
import PaperCard from "../components/common/paperCard";

const handleLogin = () => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    let url = new URL(window.location.href);

    if (url.searchParams.get('bsn')) {
      setCookie('bsn', url.searchParams.get('bsn'), 5);
    }

    if (url.searchParams.get('name')) {
      setCookie('name', url.searchParams.get('name'), 5);
      router.push('/user');
    }

  }
}

const Welcome = () => (
  <>
    <Layout title="Waardepapieren ballie interface" description="waar kan ik deze description zien">
      {
        handleLogin()
      }
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8} md={6}>
          <PaperCard
            title="Waardepapieren"
            description="Waardepaieren zijn door de overheid uitgegeven bewijsstukken ten aanzien van door de overheid beheerde gegevens (zo als geboorte, overleiden, huwelijk en woonadress). Ze worden digitaal uitgegeven als pdf en voorzien van een QR code als echteheids kenmerk"
            link="/claims"
            linkText="Lees meer "
          />
        </Grid>
      </Grid>
    </Layout>
  </>
);

export default Welcome;

