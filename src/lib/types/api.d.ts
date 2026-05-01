
export type IApiResponse<T> = IErrorResponse | ISuccessResponse<T>

export interface IErrorResponse {
    status: false;
    code: number;
    message: string;
    errors?: Array<{
        path: string;
        message: string;
    }>
}

export interface ISuccessResponse<T> {
    status: true;
    code: number;
    message?: string;
    payload: T
}

export interface IDocumentFields{
    createdAt:string;
    updatedAt:string;
}



export interface IPaginatedResponse<T>{
    data:T[];
    metadata:{
        page:number;
        limit:number;
        total:number;
        totalPages:number;
    }
}
