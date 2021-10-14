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
import {ClaimModal} from "../../components/claims/ClaimModal";

const useStyles = makeStyles((theme) => ({
  inputStyle: {
      width: '400px',
  }
}));

function Index() {
  const router = useRouter();
  const classes = useStyles();
  const context = useAppContext();
  const userContext = useUserContext();
  const residentContext = useResidentContext();

  const title = 'Waardepapieren';

  const [results, setResults] = React.useState(null);

  const [bsnInputError, setBsnInputError] = React.useState(false);
  const [bsnInputHelperText, setBsnInputHelperText] = React.useState('');

  const checkInputs = () => {
    let valid = true;

    let bsnInput = (document.getElementById('bsn') as HTMLInputElement);

    setBsnInputError(false);
    setBsnInputHelperText('');


    if (bsnInput.value.length == 0) {
      valid = false;
      setBsnInputError(true);
      setBsnInputHelperText('burgerservicenummer is verplicht');
    }

    return valid;
  }

  const handleBsn = () => {
    if (typeof window !== 'undefined') {

      let valid = checkInputs();

      if (!valid) {
        return;
      }

      let bsnInput = (document.getElementById('bsn') as HTMLInputElement);

      fetch(context.apiUrl + "/gateways/brp/ingeschrevenpersonen?burgerservicenummer=" + bsnInput.value, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
        },
      })
        .then(response => response.json())
        .then((data) =>  {
          setResults(data);
        });

    }
  }

  const processBsn = (item) => {
    residentContext.setResident(item);
    sessionStorage.setItem('resident', JSON.stringify(item));

    router.push('/claims/data');
  }

  return <>
    {
      userContext.user == null
        ?
          <LoginRequiredPage />
        :
          <Layout title={title} description="waar kan ik deze description zien">
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <PageHeader title="Inwoner selecteren" crumbs={
                  [
                    {
                      name: "waardepapieren"
                    },
                    {
                      name: "inwoner selecteren",
                    }
                  ]
                }
                />


                <Typography mb="10px">
                  Vul het burgerservicenummer in van de inwoner
                </Typography>

                <TextField
                  id="bsn"
                  label="Burgerservicenummer"
                  required
                  variant="outlined"
                  className={classes.inputStyle}
                  error={bsnInputError}
                  helperText={bsnInputHelperText}
                />
                <br/>
                <br/>

                <Button color="primary" onClick={handleBsn} sx={{marginBottom: "20px"}} type="button" variant="contained" endIcon={<SearchIcon/>}>Zoeken</Button>


                <Typography variant="h5">
                  Gevonden personen
                </Typography>
                <Typography mb="10px">
                  Staat de inwoner niet in de lijst, controleer dan het ingevulde burgerservicenummer en probeer opnieuw.
                </Typography>

                <div>
                  {
                    results !== undefined && results !== null && results['hydra:member'] !== undefined &&
                    results['hydra:member'].map((result) => (
                      <Grid sx={{marginBottom: "5px"}}>
                        <Button
                          onClick={() => {processBsn(result)}}
                          color="primary" type="button" variant="contained" endIcon={<ChevronRight/>}>
                          {result.naam.aanschrijfwijze}
                        </Button>
                      </Grid>
                    ))
                  }
                </div>

              </Grid>
            </Grid>
          </Layout>
    }
  </>;
}

export default Index
