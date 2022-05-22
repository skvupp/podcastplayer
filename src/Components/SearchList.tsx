import React from 'react';
import {Avatar, List } from 'antd';
import {Channel} from '../types/Channel';

interface Props {
    visible: boolean
    channels: Channel[];
    onSelect: (rssUrl: string)=> void
}

export default function SearchList(props: Props): JSX.Element {
    const {channels, onSelect, visible} = props;
    if(!visible) return <></>;
    const onClick = async (channel: Channel)=>{
        onSelect(channel.rssUrl);
    };
    return (<List
        style={{width: '100%'}}
        itemLayout="horizontal"
        dataSource={channels}
        renderItem={item => (
            <List.Item onClick={()=>onClick(item)}>
                <List.Item.Meta
                    avatar={<Avatar src={item.imageUrl}/>}
                    title={item.title}
                    description={item.description}
                />
            </List.Item>
        )}
    />
    );
}
