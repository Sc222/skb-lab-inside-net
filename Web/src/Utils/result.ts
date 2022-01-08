export interface Result<T> {
    error: string | null;
    success: T | null;
}

export class ResultBuilder {
    public static Error<T>(error: string | null): Result<T> {
        return { error: error ?? "error", success: null };
    }

    public static Success<T>(success: T): Result<T> {
        return { error: null, success };
    }
}
