import React from 'react';
import { RouteProps } from 'react-router-dom';
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
