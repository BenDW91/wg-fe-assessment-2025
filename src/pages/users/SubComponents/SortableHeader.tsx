import { SortDirection } from "hooks/useSortBy";
import { ChevronDown } from "lucide-react";
import { FC } from "react";
import { SortableHeaderContainer } from "./SortableHeader.style";

interface SortableHeaderProps {
  label: string; 
  sorted: boolean;
  identifier: string;
  onSort?: (key: string) => void;
  order?: SortDirection;
}

const SortableHeader: FC<SortableHeaderProps> = ({ label, identifier, onSort, order = 'asc', sorted = false }) => (
  <SortableHeaderContainer sorted={sorted} sortDirection={order} onClick={() => onSort?.(identifier)}>
    <span>{label}</span>
    <ChevronDown />
  </SortableHeaderContainer>
);

export default SortableHeader;