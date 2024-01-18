export interface BaseQuery {
    startDate?: string;
    endDate?: string;
    sortDate?: string;
}

export interface PaginationParams {
    page?: number;
    perPage?: number;
}

export interface PaginationResponse<T> {
    docs: T;
    page: number;
    perPage: number;
    totalDocs: number;
    totalPages: number;
    hasNextPage: boolean;
}
