import React, { useState, useContext } from 'react';
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
import { VdnAppContext } from 'components/VdnApp';

const AddVideo = ({ classes }) => {
  const [open, setOpen] = useState(false);
  const [video, setVideo] = useState({ title: '', url: '' });

  const {
    setUrlVideo,
    update,
    setPlaying,
    db: { setCurrentVideo, addVideo }
  } = useContext(VdnAppContext);

  const handleClickOpen = () => {
    setOpen(true);
    setPlaying(false);
  };

  const handleClose = action => event => {
    const { url } = video;
    if (action === 'submit') {
      setUrlVideo(url);
      setCurrentVideo(url);
      addVideo(video);
      update();
    }
    if (action === 'cancel' || action === 'close') {
      setOpen(false);
      setPlaying(true);
    }

    setOpen(false);
  };

  const handleChange = name => ({ target: { value } }) => {
    setVideo({ ...video, [name]: value });
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
        open={open}
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
