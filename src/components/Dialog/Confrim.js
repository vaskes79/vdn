import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  IconButton,
  DialogContent,
  DialogContentText,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import styles from './styles';

const Confirm = ({ classes, id, title, description }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOk = () => {
    console.log('Confirm handleOk ');
    setOpen(false);
  };

  const handleCancel = () => {
    console.log('Confirm handleCancel ');
    setOpen(false);
  };

  const handleEntering = () => {
    console.log('Confirm handleEntering ');
  };

  return (
    <>
      <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        onEntering={handleEntering}
        onClick={handleCancel}
        aria-labelledby="confirmation-dialog-title"
        open={open}
      >
        <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Typography variant="button" className={classes.confirmQuestion} color="secondary">
            delete this item?
          </Typography>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(Confirm);
