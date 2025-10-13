import { Pagination } from "@/types/tables/pagination";
import { Resource } from "./resource-type";

export interface resourceResponse extends Resource {
  id: string;
  __v: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ResourceResponseTable {
  ok: boolean;
  resources: resourceResponse[];
  pagination: Pagination;
}
