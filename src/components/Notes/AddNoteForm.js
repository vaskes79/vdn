import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import styles from './styles';
import { VdnAppContext } from 'components/VdnApp';
import { VideoContext } from 'components/Video';
import { DBContext } from 'components/db';
import { TIME_OFFSET } from 'components/constants';

const AddNoteForm = ({ classes }) => {
  let [note, setNote] = useState('');
  let vdnPlay = useContext(VdnAppContext);
  let videoPlayer = useContext(VideoContext);
  let db = useContext(DBContext);

  const onChange = ({ target: { value } }) => {
    vdnPlay.setPlaying(false);
    setNote(value);
  };

  const onSubmit = e => {
    e.preventDefault();
    vdnPlay.setPlaying(true);
    const noteItem = {
      title: note,
      time: videoPlayer.getCurrentTime() - TIME_OFFSET,
      url: vdnPlay.urlVideo
    };
    db.addNote(noteItem);
    setNote('');
  };

  return (
    <form className={classes.addNoteForm} onSubmit={onSubmit}>
      <TextField
        className={classes.input}
        name="note"
        label="Note"
        placeholder="add new note"
        onChange={onChange}
        fullWidth
        value={note}
        margin="normal"
      />
    </form>
  );
};

export default withStyles(styles)(AddNoteForm);
