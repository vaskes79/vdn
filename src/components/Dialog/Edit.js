import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  DialogTitle,
  DialogActions,
  Dialog,
  IconButton,
  DialogContent,
  Typography,
  TextField
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import styles from './styles';
import { VdnAppContext } from 'components/VdnApp';

const Edit = ({ classes, id, url, title, label, note = false, video = false }) => {
  const [open, setOpen] = useState(false);
  const [titleForm, setTitleForm] = useState(title);
  const {
    db: { editVideo, editNote },
    setPlaying,
    update
  } = useContext(VdnAppContext);

  const handleClickOpen = () => {
    setOpen(true);
    setPlaying(false);
  };

  const handleOk = () => {
    if (video) editVideo(url, titleForm);
    if (note) editNote(id, titleForm);
    update();
    setOpen(false);
    setPlaying(true);
  };

  const handleCancel = () => {
    setTitleForm(title);
    setPlaying(true);
    setOpen(false);
  };

  const handleEntering = () => {
    setPlaying(false);
  };

  const handleChange = name => ({ target: { value } }) => {
    setTitleForm(value);
  };

  return (
    <>
      <IconButton edge="end" aria-label="delete" onClick={handleClickOpen}>
        <EditIcon />
      </IconButton>

      <Dialog
        maxWidth="sm"
        onEntering={handleEntering}
        onClose={handleCancel}
        aria-labelledby="confirmation-dialog-title"
        fullWidth
        open={open}
      >
        <DialogTitle id="confirmation-dialog-title">{url}</DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            name="title"
            label={label}
            multiline
            defaultValue={titleForm}
            onChange={handleChange('title')}
            className={classes.textField}
            rowsMax={4}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Typography variant="button" className={classes.confirmQuestion} color="secondary">
            Edit this item?
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

export default withStyles(styles)(Edit);
