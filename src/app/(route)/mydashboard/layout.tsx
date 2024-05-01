'use client';

import React from 'react';

import SideMenu from './_components/SideMenu';
import styles from './layout.module.css';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ height: '100vh' }}>
        <SideMenu />
      </div>
      <div className={styles.childrenWrapper}>
        {children}
      </div>
    </div>
  );
}
