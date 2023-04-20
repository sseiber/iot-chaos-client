import React, { FC, useEffect } from 'react';
import { Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Menu, Grid, Image, Dropdown, Icon } from 'semantic-ui-react';
import queryString from 'query-string';
import { useStore } from './stores/store';
import { AuthenticationState } from './stores/session';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { InfoDialogServiceProvider } from './components/InfoDialogContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import ConfigureExperimentsPage from './pages/ConfigureExperimentsPage';
import HomePage from './pages/HomePage';
import UserPage from './pages/user/UserPage';
import UserPage2 from './pages/user/UserPage2';

export const AppRoutes = {
    Home: '/',
    User: '/user',
    User2: '/user2',
    Config: '/config'
};

const App: FC = observer((props: any) => {
    const history = useHistory();
    const location = useLocation();
    const {
        sessionStore
    } = useStore();

    useEffect(() => {
        if (sessionStore.authenticationState === AuthenticationState.Authenticated) {
            let redirectPath = location.pathname;

            if (location.search) {
                const query = queryString.parse(location.search);

                redirectPath = query.redirectPath || `${redirectPath}${location.search}`;
            }

            history.push(redirectPath);
        }
        else {
            sessionStore.redirectPath = location.pathname;
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let logoMenuTitle = `Chaos Client`;
    let logoMenuLink = AppRoutes.Home;
    if (sessionStore.authenticationState === AuthenticationState.Authenticated) {
        logoMenuTitle = `Home`;
        logoMenuLink = AppRoutes.User;
    }

    let userNavItem;

    if (sessionStore.authenticationState === AuthenticationState.Authenticated) {
        const trigger = (
            <span>
                <Icon name={'user'} /> {sessionStore.displayName}
            </span>
        );

        userNavItem = (
            <Dropdown item trigger={trigger}>
                <Dropdown.Menu>
                    {
                        sessionStore.role === 'admin'
                            ? (
                                <Dropdown.Item as={Link} to={`/admin`}>
                                    <Icon name="user secret" />
                                    <span>&nbsp;&nbsp;Admin options</span>
                                </Dropdown.Item>
                            )
                            : null
                    }
                    < Dropdown.Item href="/api/v1/auth/signout">
                        <Icon name="sign out alternate" />
                        <span>&nbsp;&nbsp;Sign out</span>
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown >
        );
    }
    else {
        userNavItem = (
            <Menu.Item href="/api/v1/auth/signin">
                <Icon name="sign in alternate" />
                <span>&nbsp;&nbsp;Sign in</span>
            </Menu.Item>
        );
    }

    return (
        <ErrorBoundary>
            <InfoDialogServiceProvider>
                {/* {PRODUCTION ? null : <DevTools />} */}
                <Menu fixed="top" inverted color="grey" style={{ padding: '0em 5em' }}>
                    <Menu.Item as={Link} to={logoMenuLink} header>
                        <Image size={'mini'} src={`/assets/applogo50.png`} style={{ marginRight: '1.5em' }} />
                        {logoMenuTitle}
                    </Menu.Item>
                    <Menu.Menu position="right">
                        {userNavItem}
                    </Menu.Menu>
                </Menu>
                <Grid>
                    <Grid.Row>
                        <Grid.Column>
                            <Switch>
                                <Route exact path={AppRoutes.Home} component={HomePage} />
                                <AuthenticatedRoute exact path={AppRoutes.User} component={UserPage} />
                                <AuthenticatedRoute exact path={AppRoutes.User2} component={UserPage2} />
                                <AuthenticatedRoute exact path={AppRoutes.Config} component={ConfigureExperimentsPage} />
                                <Redirect from={location.pathname} to="/" />
                                {props.children}
                            </Switch>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Menu fixed="bottom" inverted color="grey" style={{ padding: '1em 5em' }}>
                </Menu>
            </InfoDialogServiceProvider>
        </ErrorBoundary>
    );
});

export default App;
