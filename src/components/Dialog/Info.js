import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@material-ui/core';
import { Info as InfoIcon } from '@material-ui/icons';
import { VdnAppContext } from 'components/VdnApp';

import styles from './styles';
import About from 'components/About';

const Info = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const { setPlaying } = useContext(VdnAppContext);

  const handleClickOpen = () => {
    setOpen(true);
    setPlaying(false);
  };

  const handleClose = () => {
    setOpen(false);
    setPlaying(true);
  };

  return (
    <>
      <IconButton
        size="small"
        edge="start"
        className={classes.infoBtn}
        color="inherit"
        aria-label="info about project"
        onClick={handleClickOpen}
      >
        <InfoIcon className={classes.infoIcon} />
      </IconButton>
      <Dialog
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Info About Project</DialogTitle>
        <DialogContent>
          <About />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            close info
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(Info);
