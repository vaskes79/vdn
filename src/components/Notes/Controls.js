import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

import styles from './styles';
import { formatToHtml, formatToYouTube, formatToMarkdown, copyToClipBoard } from 'components/utils';

const Controls = ({ classes, notes }) => {
  const inputText = React.createRef();

  const copyNotesToBuffer = format => e => {
    switch (format) {
      case 'HTML':
        const HTML = formatToHtml(notes);
        inputText.current.value = HTML;
        break;
      case 'youtube':
        const YOUTUBE = formatToYouTube(notes);
        inputText.current.value = YOUTUBE;
        break;
      default:
        const MD = formatToMarkdown(notes);
        inputText.current.value = MD;
    }

    copyToClipBoard(inputText.current);
  };

  return (
    <div className={classes.controls}>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        className={classes.btn}
        onClick={copyNotesToBuffer('HTML')}
      >
        HTML
      </Button>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        className={classes.btn}
        onClick={copyNotesToBuffer('youtube')}
      >
        YouTube
      </Button>
      <Button
        variant="contained"
        size="medium"
        color="primary"
        className={classes.btn}
        onClick={copyNotesToBuffer('Markdown')}
      >
        MARKDOWN
      </Button>
      <textarea className={classes.controlsHiddenField} ref={inputText} defaultValue="" />
    </div>
  );
};

export default withStyles(styles)(Controls);
