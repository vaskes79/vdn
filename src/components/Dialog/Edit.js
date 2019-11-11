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
import { DBContext } from 'components/db';

const Edit = ({ classes, id, url, title, label, note = false, video = false }) => {
  const [open, setOpen] = useState(false);
  const [titleForm, setTitleForm] = useState(title);
  const db = useContext(DBContext);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (video) db.editVideo(url, titleForm);
    if (note) db.editNote(id, titleForm);
    setOpen(false);
  };

  const handleCancel = () => {
    setTitleForm(title);
    setOpen(false);
  };

  const handleEntering = () => {
    console.log('Edit handleEntering ');
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
