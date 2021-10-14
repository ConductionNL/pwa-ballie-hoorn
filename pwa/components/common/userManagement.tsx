import Logo from 'components/common/logo';
import MainMenu from 'components/common/menu';
import Container from '@mui/material/Container';
import makeStyles from '@mui/styles/makeStyles';
import Toolbar from "@mui/material/Toolbar";
import React, {useState} from "react";
import IconButton from "@mui/material/IconButton";
import {useAppContext} from "../context/state";
import {useGet} from "restful-react";
import {useUserContext} from "../context/userContext";
import {useRouter} from "next/router";


export default function UserManagement() {

  const userContext = useUserContext();

  const handleLogin = () => {
    if (typeof window !== "undefined") {
      if (sessionStorage.getItem('user') !== null) {
        userContext.setUser(JSON.parse(sessionStorage.getItem('user')));
      }
    }

    return null;
  }

  return (
    <div>
      {handleLogin()}
    </div>
  );
}
