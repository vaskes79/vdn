import { useTheme, makeStyles } from '@material-ui/core/styles';

export const useStyles = () => {
  const theme = useTheme();

  return makeStyles(
    {
      root: {
        background: theme.palette.background.paper,
        padding: theme.spacing(2),
        height: 'calc(100vh - 120px)'
      }
    },
    {
      name: 'Main'
    }
  );
};

const styles = theme => ({
  root: {
    background: theme.palette.background.paper,
    padding: theme.spacing(2),
    height: 'calc(100vh - 120px)'
  }
});

export default styles;
