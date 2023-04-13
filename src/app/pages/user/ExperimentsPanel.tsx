import React, { FC } from 'react';
import { Grid, Segment, Header, Message, Item, Button } from 'semantic-ui-react';
import ExperimentsPanelListItem from './ExperimentsPanelListItem';

interface IExperimentsPanelProps {
    userDisplayName: string;
    userLinkUriProps: string;
    chaosExperiments: IChaosExperiment[];
    onConfigureExperimentsClicked: (e: any) => (void);
}

const ExperimentsPanel: FC<IExperimentsPanelProps> = ((props: IExperimentsPanelProps) => {
    const {
        userDisplayName,
        // @ts-ignore
        userLinkUriProps,
        chaosExperiments,
        onConfigureExperimentsClicked
    } = props;

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header attached="top" as="h3" color={'blue'}>{`Chaos experiments configured for ${userDisplayName}`}</Header>
                    <Segment attached="bottom">
                        {
                            chaosExperiments.length > 0
                                ? (
                                    <Item.Group divided>
                                        {
                                            chaosExperiments.map((experimentItem: IChaosExperiment, index: any) => {
                                                return (

                                                    <ExperimentsPanelListItem
                                                        key={index}
                                                        id={experimentItem.id}
                                                        active={experimentItem.active}
                                                        name={experimentItem.name}
                                                        subtitle={experimentItem.subtitle}
                                                        description={experimentItem.description}
                                                    />

                                                );
                                            })
                                        }
                                    </Item.Group>
                                )
                                : (
                                    <Message warning>
                                        <Message.Header>There are no experiments configured</Message.Header>
                                        <p>See the README for instructions on configuring new Chaos experiments.</p>
                                    </Message>
                                )
                        }
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Button floated="right" size={'small'} color={'green'} onClick={onConfigureExperimentsClicked}>Configure Experiments</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});

export default ExperimentsPanel;
