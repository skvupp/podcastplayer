import React, {ChangeEvent, useState} from 'react';
import {Button, Col, Input, message, Row} from 'antd';
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

        if(val.length < 3) {
            setChannels([]);
            return;
        }
        const results = await getPodcastList(val);
        if(!results) return;
        setChannels(results);
    };

    const onSelect = async (rssUrl: string)=> {
        try {
            const podcast = await getRSS(rssUrl);
            setPodcast(podcast);
            setSearchMode(false);
        } catch (e) {
            const error = e as Error;
            message.error(error['message']);
        }
    };


    return (<Row>
        <Col span={4} offset={2}>
            <h3 style={{ marginTop: '60px', width: '80%' }}>Podcast examples</h3>
            <Button style={{ marginTop: '10px', width: '80%' }} type="primary" onClick={()=>onSelect('http://localhost:8080/rss')}>
            Podcast with som protected episodes
            </Button>
            <Button style={{ marginTop: '10px', width: '80%' }} type="primary" onClick={()=>onSelect('https://feed.podbean.com/cdspill/feed.xml')}>
                cd SPILL
            </Button><br />
            <Button style={{ marginTop: '10px', width: '80%' }} type="primary" onClick={()=>onSelect('https://anchor.fm/s/84ca3aa8/podcast/rss')}>
                90-tallspodden
            </Button><br />
            <Button style={{ marginTop: '10px', width: '80%' }} type="primary" onClick={()=>onSelect('https://www.omnycontent.com/d/playlist/233f32b3-2136-45a7-b0f5-aab200d79708/b38fe555-0830-48e8-8f82-ae3600cd6220/4ab6df40-d62c-4ffc-87b6-ae3600cd6237/podcast.rss')}>
                Kode24-timen
            </Button>
        </Col>
        <Col span={10} >
            <Row>
                <Input
                    allowClear
                    style={{width: '100%', margin: '10px'}}
                    placeholder="Search for podcasts"
                    onChange={onSearch}
                >
                </Input>
            </Row>
            <Row>
                <SearchList channels={channels} onSelect={onSelect} visible={searchMode} />
                <PodcastSite podcast={podcast} visible={!searchMode} />
            </Row>
        </Col>
    </Row>
    );
}
