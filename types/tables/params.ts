export enum ShortOrder {
  ASC = "asc",
  DESC = "desc",
}
export interface Params {
  limit: number;
  search?: string;
  page: number;
  sortOrder?: ShortOrder;
}
