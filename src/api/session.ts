import {
    IServiceResponse,
    requestHelper
} from './requestHelper';

export async function getUserSessionApi(): Promise<IServiceResponse> {
    return requestHelper({
        method: 'get',
        url: '/api/v1/auth/user'
    });
}

export async function getAuthTokenApi(scope: string[], _hookType?: string): Promise<IServiceResponse> {
    return requestHelper({
        method: 'post',
        url: `/api/v1/auth/generate`,
        data: {
            scope
        }
    });
}
