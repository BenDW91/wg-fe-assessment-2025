import { styled, TableCell } from "@mui/material";
import { SortDirection } from "hooks/useSortBy";

export const SortableHeaderContainer = styled(TableCell)<{sorted: boolean, sortDirection: SortDirection}>(({ sorted, sortDirection }) => ({
  cursor: 'pointer', 

  svg: {
    verticalAlign: 'middle',
    marginLeft: '.5rem',
    width: '1rem', 
    height: '1rem',
    transition: 'transform .3s', 
    transformOrigin: '50% 50%',
    transform: `rotate(${sorted && sortDirection === 'desc' ? '180deg': 'none'})`,
    opacity: sorted ? '1': '.3',
  }
})) 