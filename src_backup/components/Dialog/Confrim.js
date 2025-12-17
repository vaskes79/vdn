import React, { useContext, useState } from 'react';
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
import { VdnAppContext } from 'components/VdnApp';

import styles from './styles';

const Confirm = ({ classes, type, id, title, description }) => {
  const [open, setOpen] = useState(false);
  const {
    setPlaying,
    update,
    setUrlVideo,
    db: { removeNote, removeVideo }
  } = useContext(VdnAppContext);

  const handleClickOpen = () => {
    setOpen(true);
    setPlaying(false);
  };

  const handleOk = () => {
    if (type === 'note') {
      removeNote(id);
      setPlaying(true);
    }
    if (type === 'video') {
      removeVideo(id);
      setUrlVideo('https://youtu.be/cCOL7MC4Pl0');
      setPlaying(false);
    }
    update();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
    setPlaying(true);
  };

  const handleEntering = () => {
    setPlaying(false);
  };

  return (
    <>
      <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
        <DeleteIcon />
      </IconButton>

      <Dialog
        maxWidth="sm"
        onEntering={handleEntering}
        onClose={handleCancel}
        aria-labelledby="confirmation-dialog-title"
        fullWidth
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
