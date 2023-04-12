import { makeAutoObservable, runInAction } from 'mobx';
import { ILoopBoxProvision } from 'loopbox-types';
import {
    getAuthTokenApi
} from '../../api/session';
import {
    getUserLoopBoxesApi,
    claimLoopBoxTokenApi,
    getLoopBoxServerVersionApi
} from '../../api/loopBox';
import { succeeded } from '../../api/requestHelper';
import { IStoreResult } from './store';

export class LoopBoxStore {
    constructor() {
        makeAutoObservable(this);
    }

    public loading = true;
    public version = '';
    public authToken = '';
    public loopBoxItems: ILoopBoxProvision[] = [];
    public loopBox = '';

    public async getUserLoopBoxes(userId: string): Promise<IStoreResult> {
        const loopBoxResult: IStoreResult = {
            result: true,
            message: 'SUCCESS'
        };

        runInAction(() => {
            this.loading = true;
        });

        try {
            const response = await getUserLoopBoxesApi(userId);
            if (succeeded(response)) {
                runInAction(() => {
                    this.loopBoxItems = response.data;
                });
            }
            else {
                loopBoxResult.result = false;
                loopBoxResult.message = response.message;
            }
        }
        catch (ex) {
            loopBoxResult.result = false;
            loopBoxResult.message = ex.message;
        }

        runInAction(() => {
            this.loading = false;
        });

        return loopBoxResult;
    }

    public async claimLoopBoxToken(claimInfo: any): Promise<IStoreResult> {
        const loopBoxResult: IStoreResult = {
            result: true,
            message: 'SUCCESS'
        };

        runInAction(() => {
            this.loading = true;
        });

        try {
            const response = await claimLoopBoxTokenApi(claimInfo);
            if (succeeded(response)) {
                runInAction(() => {
                    this.loopBox = response.data;
                });
            }
            else {
                loopBoxResult.result = false;
                loopBoxResult.message = response.message;
            }
        }
        catch (ex) {
            loopBoxResult.result = false;
            loopBoxResult.message = ex.message;
        }

        runInAction(() => {
            this.loading = false;
        });

        return loopBoxResult;
    }

    public async getLoopBoxServerVersion(): Promise<IStoreResult> {
        const loopBoxResult: IStoreResult = {
            result: true,
            message: 'SUCCESS'
        };

        runInAction(() => {
            this.loading = true;
        });

        try {
            const response = await getLoopBoxServerVersionApi();
            if (succeeded(response)) {
                runInAction(() => {
                    this.version = response.data.version;
                });
            }
            else {
                loopBoxResult.result = false;
                loopBoxResult.message = response.message;
            }
        }
        catch (ex) {
            loopBoxResult.result = false;
            loopBoxResult.message = ex.message;
        }

        runInAction(() => {
            this.loading = false;
        });

        return loopBoxResult;
    }

    public async getAuthToken(scope: string[]): Promise<IStoreResult> {
        const loopBoxResult: IStoreResult = {
            result: true,
            message: 'SUCCESS'
        };

        runInAction(() => {
            this.loading = true;
        });

        try {
            const response = await getAuthTokenApi(scope);
            if (succeeded(response)) {
                runInAction(() => {
                    this.authToken = response.data.token;
                });
            }
            else {
                loopBoxResult.result = false;
                loopBoxResult.message = response.message;
            }
        }
        catch (ex) {
            loopBoxResult.result = false;
            loopBoxResult.message = ex.message;
        }

        runInAction(() => {
            this.loading = false;
        });

        return loopBoxResult;
    }
}
