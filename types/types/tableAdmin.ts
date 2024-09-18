export interface Column {
  key: string;
  label: string;
}

export interface Row {
  [key: string]: string | number;
}
