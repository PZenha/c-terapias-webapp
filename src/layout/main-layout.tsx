import React, { FC } from 'react';
import { RouteProps, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import NavBar from '../components/navbar';

const MainLayout = (Component: React.ComponentType<any>) => ({
  children,
}: RouteProps) => {
  return (
    <>
      <NavBar />
      <div>
        <Component>{children}</Component>
      </div>
    </>
  );
};

export default MainLayout;
