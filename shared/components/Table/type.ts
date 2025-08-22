import { ColumnDef } from "@tanstack/react-table";

export interface TableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  searchable?: boolean;
  filterable?: boolean;
  paginated?: boolean;
  itemsPerPage?: number;
  loading?: boolean;
  labelButton?: string;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
  title: string;
  navigateRoute: string;
  onSearchChange?: (value: string) => void;
  placeHolderSearch?: string;
}
