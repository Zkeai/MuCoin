'use client';
import React, { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="container">
      <div className="m-8">
        {children}
      </div>
    </div>
  );
}

export default Layout;