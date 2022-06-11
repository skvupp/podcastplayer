import {Button} from 'antd';
import React from 'react';

export function Shortcuts(props: {onSelect: (url: string)=>void}): JSX.Element {
    const { onSelect } = props;
    return  <><h3 style={{ marginTop: '60px', width: '80%' }}>Podcast examples</h3>
        <Button style={{ marginTop: '5px', width: '80%' }} type="default" onClick={()=>onSelect('http://localhost:8080/rss')}>
        Protected podcast
        </Button>
        <Button style={{ marginTop: '5px', width: '80%' }} type="default" onClick={()=>onSelect('https://feed.podbean.com/cdspill/feed.xml')}>
        cd SPILL
        </Button><br />
        <Button style={{ marginTop: '5px', width: '80%' }} type="default" onClick={()=>onSelect('https://anchor.fm/s/84ca3aa8/podcast/rss')}>
        90-tallspodden
        </Button><br />
        <Button style={{ marginTop: '5px', width: '80%' }} type="default" onClick={()=>onSelect('https://www.omnycontent.com/d/playlist/233f32b3-2136-45a7-b0f5-aab200d79708/b38fe555-0830-48e8-8f82-ae3600cd6220/4ab6df40-d62c-4ffc-87b6-ae3600cd6237/podcast.rss')}>
        Kode24-timen
        </Button></>;
}
