import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

import styles from './styles';

class AddNoteForm extends Component {
  state = {
    note: ''
  };

  onChange = ({ target: { value } }) => {
    this.setState({ note: value });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.note);
  };

  render() {
    const { classes } = this.props;
    const { note } = this.state;

    return (
      <form className={classes.addNoteForm} onSubmit={this.onSubmit}>
        <TextField
          className={classes.input}
          name="note"
          label="Note"
          placeholder="add new note"
          onChange={this.onChange}
          fullWidth
          value={note}
          margin="normal"
        />
      </form>
    );
  }
}

export default withStyles(styles)(AddNoteForm);
