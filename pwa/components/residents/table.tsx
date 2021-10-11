import React from 'react';
import Link from '@material-ui/core/Link';
import {useGet} from "restful-react";
import {DataGrid, GridRenderCellParams} from "@mui/x-data-grid";

export default function ResidentTable({residents = null}) {

  if (residents == null) {
    var {data: residents} = useGet({
      path: "/attributes"
    });
  }

  /* lets catch hydra */
  if (residents != null && residents["results"] !== undefined) {
    residents = residents["results"];

    for (let i = 0; i < residents.length; i++) {
      residents[i].id = residents[i].identificatie;
    }
  }

  const columns = [
    {field: 'name', headerName: 'Given name', flex: 1},
    {field: 'type', headerName: 'Last name', flex: 1}, {
      field: 'id',
      headerName: 'View', renderCell: (params: GridRenderCellParams) => (
        <strong>
          <Link
            href={"/attributes/" + params.value}
          >
            View
          </Link>
        </strong>
      ), flex: 1
    }
  ];


  return (
    <div style={{height: 400, width: '100%'}}>
      {residents ? (
          <DataGrid
            rows={residents}
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
