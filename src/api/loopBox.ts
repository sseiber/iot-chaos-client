import {
    IServiceResponse,
    requestHelper
} from './requestHelper';

export async function getUserLoopBoxesApi(userId: string): Promise<IServiceResponse> {
    return requestHelper({
        method: 'get',
        url: `/api/v1/loopbox/user/${userId}`
    });
}

export async function claimLoopBoxTokenApi(claimInfo: any): Promise<IServiceResponse> {
    return requestHelper(
        {
            method: 'post',
            url: `/api/v1/loopbox/claim/${claimInfo.loopBoxClaimToken}`,
            data: {
                userId: claimInfo.userId,
                userProfile: claimInfo.userProfile
            }
        });
}

export async function getLoopBoxServerVersionApi(): Promise<IServiceResponse> {
    return requestHelper({
        method: 'get',
        url: `/api/v1/loopbox/version`
    });
}
