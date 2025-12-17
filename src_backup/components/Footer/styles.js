const styles = theme => ({
  root: {
    background: theme.palette.grey[800],
    color: theme.palette.getContrastText(theme.palette.grey[800]),
    padding: theme.spacing(2),
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%'
  },
  wrap: {},
  right: {
    textAlign: 'right'
  }
});

export default styles;
