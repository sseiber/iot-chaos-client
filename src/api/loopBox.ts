import {
    IServiceResponse,
    requestHelper
} from './requestHelper';

export async function getUserExperimentsApi(userId: string): Promise<IServiceResponse> {
    return requestHelper({
        method: 'get',
        url: `/api/v1/loopbox/config/${userId}`
    });
}

export async function configureUserExperimentsApi(userId: string, experiments: IChaosExperiment[]): Promise<IServiceResponse> {
    return requestHelper({
        method: 'post',
        url: `/api/v1/loopbox/config/${userId}`,
        data: experiments
    });
}

export async function getLoopBoxServerVersionApi(): Promise<IServiceResponse> {
    return requestHelper({
        method: 'get',
        url: `/api/v1/loopbox/version`
    });
}
