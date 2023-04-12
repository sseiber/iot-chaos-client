import axios from 'axios';

export interface IServiceResponse {
    statusCode: number;
    message: string;
    data?: any;
}

export function succeeded(response: IServiceResponse): boolean {
    return (response.statusCode >= 200 && response.statusCode <= 299);
}

export async function requestHelper(config: any): Promise<IServiceResponse> {
    const response: IServiceResponse = {
        statusCode: 200,
        message: 'SUCCESS'
    };

    try {
        const axiosResponse = await axios.request(config);

        response.statusCode = axiosResponse.status;
        response.message = axiosResponse.statusText;

        if (axiosResponse.data) {
            response.data = axiosResponse.data;
        }
    }
    catch (ex) {
        if (ex.isAxiosError && ex.response) {
            response.statusCode = ex.response.statusCode;
            response.message = `An error occurred during the request: ${ex.response.status}`;
        }
        else {
            response.statusCode = 500;
            response.message = `An error occurred during the request: ${ex.message}`;
        }
    }

    return response;
}
