import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Header, Button, Form, Input, Label, SemanticCOLORS } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { useInfoDialog, showInfoDialog } from '../components/InfoDialogContext';

const ClaimTokenPage: FC = observer(() => {
    const history = useHistory();
    const [claimToken, setClaimToken] = useState('');
    const [validToken, setValidToken] = useState(false);
    const [helpClaimTokenColor, setHelpClaimTokenColor] = useState('green' as SemanticCOLORS);
    const [helpClaimTokenText, _setHelpClaimTokenText] = useState('The LoopBox token is 8 characters');

    const {
        sessionStore,
        loopBoxStore
    } = useStore();
    const infoDialogContext = useInfoDialog();

    const onTokenFieldChange = (e: any) => {
        const inputTextLength = e.target.value.length;
        const valid = inputTextLength === 8;

        if (inputTextLength <= 8) {
            const helpColor = valid ? 'green' : 'yellow';

            setClaimToken(e.target.value.toUpperCase());
            setValidToken(valid);
            setHelpClaimTokenColor(helpColor);
        }
        else {
            setHelpClaimTokenColor('red');
        }
    };

    const onClaimClaimToken = async () => {
        if (claimToken.length < 8) {
            await showInfoDialog(infoDialogContext, {
                catchOnCancel: false,
                variant: 'info',
                title: 'Invalid Claim Id',
                description: 'The LoopBox claim id should be 8 characters. Please check your LoopBox label and verify you entered the correct claim id.'
            });
        }
        else {
            let claimErrorMessage;

            try {
                const claimTokenResult = await loopBoxStore.claimLoopBoxToken({
                    loopBoxClaimToken: claimToken,
                    userId: sessionStore.userId,
                    userProfile: {
                        displayName: sessionStore.displayName,
                        email: sessionStore.email,
                        authProvider: sessionStore.authProvider
                    }
                });

                if (claimTokenResult.result) {
                    history.push('/user');
                }
                else {
                    claimErrorMessage = claimTokenResult.message;
                }
            }
            catch (ex) {
                claimErrorMessage = ex.message;
            }

            if (claimErrorMessage) {
                await showInfoDialog(infoDialogContext, {
                    catchOnCancel: true,
                    variant: 'info',
                    title: 'Claim Loopbox Error',
                    description: claimErrorMessage
                });
            }
        }
    };

    const onCancelClaimToken = (e: any) => {
        e.preventDefault();

        history.goBack();
    };

    return (
        <Grid style={{ padding: '5em 5em' }}>
            <Grid.Row>
                <Grid.Column>
                    <Header as="h1">Claim a LoopBox</Header>
                    <Form>
                        <Form.Field>
                            <label>LoopBox claim token</label>
                            <Input
                                placeholder="Enter LoopBox Token"
                                value={claimToken}
                                onChange={onTokenFieldChange}
                            />
                            <Label basic color={helpClaimTokenColor} pointing>{helpClaimTokenText}</Label>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Button
                        floated="right"
                        size="small"
                        color={'green'}
                        disabled={!validToken}
                        onClick={onClaimClaimToken}
                    >
                        Claim Token
                    </Button>
                    <Button
                        floated="right"
                        size="small"
                        color={'grey'}
                        onClick={onCancelClaimToken}
                    >
                        Cancel
                    </Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});

export default ClaimTokenPage;
