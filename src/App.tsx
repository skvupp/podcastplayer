import React, { useState } from 'react';
import {Col, message, Row} from 'antd';
import {getRSS} from './api';
import {Channel} from './types/Channel';
import SearchList from './Components/SearchList';
import {Podcast} from './types/Podcast';
import PodcastSite from './Components/PodcastSite';
import {SearchField} from './Components/SearchField';
import {Shortcuts} from './Components/Shortcuts';

export default function App(): React.ReactElement {
    const [channels, setChannels] = useState<Channel[]>([]);
    const [podcastInfo, setPodcastInfo] = useState<{ podcast?: Podcast, rssUrl?: string }>({});
    const [searchMode, setSearchMode] = useState<boolean>(false);

    const { podcast, rssUrl } = podcastInfo;

    const onSelect = async (url: string)=> {
        try {
            const pod = await getRSS(url);
            setPodcastInfo({podcast: pod, rssUrl: url});
            setSearchMode(false);
        } catch (e) {
            const error = e as Error;
            message.error(error['message']);
        }
    };


    return (<Row>
        <Col span={4} offset={2}>
            <Shortcuts onSelect={onSelect} />
        </Col>
        <Col span={10} >
            <Row>
                <SearchField setSearchMode={setSearchMode} setChannels={setChannels} />
            </Row>
            <Row>
                <SearchList channels={channels} onSelect={onSelect} visible={searchMode} />
                <PodcastSite podcast={podcast} visible={!searchMode} rssUrl={rssUrl} />
            </Row>
        </Col>
    </Row>
    );
}
