export interface GeneralResponse<T = unknown> {
  status: number;
  success: boolean;
  content: T;
  message: string;
  timestamp: number;
}

export interface PaginatedResponse {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
}
