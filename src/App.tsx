import React, { useState } from 'react';
import {Col, message, Row, Skeleton} from 'antd';
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
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { podcast, rssUrl } = podcastInfo;

    const onSelect = async (url: string)=> {
        try {
            setIsLoading(true);
            const pod = await getRSS(url);
            setIsLoading(false);
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
            {(()=>process.env.REACT_APP_PODCHASER_ACCESS_TOKEN ? <Row>
                <SearchField setSearchMode={setSearchMode} setChannels={setChannels}/>
            </Row> : <div style={{height: '40px'}}></div>)()}
            <Row>
                <>
                    <SearchList channels={channels} onSelect={onSelect} visible={searchMode} />
                    {(()=> {
                        return !isLoading ? <PodcastSite podcast={podcast} visible={!searchMode} rssUrl={rssUrl}/> :
                            <Skeleton/>;
                    })()}
                </>
            </Row>
        </Col>
    </Row>
    );
}
