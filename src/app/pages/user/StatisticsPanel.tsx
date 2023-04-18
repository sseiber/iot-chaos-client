import React, { FC } from 'react';
import { Grid, Segment, Header, Item, Label } from 'semantic-ui-react';
import { IUserSessionStatistics } from '../../stores/session';

interface IStatisticsPanelProps {
    userSessionStatistics: IUserSessionStatistics;
}

const StatisticsPanel: FC<IStatisticsPanelProps> = ((props: IStatisticsPanelProps) => {
    const {
        userSessionStatistics,
    } = props;

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header attached="top" as="h3" color={'blue'}>{`Statistics`}</Header>
                    <Segment attached="bottom">
                        <Item.Group divided>
                            <Item key={24}>
                                <Item.Content>
                                    <Item.Header>{'Get auth profile'}</Item.Header>
                                    <Item.Meta>
                                        <span>{'NetworkChaos-2.1'}</span>
                                    </Item.Meta>
                                    <Item.Description>{'WebApi call to backend service to retrieve current user auth profile.'}</Item.Description>
                                    <Item.Extra>
                                        <Label
                                            icon='info'
                                            color={userSessionStatistics.success ? 'green' : 'red'}
                                            content={userSessionStatistics.message}
                                        />
                                        <Label
                                            icon='clock outline'
                                            color={'grey'}
                                            content={`duration:\u00A0${userSessionStatistics.responseTime}`}
                                        />
                                    </Item.Extra>
                                </Item.Content>
                            </Item>
                        </Item.Group>
                    </Segment>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});

export default StatisticsPanel;
