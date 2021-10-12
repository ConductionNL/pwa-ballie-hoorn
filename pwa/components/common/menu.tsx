import React, {useState} from 'react';
import {alpha, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from "@material-ui/core/Box";
import MenuIcon from '@material-ui/icons/Menu';
import Link from "next/link";
import Drawer from '@material-ui/core/Drawer';
import {useRouter} from 'next/router';
import ActionMenu from "../../components/common/actionmenu";
import {useAppContext} from "../context/state";
import {useUserContext} from "../context/userContext";
import {Button, Modal, TextField} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  list: {
    width: 250,
  },
  appbar: {
    backgroundColor: '#CA464C'
  },

  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const handleLogout = (context) => {

  if (typeof window !== "undefined") {
      context.user = null;

      // @ts-ignore
      window.location.href = 'http://localhost/logout';
    }
}

export default function MainMenu() {

  const router = useRouter()
  const classes = useStyles();

  const [state, setState] = React.useState({
    displayMenuDrawer: false,
    displayUserDrawer: false,
    loggedIn: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({...state, [anchor]: open});
  };

  const handleLogin = () => {
    let data = {
      name: 'gino kok',
      firstName: 'gino',
      lastName: 'kok'
    };

    localStorage.setItem('user', JSON.stringify(data));
    userContext.setUser(data);
  }

  const handleLogout = () => {
    localStorage.setItem('user', null);
    userContext.setUser(null);
  }

  let context = useAppContext();
  let userContext = useUserContext();


  //this is for local development
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const [modalStyle] = React.useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Login</h2>
      <div id="simple-modal-description" style={{textAlign: "center"}}>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" label="Username" />
          <TextField id="standard-basic" label="Password" />
          <Button type="submit">
            Login
          </Button>
        </form>
      </div>
    </div>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appbar}>
        <Container>
          <Toolbar>

            {
            <div className={classes.sectionMobile}>
              <IconButton aria-label="show 17 new notifications" color="inherit"
                          onClick={toggleDrawer('displayUserDrawer', true)}>
                <MenuIcon/>
              </IconButton>
              <Drawer anchor={'left'} open={state['displayUserDrawer']}
                      onClose={toggleDrawer('displayUserDrawer', false)}>
                <div
                  className={classes.list}
                  role="presentation"
                  onClick={toggleDrawer('displayUserDrawer', false)}
                  onKeyDown={toggleDrawer('displayUserDrawer', false)}
                >
                  <ActionMenu/>
                </div>
              </Drawer>
            </div>
            }

            <div className={classes.grow}/>

            <Box style={{marginRight: "15px"}}>
              <Typography variant="h6" color="inherit">
                {
                  userContext.user !== null &&
                  <Link href="/user" >
                  <span style={{color: 'white'}}>
                    {
                      userContext.user.name
                    }
                  </span>
                  </Link>
                }

              </Typography>
            </Box>
            <Box marginRight={2}>
              <Typography variant="h6" color="inherit">
                    {
                      userContext.user !== null
                        ?
                          <span onClick={handleLogout} style={{color: 'white'}}>Uitloggen</span>
                        :
                          // Local disabled
                          // <Link href="http://localhost/login/adfs/conduction" >
                          //   <span style={{color: 'white'}}>Inloggen</span>
                          // </Link>
                            <span onClick={handleOpen} style={{color: 'white'}}>Inloggen</span>
                    }
              </Typography>
            </Box>

          </Toolbar>
        </Container>
      </AppBar>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <p>
          {body}
        </p>
      </Modal>
    </div>
  );
}
