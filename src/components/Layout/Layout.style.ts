import { styled } from "@mui/material";

export const PageContainer = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
}));

export const ScrollContainer = styled('main')(() => ({
  flex: '1 1 0%',
  padding: '1.5rem',
}));

export const PageHeader = styled('header')(({ theme }) => ({
  padding: '1rem 2rem',
  background: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));