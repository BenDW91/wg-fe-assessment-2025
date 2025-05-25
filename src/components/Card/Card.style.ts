import { Collapse, Stack, styled, Typography } from "@mui/material";

export const StyledCard = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

export const CardTitle = styled(Typography)(() => ({
  margin: 0,
}));

export const CardHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem',
  paddingBottom: '0'
}));

export const CardContent = styled('div')<{fullWidth?: boolean}>((fullWidth) => ({
  padding: `1.5rem ${fullWidth ? '0' : '1.5'}`
}))



export const CollapsibleContainer = styled('div')(({ theme }) => ({
  postion: 'relative',
  marginTop: '2rem', 
  padding: '2rem',
  background: theme.palette.background.default,
  boxShadow: 'inset 0 2px 2px -1px rgb(0 0 0 / 20%), inset 0 -1px 2px -1px rgb(0 0 0 / 20%)',
}));

export const CollapsibleContent = styled(Collapse)(() => ({
  '&.MuiCollapse-root': {
    margin: '0',
  }
}));
