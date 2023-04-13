import React, { FC, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Label, Message, Item, Checkbox, Segment, CheckboxProps } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores/store';
import { useInfoDialog, showInfoDialog } from '../components/InfoDialogContext';
import { AppRoutes } from '../App';

const ConfigureExperimentsPage: FC = observer(() => {
    const {
        sessionStore,
        loopBoxStore
    } = useStore();

    const infoDialogContext = useInfoDialog();

    const history = useHistory();
    const [checkedExperiments, setCheckedExperiments] = useState<IChaosExperiment[]>([]);

    useEffect(() => {

        const checkedExperimentItems: IChaosExperiment[] = [];
        for (const chaosExperiment of loopBoxStore.chaosExperiments) {
            checkedExperimentItems.push({
                ...chaosExperiment
            });
        }
        // const checkedExperimentItems: IChaosExperiment[] = [
        //     ...loopBoxStore.chaosExperiments
        // ];

        setCheckedExperiments(checkedExperimentItems);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSelectExperimentCheckbox = (_event: React.MouseEvent<HTMLInputElement, MouseEvent>, data: CheckboxProps) => {
        const checkedExperimentItems: IChaosExperiment[] = [
            ...checkedExperiments
        ];

        const selectedExperiment = checkedExperimentItems.find(item => item.id === data.id);
        if (selectedExperiment) {
            selectedExperiment.active = data.checked;
        }

        setCheckedExperiments(checkedExperimentItems);
    };

    const onConfigureExperiments = async () => {
        let errorMessage;

        try {
            const result = await loopBoxStore.configureUserExperiments(sessionStore.userId, checkedExperiments);

            if (result.result) {
                history.push(AppRoutes.User);
            }
            else {
                errorMessage = result.message;
            }
        }
        catch (ex) {
            errorMessage = ex.message;
        }

        if (errorMessage) {
            await showInfoDialog(infoDialogContext, {
                catchOnCancel: true,
                variant: 'info',
                title: 'Configure Experiments Error',
                description: errorMessage
            });
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
                    <Message size={'huge'} info>
                        <Message.Header>Experiments</Message.Header>
                        <p>Select experiments below to start</p>
                    </Message>
                    <Item.Group divided>
                        {
                            checkedExperiments.map((experimentItem: IChaosExperiment, index: any) => {

                                const active = experimentItem.active;

                                return (

                                    <Item key={index}>
                                        <Item.Image style={{ height: '72px', width: '72px' }} src='/assets/applogo150.png' />
                                        <Item.Content>
                                            <Item.Header as='a'>{experimentItem.name}</Item.Header>
                                            <Item.Meta>
                                                <span>{experimentItem.subtitle}</span>
                                            </Item.Meta>
                                            <Item.Description>{experimentItem.description}</Item.Description>
                                            <Item.Extra>
                                                <Segment floated='right' size={'small'} basic>
                                                    <Checkbox id={experimentItem.id} checked={active} toggle onClick={onSelectExperimentCheckbox} />
                                                </Segment>
                                                <Label
                                                    icon='check circle'
                                                    color={active ? 'green' : 'grey'}
                                                    content={active ? 'active' : 'disabled'}
                                                />
                                            </Item.Extra>
                                        </Item.Content>
                                    </Item>

                                );
                            })
                        }
                    </Item.Group>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Button
                        floated="right"
                        size={'small'}
                        color={'green'}
                        onClick={onConfigureExperiments}
                    >
                        Save Configuration
                    </Button>
                    <Button
                        floated="right"
                        size={'small'}
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

export default ConfigureExperimentsPage;
