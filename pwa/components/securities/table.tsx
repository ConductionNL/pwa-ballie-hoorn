import React from 'react';
import Link from '@material-ui/core/Link';
import {useGet} from "restful-react";
import {DataGrid, GridRenderCellParams} from "@mui/x-data-grid";
import {PictureAsPdfOutlined, CropSquare} from "@material-ui/icons";

export default function SecuritiesTable({securities = null}) {

  if (securities == null) {
    var {data: securities} = useGet({
      path: "/attributes"
    });
  }

  /* lets catch hydra */
  if (securities != null && securities["results"] !== undefined) {
    securities = securities["results"];

    for (let i = 0; i < securities.length; i++) {
      securities[i].id = securities[i].identificatie;
    }
  }

  const columns = [
    {field: 'name', headerName: 'Name', flex: 1},
    {field: 'type', headerName: 'Last name', flex: 1},
    {field: 'id',
      headerName: 'View', renderCell: (params: GridRenderCellParams) => (
        <strong>
          <Link style={{marginLeft: 20}}
            href={"/attributes/" + params.value}
          >
            <PictureAsPdfOutlined />
          </Link>
          <Link style={{marginLeft: 20}}
            href={"/attributes/" + params.value}
          >
            <CropSquare />
          </Link>
        </strong>
      ), flex: 1 }
  ];


  return (
    <div style={{height: 400, width: '100%'}}>
      {securities ? (
          <DataGrid
            rows={securities}
            columns={columns}
            pageSize={20}
            rowsPerPageOptions={[100]}
            disableSelectionOnClick
          />
        )
        :
        (
          <DataGrid
            rows={[]}
            loading={true}
            columns={columns}
            pageSize={100}
            rowsPerPageOptions={[100]}
            checkboxSelection
            disableSelectionOnClick
          />
        )
      }
    </div>
  );
}
