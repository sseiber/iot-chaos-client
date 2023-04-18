import { makeAutoObservable, runInAction } from 'mobx';
import { getUserSessionApi } from '../../api/session';
import { succeeded } from '../../api/requestHelper';

export enum AuthenticationState {
    Authenticated = 'Authenticated',
    Unauthenticated = 'Unauthenticated',
    Authenticating = 'Authenticating',
    CouldNotAuthenticate = 'CouldNotAuthenticate'
}

export interface IUserSessionStatistics {
    success: boolean;
    responseTime: number;
    message: string;
}

export class SessionStore {
    constructor() {
        makeAutoObservable(this);
    }

    public authenticationState: AuthenticationState;
    public role: string;
    public userId: string;
    public displayName: string;
    public email: string;
    public authProvider: string;
    public redirectPath: string;
    public userSessionStatistics: IUserSessionStatistics = {
        success: false,
        responseTime: 0,
        message: ''
    };

    public get isProduction(): boolean {
        return process.env.NODE_ENV === 'production';
    }

    public async signin(): Promise<void> {
        runInAction(() => {
            this.authenticationState = AuthenticationState.Authenticating;
        });

        try {
            const response = await getUserSessionApi();
            if (succeeded(response)) {
                runInAction(() => {
                    this.authenticationState = AuthenticationState.Authenticated;
                    this.role = response.data.role;
                    this.userId = response.data.userId;
                    this.displayName = response.data.displayName;
                    this.email = response.data.email;
                    this.authProvider = response.data.authProvider;

                    this.userSessionStatistics.success = true;
                    this.userSessionStatistics.responseTime = response.responseTime;
                    this.userSessionStatistics.message = response.message;
                });

                // await this.startTest();
            }
            else {
                runInAction(() => {
                    this.authenticationState = AuthenticationState.CouldNotAuthenticate;

                    this.userSessionStatistics.responseTime = response.responseTime || 0;
                    this.userSessionStatistics.message = response.message;
                    this.userSessionStatistics.success = true;
                });
            }
        }
        catch (ex) {
            runInAction(() => {
                this.authenticationState = AuthenticationState.CouldNotAuthenticate;
            });
        }
    }

    public async startTest(): Promise<void> {
        setInterval(async () => {
            await this.getUserSessionTest();
        }, 1000);
    }

    private async getUserSessionTest(): Promise<void> {
        try {
            const response = await getUserSessionApi();
            if (succeeded(response)) {
                runInAction(() => {
                    this.userSessionStatistics.success = true;
                    this.userSessionStatistics.responseTime = response.responseTime;
                    this.userSessionStatistics.message = response.message;
                });
            }
            else {
                runInAction(() => {
                    this.userSessionStatistics.responseTime = response.responseTime || 0;
                    this.userSessionStatistics.message = response.message;
                    this.userSessionStatistics.success = true;
                });
            }
        }
        catch (_ex) {
            // nothing
        }
    }
}
