export interface GeneralResponse<T = unknown> {
  status: number;
  /** HTTP-like status code when aplica; opcional para compatibilidad */
  statusCode?: number;
  /** Código de error de dominio opcional */
  code?: string;
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
