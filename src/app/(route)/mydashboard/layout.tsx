'use client';

import React from 'react';

import SideMenu from './_components/SideMenu';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      {children}
    </div>
  );
}
