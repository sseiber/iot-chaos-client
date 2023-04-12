import React, { FC } from 'react';
import { Button, Item, Label } from 'semantic-ui-react';

interface ILoopBoxPanelListItemProps {
    systemId: string;
    systemName: string;
    systemDescription: string;
    connectedDate: string;
    userLinkHref: string;
}

const LoopBoxPanelListItem: FC<ILoopBoxPanelListItemProps> = ((props: ILoopBoxPanelListItemProps) => {
    const {
        systemId,
        systemName,
        systemDescription,
        connectedDate,
        userLinkHref
    } = props;

    return (
        <Item>
            <Item.Image
                size="tiny"
                src={`/assets/applogo50.png`}
            />

            <Item.Content>
                <Item.Header>{systemName}</Item.Header>
                <Item.Meta>
                    <span><strong>Connected:</strong> {connectedDate}</span>
                </Item.Meta>
                <Item.Description>{systemDescription}</Item.Description>
                <Item.Extra>
                    <Label icon="computer" content={systemId} />
                    <Button primary floated="right" size="small" href={userLinkHref}>Connect</Button>
                </Item.Extra>
            </Item.Content>
        </Item>
    );
});

export default LoopBoxPanelListItem;
