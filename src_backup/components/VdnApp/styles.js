import { makeStyles } from '@material-ui/core/styles';

export const useStyles = theme =>
  makeStyles({
    root: {
      background: theme.palette.background.paper
    },
    VdnApp: {
      background: 'red',
      fontSize: '5em'
    }
  });

const styles = theme => ({
  root: {
    background: theme.palette.background.paper
  },
  VdnApp: {}
});

export default styles;
