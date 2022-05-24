import React, {ChangeEvent, useState} from 'react';
import {Col, Input, Row } from 'antd';
import {getPodcastList, getRSS} from './api';
import {Channel} from './types/Channel';
import SearchList from './Components/SearchList';
import {Podcast} from './types/Podcast';
import PodcastSite from './Components/PodcastSite';


export default function App(): React.ReactElement {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [podcast, setPodcast] = useState<Podcast>();
    const [searchMode, setSearchMode] = useState<boolean>(false);

    const onSearch = async (event: ChangeEvent) => {
        if(!event.target) return;
        const val = (event.target as HTMLInputElement).value;
        setSearchMode(true);

        if(val.length < 4) {
            setChannels([]);
            return;
        }
        const results = await getPodcastList(val);
        if(!results) return;
        setChannels(results);
    };

    const onSelect = async (rssUrl: string)=> {
        const podcast = await getRSS(rssUrl);
        setPodcast(podcast);
        setSearchMode(false);
    };


    return (
        <Col span={10} offset={6}>
            <Row>
                <Input
                    allowClear
                    style={{width: '100%'}}
                    placeholder="Select a person"
                    onChange={onSearch}
                >
                </Input>
            </Row>
            <Row>
                <SearchList channels={channels} onSelect={onSelect} visible={searchMode} />
                <PodcastSite podcast={podcast} visible={!searchMode} />
            </Row>
        </Col>
    );
}
