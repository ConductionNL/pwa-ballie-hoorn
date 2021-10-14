import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {Alert, Snackbar, TextField} from "@mui/material";
import {ChevronRight} from "@mui/icons-material";
import {useAppContext} from "../context/state";
import {useUserContext} from "../context/userContext";

export function LoginRequiredModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openAlert, setOpenAlert] = React.useState(false);

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };

  const [usernameInputError, setUsernameInputError] = React.useState(false);
  const [usernameInputHelperText, setUsernameInputHelperText] = React.useState('');

  const [passwordInputError, setPasswordInputError] = React.useState(false);
  const [passwordInputHelperText, setPasswordInputHelperText] = React.useState('');

  const checkInputs = () => {
    let valid = true;

    let username = (document.getElementById('username') as HTMLInputElement);
    let password = (document.getElementById('password') as HTMLInputElement);

    setUsernameInputError(false);
    setUsernameInputHelperText('');
    setPasswordInputError(false);
    setPasswordInputHelperText('');

    if (username.value.length == 0) {
      valid = false;
      setUsernameInputError(true);
      setUsernameInputHelperText('gebruikersnaam is verplicht');
    }

    if (password.value.length == 0) {
      valid = false;
      setPasswordInputError(true);
      setPasswordInputHelperText('wachtwoord is verplicht');
    }

    return valid;
  }

  const context = useAppContext();
  const userContext = useUserContext();

  const handleLogin = () => {

    let valid = checkInputs();

    if (!valid) {
      return;
    }

    let username = (document.getElementById('username') as HTMLInputElement);
    let password = (document.getElementById('password') as HTMLInputElement);

    let data = {
      username: username.value,
      password: password.value
    };

    fetch(context.apiUrl + '/users/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((data) =>  {
        if (typeof window !== "undefined") {

          let result = {
            name: data.username,
          }
          userContext.setUser(result);
          sessionStorage.setItem('jwt', data.jwtToken)
          sessionStorage.setItem('user', JSON.stringify(result));
          handleClose();
        }
      }).catch((error) => {
      handleOpenAlert()
    });

  }

  return (
    <div>
      <Button color="primary" onClick={handleOpen} sx={{width: "400px", marginBottom: "100px"}} type="button" variant="contained" >Inloggen</Button>
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
              Inloggen
            </Typography>
            <TextField
              sx={{width: "100%"}}
              required
              error={usernameInputError}
              helperText={usernameInputHelperText}
              id="username"
              label="Gebruikersnaam"
              type="text"
              variant="outlined"
            />
            <br/>
            <br/>
            <TextField
              sx={{width: "100%"}}
              required
              error={passwordInputError}
              helperText={passwordInputHelperText}
              id="password"
              label="Wachtwoord"
              type="password"
              variant="outlined"
            />
            <br/>
            <br/>
            <Button color="primary" onClick={handleLogin} sx={{width: "100%"}} type="button" variant="contained" >Inloggen</Button>
          </Box>
        </Fade>
      </Modal>
      <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert severity="error" sx={{ width: '100%' }}>
          Ongeldige gebruikersnaam + wachtwoord combinatie
        </Alert>
      </Snackbar>
    </div>
  );
}
