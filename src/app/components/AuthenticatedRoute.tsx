import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { AuthenticationState } from '../stores/session';

interface IAuthenticatedRoute {
    exact?: boolean;
    path: string;
    component: React.FC;
}

const AuthenticatedRoute: FC<IAuthenticatedRoute> = observer((props: IAuthenticatedRoute) => {
    const {
        exact,
        path,
        component
    } = props;

    const {
        sessionStore
    } = useStore();

    if (sessionStore.authenticationState === AuthenticationState.Authenticated) {
        return (
            <Route component={component} exact={exact} path={path} />
        );
    }

    return (
        <Redirect to={{ pathname: '/' }} />
    );
});

export default AuthenticatedRoute;
