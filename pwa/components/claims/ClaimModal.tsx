import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Alert, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";
import {useAppContext} from "../context/state";
import {useUserContext} from "../context/userContext";
import {useResidentContext} from "../context/residentContext";

export function ClaimModal() {
  const [open, setOpen] = React.useState(false);
  const [type, setType] = React.useState('akte_van_geboorte');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  }

  const context = useAppContext();
  const userContext = useUserContext();
  const residentContext = useResidentContext();

  const handleClaim = event => {
    event.preventDefault();

    let data = {
      organization: '001516814',
      type: type,
      person: context.brpUrl + "/ingeschrevenpersonen/uuid/" + residentContext.resident['id']
    }

    fetch(context.apiUrl + '/gateways/service/certificates', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          handleClose();
          window.location.reload(); // TODO: do something else to refresh the table, not the page!
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((data) =>  {
        if (typeof window !== "undefined") {
          console.log(data);
          handleClose();
        }
      }).catch((error) => {
        console.log(error)
    });

  }

  return (
    <div>
      <Button color="primary" onClick={handleOpen} sx={{width: "400px", marginBottom: "100px"}} type="button" variant="contained" >Aanmaken</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'background.paper',
            border: '2px solid white',
            boxShadow: 24,
            p: 4,

          }}>
            <Typography id="transition-modal-title" variant="h5" mb={2} component="h2">
              Claim aanmaken
            </Typography>
            <br/>
            <form onSubmit={handleClaim}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Type"
                  onChange={handleChange}
                >
                  <MenuItem value="akte_van_geboorte">Akte van geboorte</MenuItem>
                  <MenuItem value="verklaring_van_in_leven_zijn">Verklaring van in leven zijn</MenuItem>
                  <MenuItem value="uittreksel_basis_registratie_personen">Uittreksel basis registratie personen</MenuItem>
                </Select>
              </FormControl>
              <br/>
              <br/>
              <Button color="primary" sx={{width: "100%"}} type="submit" variant="contained" >Aanmaken</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
