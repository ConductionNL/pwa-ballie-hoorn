import React from "react";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import List from "@mui/material/List";
import {useUserContext} from "../context/userContext";

const PageHeader = ({ title="Welcome to Demodam!", crumbs=[], h1=false, description="default-description"}) => {
  let userContext = useUserContext();

    return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/user" >
          Home
        </Link>
        {
          crumbs.map(crumb => {
            return crumb.link !== undefined ?
                <Link color="inherit" href={crumb.link}>
                  {crumb.name}
                </Link>
                :
                <Typography color="textPrimary">
                  {crumb.name}
                </Typography>
          })
        }

      </Breadcrumbs>
      {
        h1 == true ?
          <Typography variant="h1">
            {title}
          </Typography> :
          <Typography variant="h4">
            {title}
          </Typography>
      }
    </>
  );

}

export default PageHeader;
