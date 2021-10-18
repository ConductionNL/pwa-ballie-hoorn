import Button from "@mui/material/Button";
import React, {useEffect} from "react";
import PageHeader from "../../components/common/pageheader";
import Typography from '@mui/material/Typography';
import Layout from "../../components/common/layout";
import Grid from "@mui/material/Grid";
import makeStyles from '@mui/styles/makeStyles';
import {TextField} from "@mui/material";
import {useAppContext} from "../../components/context/state";
import SearchIcon from '@mui/icons-material/Search';
import {ChevronRight} from "@material-ui/icons";
import {useUserContext} from "../../components/context/userContext";
import LoginRequiredPage from "../../components/common/loginRequiredPage";
import {useResidentContext} from "../../components/context/residentContext";
import {useRouter} from "next/router";
import ClaimsTable from "../../components/claims/table";

const useStyles = makeStyles((theme) => ({
  inputStyle: {
      width: '400px',
  }
}));

function Index() {
  const userContext = useUserContext();
  const residentContext = useResidentContext();
  const title = 'Waardepapieren';
  const router = useRouter();

  useEffect(() => {
    if (residentContext.resident == null) {
      router.push('/claims');
    }
  }, []);

  return <>
    {
      userContext.user == null
        ?
          <LoginRequiredPage />
        :
          <Layout title={title} description="waar kan ik deze description zien">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                {
                  residentContext.resident !== null &&
                  <>
                    <PageHeader title="Waardepapieren" crumbs={
                      [
                        {
                          name: "waardepapieren"
                        },
                        {
                          name: "inwoner selecteren",
                          link: "/claims"
                        },
                        {
                          name: residentContext.resident.naam.aanschrijfwijze
                        },
                        {
                          name: "waardepapieren"
                        }
                      ]
                    }
                    />
                    <Typography>
                      In deze tabel staan de huidige waardepapieren van {residentContext.resident.naam.aanschrijfwijze}
                    </Typography>
                    <br/>
                    <br/>
                    <ClaimsTable />
                  </>
                }
              </Grid>
            </Grid>
          </Layout>
    }
  </>;
}

export default Index
