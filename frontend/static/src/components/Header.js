import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Batch Maker
          </Typography>
          <Link href="/recipes" color="inherit">Recipes</Link>
          <Link href="/recipes/new" color="inherit">New Recipe</Link>
          { props.isAuthenticated
            ? (
              <Link component="button" variant="body1" color="inherit" onClick={props.handleLogout}>Logout</Link>
            ) : (
              <Link href="/accounts/login" color="inherit">Login</Link>
            )
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}



export default Header;
