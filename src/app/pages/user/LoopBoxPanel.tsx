import React, { FC } from 'react';
import { Grid, Segment, Header, Message, Item, Button } from 'semantic-ui-react';
import LoopBoxPanelListItem from './LoopBoxPanelListItem';

interface ILoopBoxPanelProps {
    userDisplayName: string;
    userLinkUriProps: string;
    loopBoxItems: any[];
    onClaimLoopBoxClicked: (e: any) => (void);
}

const LoopBoxPanel: FC<ILoopBoxPanelProps> = ((props: ILoopBoxPanelProps) => {
    const {
        userDisplayName,
        userLinkUriProps,
        loopBoxItems,
        onClaimLoopBoxClicked
    } = props;

    return (
        <Grid>
            <Grid.Row>
                <Grid.Column>
                    <Header attached="top" as="h3" color={'blue'}>{`Chaos experiments registered to ${userDisplayName}`}</Header>
                    <Segment attached="bottom">
                        {
                            loopBoxItems.length > 0
                                ? (
                                    <Item.Group divided>
                                        {
                                            loopBoxItems.map((loopBoxItem, index) => {
                                                return (

                                                    <LoopBoxPanelListItem
                                                        key={index}
                                                        systemId={loopBoxItem.id}
                                                        systemName={loopBoxItem.systemName}
                                                        systemDescription={'Description goes here...'}
                                                        connectedDate={'November 16, 2018 11:34 PM'}
                                                        userLinkHref={`/loopbox/${loopBoxItem.id}${userLinkUriProps}`}
                                                    />

                                                );
                                            })
                                        }
                                    </Item.Group>
                                )
                                : (
                                    <Message warning>
                                        <Message.Header>There are no experiments running</Message.Header>
                                        <p>See the README for instructions on registering new Chaos experiments.</p>
                                    </Message>
                                )
                        }
                    </Segment>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Button floated="right" size="small" color={'green'} onClick={onClaimLoopBoxClicked}>Claim a new LoopBox</Button>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
});

export default LoopBoxPanel;
