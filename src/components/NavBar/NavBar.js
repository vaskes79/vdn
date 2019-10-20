import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import styles from './styles';

const NavBar = ({classes}) => <div className={classes.div}>NavBar</div>;

export default withStyles(styles)(NavBar);
