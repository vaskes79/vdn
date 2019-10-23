import { visuallyHidden } from 'components/utils';

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.paper
  },
  btn: {
    marginRight: theme.spacing(1)
  },
  noteList: {
    height: `${window.innerHeight - 250}px`,
    overflow: 'auto'
  },
  controls: {},
  controlsHiddenField: {
    ...visuallyHidden
  }
});

export default styles;
