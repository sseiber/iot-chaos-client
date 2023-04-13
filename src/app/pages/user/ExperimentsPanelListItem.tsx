import React, { FC } from 'react';
import { Item, Label } from 'semantic-ui-react';

interface IExperimentsPanelListItemProps {
    id: string;
    active: boolean;
    name: string;
    subtitle: string;
    description: string;
}

const ExperimentsPanelListItem: FC<IExperimentsPanelListItemProps> = ((props: IExperimentsPanelListItemProps) => {
    const {
        id,
        active,
        name,
        subtitle,
        description
    } = props;

    return (
        <Item key={id}>
            <Item.Image style={{ height: '72px', width: '72px' }} src='/assets/applogo150.png' />

            <Item.Content>
                <Item.Header>{name}</Item.Header>
                <Item.Meta>
                    <span>{subtitle}</span>
                </Item.Meta>
                <Item.Description>{description}</Item.Description>
                <Item.Extra>
                    <Label
                        icon='check circle'
                        color={active ? 'green' : 'grey'}
                        content={active ? 'active' : 'disabled'}
                    />
                </Item.Extra>
            </Item.Content>
        </Item>
    );
});

export default ExperimentsPanelListItem;
