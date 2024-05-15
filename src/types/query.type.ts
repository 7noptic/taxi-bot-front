export interface ResponseType<S> extends PaginationType {
  data: S;
}

export interface QueryType {
  data?: any;
  currentPage: number;
}

export interface PaginationType {
  currentPage: number;
  perPageCount: number;
  total: number;
}
