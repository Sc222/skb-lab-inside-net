export interface ApiResponse<T> {
    status: number;
    data: T | null;
    error: string | null;
}
