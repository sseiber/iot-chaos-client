import React, { FC } from 'react';
import { Grid, Message } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { AuthenticationState } from '../stores/session';

const HomePage: FC = observer(() => {
    const {
        sessionStore
    } = useStore();

    const message = sessionStore.authenticationState === AuthenticationState.Authenticated ?
        'Chaos Client' :
        'Sign in to continue...';

    return (
        <Grid style={{ padding: '5em 5em' }}>
            <Grid.Row>
                <Grid.Column>
                    <Message size={'huge'}>
                        <Message.Header>Chaos Client</Message.Header>
                        <p>{message}</p>
                    </Message>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});

export default HomePage;
