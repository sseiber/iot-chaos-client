import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Message, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useAsyncEffect } from 'use-async-effect';
import { useStore } from '../../stores/store';
import { useInfoDialog, showInfoDialog } from '../../components/InfoDialogContext';
import ExperimentsPanel from './ExperimentsPanel';
import { AppRoutes } from '../../App';

const UserPage: FC = observer(() => {
    const history = useHistory();
    const {
        sessionStore,
        loopBoxStore
    } = useStore();
    const infoDialogContext = useInfoDialog();

    useAsyncEffect(async isMounted => {
        await loopBoxStore.getLoopBoxServerVersion();

        const response = await loopBoxStore.getUserExperiments(sessionStore.userId);

        if (!isMounted()) {
            return;
        }

        if (!response.result) {
            await showInfoDialog(infoDialogContext, {
                catchOnCancel: false,
                variant: 'info',
                title: 'Error',
                description: `Unable to get user's LoopBox configuration.`
            });
        }
    }, []);

    const onConfigureExperimentsClicked = (e: any) => {
        e.preventDefault();

        history.push(AppRoutes.Config);
    };

    const userDisplayName = sessionStore.displayName || 'LoopBox User';
    const userLinkUriProps = `?uid=${sessionStore.userId}`;

    return (
        <Grid style={{ padding: '5em 5em' }}>
            <Grid.Row>
                <Grid.Column>
                    <Message size={'huge'} info>
                        <Message.Header>Chaos Client</Message.Header>
                        <p>{`(backend service-v${loopBoxStore.version})`}</p>
                    </Message>
                    <ExperimentsPanel
                        userDisplayName={userDisplayName}
                        userLinkUriProps={userLinkUriProps}
                        chaosExperiments={loopBoxStore.chaosExperiments}
                        onConfigureExperimentsClicked={onConfigureExperimentsClicked}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});

export default UserPage;
