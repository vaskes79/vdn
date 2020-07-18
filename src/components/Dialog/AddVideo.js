import React, { useState, useContext, useCallback } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Fab,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

import styles from './styles';
import { DBContext } from 'components/db';
import { VdnAppContext } from 'components/VdnApp';

const INIT_STATE = {
  open: false,
  title: '',
  url: ''
};

const AddVideo = ({ classes }) => {
  const [values, setValues] = useState({ ...INIT_STATE });
  const { setCurrentVideo, addVideo } = useContext(DBContext);
  const { setUrlVideo } = useContext(VdnAppContext);

  const handleClickOpen = () => {
    setValues({ ...values, open: true });
  };

  const handleClose = action => event => {
    const { title, url } = values;
    const newVideo = { title, url };
    /* TODO create method for update storage */
    if (action === 'submit') {
      setUrlVideo(url);
      setCurrentVideo(url);
      addVideo(newVideo);
    }
    if (action === 'cancel') console.log('cancel');
    if (action === 'close') console.log('close');
    /* end */

    setValues({ ...INIT_STATE });
  };

  const handleChange = name => ({ target: { value } }) => {
    setValues({ ...values, [name]: value });
  };

  return (
    <>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fab}
        size="small"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <Dialog
        maxWidth="sm"
        open={values.open}
        onClose={handleClose('close')}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Add Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You should set Title and paste url link video for working with.
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            name="title"
            id="title"
            label="Title Video"
            type="text"
            fullWidth
            onChange={handleChange('title')}
          />
          <TextField
            margin="normal"
            id="url"
            name="url"
            label="Url Video"
            type="url"
            fullWidth
            onChange={handleChange('url')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose('cancel')} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose('submit')} color="primary">
            Add Video
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default withStyles(styles)(AddVideo);
