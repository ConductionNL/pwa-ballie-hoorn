import * as React from 'react';
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Modal from '@material-ui/core/Modal';
import { ReactDOM } from "react";
import {FormControl, FormLabel, Select} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";

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

export default function SecurityModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [setType] = React.useState('');
  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
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
  );
}

const props = {};

// ReactDOM.render(<SecurityModal {...props} />, document.getElementById('main'))
