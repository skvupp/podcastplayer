import {Input} from 'antd';
import React, {ChangeEvent} from 'react';
import {getPodcastList} from '../api';
import {Channel} from '../types/Channel';

export function SearchField(props: {setSearchMode: (inSearchMode: boolean)=>void; setChannels: (channels: Channel[])=> void }): JSX.Element {
    const {setSearchMode, setChannels} = props;
    const onSearch = async (event: ChangeEvent) => {
        if(!event.target) return;
        const val = (event.target as HTMLInputElement).value;
        setSearchMode(true);

        if(val.length < 3) {
            setChannels([]);
            return;
        }
        const results = await getPodcastList(val);
        if(!results) return;
        setChannels(results);
    };
    return (<Input allowClear style={{width: '100%', margin: '10px'}} placeholder="Search for podcasts" onChange={onSearch} />);
}
