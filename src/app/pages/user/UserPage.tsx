import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { Message, Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useAsyncEffect } from 'use-async-effect';
import { useStore } from '../../stores/store';
import { useInfoDialog, showInfoDialog } from '../../components/InfoDialogContext';
import LoopBoxPanel from './LoopBoxPanel';

const UserPage: FC = observer(() => {
    const history = useHistory();
    const {
        sessionStore,
        loopBoxStore
    } = useStore();
    const infoDialogContext = useInfoDialog();

    useAsyncEffect(async isMounted => {
        await loopBoxStore.getLoopBoxServerVersion();

        const response = await loopBoxStore.getUserLoopBoxes(sessionStore.userId);

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

    const onClaimLoopBoxClicked = (e: any) => {
        e.preventDefault();

        history.push('/createconfig');
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
                    <LoopBoxPanel
                        userDisplayName={userDisplayName}
                        userLinkUriProps={userLinkUriProps}
                        loopBoxItems={loopBoxStore.loopBoxItems}
                        onClaimLoopBoxClicked={onClaimLoopBoxClicked}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});

export default UserPage;
