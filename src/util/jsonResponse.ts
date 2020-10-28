export type ResponseType<T extends Record<string, unknown>> = {data: T};

export const jsonResponse = <TData extends Record<string, unknown>>(data: TData): ResponseType<TData> => ({data});
export const errorResponse = (error: string): {error: string} => ({error});
