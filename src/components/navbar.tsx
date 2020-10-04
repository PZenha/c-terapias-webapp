import React, { FC } from 'react';
import { RouteProps, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const NavBar: FC = () => {
  const classes = useStyles();

  return (
    <>
      <AppBar position="static" color="transparent">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit', marginRight: 30 }}>
              Adicionar Cliente
            </Link>
            <Link to="/clients-list" style={{ textDecoration: 'none', color: 'inherit' }}>
              Procurar
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <br></br>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => {
  createStyles({
    root: {
      flexGrow: 1,
    },
  });
});

export default NavBar;
