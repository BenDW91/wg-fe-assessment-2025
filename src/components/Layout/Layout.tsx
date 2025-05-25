import React from 'react';
import { Outlet } from 'react-router-dom';
import { PageContainer, PageHeader, ScrollContainer } from './Layout.style';

const Layout: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader>
        <h2>User management Application</h2>
      </PageHeader>
      <ScrollContainer>
        <Outlet />
      </ScrollContainer>
    </PageContainer>
  );
};

export default React.memo(Layout);
