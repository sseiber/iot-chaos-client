import { makeAutoObservable, runInAction } from 'mobx';
import { getUserSessionApi } from '../../api/session';
import { succeeded } from '../../api/requestHelper';

export enum AuthenticationState {
    Authenticated = 'Authenticated',
    Unauthenticated = 'Unauthenticated',
    Authenticating = 'Authenticating',
    CouldNotAuthenticate = 'CouldNotAuthenticate'
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
                });
            }
            else {
                runInAction(() => {
                    this.authenticationState = AuthenticationState.CouldNotAuthenticate;
                });
            }
        }
        catch (ex) {
            runInAction(() => {
                this.authenticationState = AuthenticationState.CouldNotAuthenticate;
            });
        }
    }
}
