import Button from "@mui/material/Button";
import React, {useEffect} from "react";
import PageHeader from "../../components/common/pageheader";
import Typography from '@mui/material/Typography';
import Layout from "../../components/common/layout";
import Grid from "@mui/material/Grid";
import makeStyles from '@mui/styles/makeStyles';
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {useAppContext} from "../../components/context/state";
import SearchIcon from '@mui/icons-material/Search';
import {ChevronRight} from "@material-ui/icons";
import {useUserContext} from "../../components/context/userContext";
import LoginRequiredPage from "../../components/common/loginRequiredPage";
import {useResidentContext} from "../../components/context/residentContext";
import {useRouter} from "next/router";
import ClaimsTable from "../../components/claims/table";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import StaticDatePicker from "@mui/lab/StaticDatePicker";

const useStyles = makeStyles((theme) => ({
  inputStyle: {
      width: '400px',
  }
}));

function Index() {
  const userContext = useUserContext();
  const context = useAppContext();
  const title = 'Waardepapieren';

  const [fileType, setFileType] = React.useState('csv');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  useEffect(() => {
    if(startDate > endDate) {
      setEndDate(startDate);
    }
  }, [startDate])

  const handleExport = event => {
    event.preventDefault();
    console.log(context.apiUrl + "/gateways/register/certificates." + fileType +"?&dateCreated[after]=" + startDate.toISOString().split('T')[0] + '&dateCreated[before]=' + endDate.toISOString().split('T')[0]);
    return;
    fetch(context.apiUrl + "/gateways/register/certificates?&dateCreated[after]=" + startDate.toISOString().split('T')[0] + '&dateCreated[before]=' + endDate.toISOString().split('T')[0], {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': fileType,
        'Authorization': 'Bearer ' + sessionStorage.getItem('jwt')
      },
    }).then(response => response.json())
      .then((data) =>  {
        console.log(data)
      });
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
                <PageHeader title="Waardepapieren" crumbs={
                  [
                    {
                      name: "waardepapieren"
                    },
                    {
                      name: "export",
                    },
                  ]
                }
                />


                <Typography>
                  Export waardepapieren data
                </Typography>
                <br/>
                <br/>

                <form onSubmit={handleExport}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Bestand Type</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={fileType}
                      label="Bestand Type"
                      onChange={handleFileTypeChange}
                    >
                      <MenuItem value="csv">csv</MenuItem>
                    </Select>
                  </FormControl>
                  <br/>
                  <br/>

                  <Grid container spacing={2}>
                    <Grid item xs={12} lg={6} sx={{textAlign: "center"}}>
                      <InputLabel id="demo-simple-select-label">Start datum</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                          displayStaticWrapperAs="desktop"
                          openTo="day"
                          value={startDate}
                          onChange={(newValue) => {
                            setStartDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12} lg={6} sx={{textAlign: "center"}}>
                      <InputLabel id="demo-simple-select-label">Eind datum</InputLabel>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <StaticDatePicker
                          minDate={startDate}
                          displayStaticWrapperAs="desktop"
                          openTo="day"
                          value={endDate}
                          onChange={(newValue) => {
                            setEndDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                  </Grid>



                  <br/>

                  <Button color="primary" sx={{width: "100%"}} type="submit" variant="contained" >Exporteren</Button>
                </form>

              </Grid>
            </Grid>
          </Layout>
    }
  </>;
}

export default Index
