import { makeAutoObservable, runInAction } from 'mobx';
import {
    getAuthTokenApi
} from '../../api/session';
import {
    getUserExperimentsApi,
    configureUserExperimentsApi,
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
    public chaosExperiments: IChaosExperiment[] = [];

    public async getUserExperiments(userId: string): Promise<IStoreResult> {
        const result: IStoreResult = {
            result: true,
            message: 'SUCCESS'
        };

        runInAction(() => {
            this.loading = true;
        });

        try {
            const response = await getUserExperimentsApi(userId);
            if (succeeded(response)) {
                runInAction(() => {
                    this.chaosExperiments = response.data;
                });
            }
            else {
                result.result = false;
                result.message = response.message;
            }
        }
        catch (ex) {
            result.result = false;
            result.message = ex.message;
        }

        runInAction(() => {
            this.loading = false;
        });

        return result;
    }

    public async configureUserExperiments(userId: string, experiments: IChaosExperiment[]): Promise<IStoreResult> {
        const result: IStoreResult = {
            result: true,
            message: 'SUCCESS'
        };

        runInAction(() => {
            this.loading = true;
        });

        try {
            const response = await configureUserExperimentsApi(userId, experiments);
            if (!succeeded(response)) {
                result.result = false;
                result.message = response.message;
            }
        }
        catch (ex) {
            result.result = false;
            result.message = ex.message;
        }

        runInAction(() => {
            this.loading = false;
        });

        return result;
    }

    public async getLoopBoxServerVersion(): Promise<IStoreResult> {
        const result: IStoreResult = {
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
                result.result = false;
                result.message = response.message;
            }
        }
        catch (ex) {
            result.result = false;
            result.message = ex.message;
        }

        runInAction(() => {
            this.loading = false;
        });

        return result;
    }

    public async getAuthToken(scope: string[]): Promise<IStoreResult> {
        const result: IStoreResult = {
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
                result.result = false;
                result.message = response.message;
            }
        }
        catch (ex) {
            result.result = false;
            result.message = ex.message;
        }

        runInAction(() => {
            this.loading = false;
        });

        return result;
    }
}
