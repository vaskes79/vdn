import React from 'react';
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

const Edit = ({ classes, id, title, description, label }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOk = () => {
    console.log('Edit handleOk ');
    setOpen(false);
  };

  const handleCancel = () => {
    console.log('Edit handleCancel ');
    setOpen(false);
  };

  const handleEntering = () => {
    console.log('Edit handleEntering ');
  };

  const handleChange = name => ({ target: { value } }) => {
    console.log(value);
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
        <DialogTitle id="confirmation-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <TextField
            id="title"
            name="title"
            label={label}
            multiline
            defaultValue={description}
            onChange={handleChange('title')}
            className={classes.textField}
            rowsMax={4}
            fullWidth
            margin="normal"
          />
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

export default withStyles(styles)(Edit);
