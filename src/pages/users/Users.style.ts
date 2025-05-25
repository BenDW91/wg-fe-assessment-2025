import { styled, Table, TableCell } from "@mui/material";

export const UserTable = styled(Table)(() => ({
  '.MuiTableRow-root .MuiTableCell-root:first-of-type': {
    paddingLeft: '2rem'
  },
  '.MuiTableRow-root .MuiTableCell-root:last-of-type': {
    paddingRight: '2rem'
  }
}));

export const ActionsCell = styled(TableCell)(() => ({
  width: '8rem',

  '.MuiIconButton-root:last-of-type': {
    marginLeft: '.5rem'
  }
}));