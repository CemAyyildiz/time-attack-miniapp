// API response type definitions

declare interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: number;
}

declare interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  timestamp: number;
}

declare interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
}

declare interface LeaderboardResponse extends PaginatedResponse<LeaderboardEntry> {
  gameId: string;
  period: 'daily' | 'weekly' | 'monthly' | 'all-time';
}
