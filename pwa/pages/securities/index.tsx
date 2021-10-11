import React from "react";
import Layout from "../../components/common/layout";
import Grid from "@material-ui/core/Grid";
import PageHeader from "../../components/common/pageheader";
import Box from "@material-ui/core/Box";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import SecuritiesTable from "../../components/securities/table";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";
import MenuItem from '@material-ui/core/MenuItem';
import {Select, FormControl, FormLabel} from '@material-ui/core';
import Link from "@material-ui/core/Link";


function Index() {
  const title = 'Waardepapieren'
  const description = 'Omschrijving'
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
  const classes = useStyles();

  // Style modal
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [setType] = React.useState('');
  const handleChange = (event) => {
    setType(event.target.value);
  };

  return <>
    <Layout title={title} description="waar kan ik deze description zien">

      <Grid container>
        <Grid item sm={12} md={12}>
          <PageHeader title={title}/>
          <Box paddingTop={2} paddingBottom={2}>
            <p>{description}</p>
          </Box>
          <Grid className={classes.marginTop} container spacing={4}>
            <Grid item xs={12} sm={12} md={12}>
              <Box style={{marginBottom: '5px'}} sx={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button variant="outlined" onClick={handleOpen}>Add new</Button>
              </Box>
              <SecuritiesTable/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Layout>
    <div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Waardepapier
          </Typography>
          <Typography id="modal-modal-description" style={{marginTop: 20}}>
            Naam persoon + adres
          </Typography>
          <Typography id="modal-modal-select" style={{marginTop: 20}}>
            <FormControl fullWidth>
              <FormLabel id="securety">Kies een waardepapier:</FormLabel>
              <Select
                labelId="securety"
                id="secureties"
                value="testen testen testen"
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
              </Select>
            </FormControl>
          </Typography>
          <Typography id="modal-modal-footer" style={{marginTop: 20, float: "right"}}>
            <Button variant="outlined" color="primary">
              <Link>
                Create
              </Link>
            </Button>
          </Typography>
        </Box>
      </Modal>
    </div>
  </>
}

export default Index
