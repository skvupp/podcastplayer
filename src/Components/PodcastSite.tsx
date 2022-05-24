import React, {useState} from 'react';
import { Image, Layout, List} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content, Footer } from 'antd/es/layout/layout';
import {Podcast} from '../types/Podcast';
import ReactAudioPlayer from 'react-audio-player';

export default function PodcastSite(props: {podcast?: Podcast; visible: boolean}) {
    const { podcast, visible } = props;
    const [audioSrc, setAudioSrc] = useState<string | undefined>();

    if(!podcast || !visible) return <></>;
    const { title, image, description, items } = podcast;



    return <><Layout>
        <Content><h2 style={{margin: '20px'}}>{title}</h2></Content>
        <Layout>
            <Sider style={{backgroundColor: 'white'}}><Image src={image} /></Sider>
            <Content style={{padding: '10px'}}>{description}</Content>
        </Layout>
        <Footer><ReactAudioPlayer
            src={audioSrc}
            controls
            autoPlay
        /></Footer>
    </Layout>;
    <List
        style={{width: '100%'}}
        itemLayout="horizontal"
        dataSource={items}
        renderItem={item => (
            <List.Item extra={<Image src={item.itunes_image.href} style={{width: '150px'}}/>} onClick={()=>setAudioSrc(item.enclosures[0].url)}>
                <List.Item.Meta
                    title={item.title}
                    description={item.description}
                />
            </List.Item>
        )}
    /></>;

}
