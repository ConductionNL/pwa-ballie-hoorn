import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Alert, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField} from "@mui/material";
import {useAppContext} from "../context/state";
import {useUserContext} from "../context/userContext";
import {useResidentContext} from "../context/residentContext";
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

export function ExportModal() {
  const [open, setOpen] = React.useState(false);
  const [fileType, setFileType] = React.useState('text/csv');
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(new Date());

  const maxDateOfMoveObject = new Date();
  maxDateOfMoveObject.setDate(maxDateOfMoveObject.getDate() + 28);

  const handleFileTypeChange = (event) => {
    setFileType(event.target.value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const context = useAppContext();
  const userContext = useUserContext();
  const residentContext = useResidentContext();

  const handleExport = event => {
    event.preventDefault();

    if (startDate >= endDate) {
      // TODO: If startDate an endDate are not set, error
      console.log('start date should be before end date')
      console.log(startDate)
      console.log(endDate)
    }

    // TODO: Get file from gateway with person, startDate, endDate and fileType

    fetch(context.apiUrl + "/gateways/register/certificates?person=" + residentContext.resident['@id'] +
      '&startDate=' + startDate.toISOString().split('T')[0] + '&endDate=' + endDate.toISOString().split('T')[0], {
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

  return (
    <div>
      <Button color="primary" onClick={handleOpen} sx={{width: "400px", marginBottom: "100px"}} type="button" variant="contained" >Exporteren</Button>
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
              Claims exporteren
            </Typography>
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
                  <MenuItem value="text/csv">csv</MenuItem>
                </Select>
              </FormControl>
              <br/>
              <br/>

              <InputLabel id="demo-simple-select-label">Start datum</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  maxDate={new Date()}
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={new Date()}
                  onChange={(newValue) => {
                    setStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <InputLabel id="demo-simple-select-label">Eind datum</InputLabel>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  minDate={startDate}
                  maxDate={new Date()}
                  displayStaticWrapperAs="desktop"
                  openTo="day"
                  value={new Date()}
                  onChange={(newValue) => {
                    setEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <br/>

              <Button color="primary" sx={{width: "100%"}} type="submit" variant="contained" >Exporteren</Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
