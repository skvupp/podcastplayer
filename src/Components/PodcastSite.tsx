import React, {useEffect, useState} from 'react';
import {Image, Layout, List, message} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content, Footer } from 'antd/es/layout/layout';
import {Podcast} from '../types/Podcast';
import { stripHtml } from 'string-strip-html';

import ReactAudioPlayer from 'react-audio-player';
import {Episode} from '../types/Episode';
import {TokenModal} from './TokenModal';
import {getBase64Audio} from '../api';

export default function PodcastSite(props: {podcast?: Podcast; visible: boolean}) {
    const { podcast, visible } = props;
    const [audioConfig, setAudioConfig] = useState<{ src?: string; autoplay: boolean }>({ autoplay: false});
    const [tokenModal, openModal] = useState<{ visible: boolean; item?: Episode }>({ visible: false });
    const { src, autoplay } = audioConfig;

    useEffect(()=>{ setAudioConfig({ autoplay: false, src: undefined });}, [podcast]);

    if(!podcast || !visible) return <></>;
    const { title, image, description, items } = podcast;

    const playerElement = () => {
        if(!src) return <></>;
        return (<ReactAudioPlayer
            src={src}
            controls
            autoPlay={autoplay} />);
    };

    const itemImageSrc = (item: Episode) => {
        if(!item) return image;
        if(!item.itunes_image) return image;
        if(!item.itunes_image.href) return image;
        return item.itunes_image.href;
    };

    const playEpisode = async (item: Episode)=> {
        if(item.itunes_episodeType !== 'protected') {
            setAudioConfig({ src: item.enclosures[0].url, autoplay: true });
            return;
        }
        if(localStorage.getItem(item.link)) {
            try {
                const src = await getBase64Audio(item);
                setAudioConfig({ src, autoplay: true});
            } catch (e) {
                message.error((e as Error).message);
            }
            return;
        }
        openModal({ visible: true, item});
    };


    return <><Layout>
        <Content><h2 style={{margin: '20px'}}>{title}</h2></Content>
        <Layout>
            <Sider style={{backgroundColor: 'white'}}><Image src={image} /></Sider>
            <Content style={{padding: '10px'}}>{stripHtml(description).result}</Content>
        </Layout>
        <Footer>{playerElement()}</Footer>
    </Layout>;
    <List
        style={{width: '100%'}}
        itemLayout="horizontal"
        dataSource={items}
        renderItem={item => (
            <List.Item extra={<Image src={itemImageSrc(item)} style={{width: '150px'}}/>}
                onClick={()=>playEpisode(item)}>
                <List.Item.Meta
                    title={item.title}
                    description={stripHtml(item.description).result}
                />
            </List.Item>
        )}
    />
    <TokenModal visible={tokenModal.visible}  item={tokenModal.item} onSuccess={playEpisode} onFail={console.log}/>
    </>;

}
