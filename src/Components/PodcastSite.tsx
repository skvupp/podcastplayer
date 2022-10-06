import React, {useEffect, useState} from 'react';
import { Col, Image, Layout, List, message, Row} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content, Footer } from 'antd/es/layout/layout';
import {Podcast} from '../types/Podcast';
import { stripHtml } from 'string-strip-html';

import ReactAudioPlayer from 'react-audio-player';
import {Episode} from '../types/Episode';
import {TokenModal} from './TokenModal';
import {getBase64Audio} from '../api';
import {LockOutlined, UnlockOutlined} from '@ant-design/icons';

export default function PodcastSite(props: {podcast?: Podcast; visible: boolean; rssUrl?: string}) {
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

    const avatar = (item: Episode)=> {
        if(item.itunes_episodeType !== 'protected') return <></>;
        if(!localStorage.getItem(item.link)) {
            return <LockOutlined />;
        }
        return <UnlockOutlined />;
    };


    return <><Layout>
        <Content><h2 style={{margin: '20px'}}>{title}</h2></Content>
        <Layout>
            <Sider style={{backgroundColor: 'white'}}><Image src={image} /></Sider>
            <Content style={{padding: '10px'}}>{stripHtml(description).result}</Content>
        </Layout>
        <Footer>
            <Row>
                <Col span={12}>{playerElement()}</Col>
            </Row></Footer>
    </Layout>
    <List
        style={{width: '100%' }}
        itemLayout="horizontal"
        dataSource={items}
        renderItem={item => (
            <a>
                <List.Item extra={<Image src={itemImageSrc(item)} style={{width: '150px'}}/>}
                    onClick={()=>playEpisode(item)} >
                    <List.Item.Meta
                        title={item.title}
                        description={stripHtml(item.description).result}
                        avatar={avatar(item)}
                    />
                </List.Item>
            </a>
        )}
    />
    <TokenModal visible={tokenModal.visible}  item={tokenModal.item} onSuccess={(item)=> {
        openModal({ visible: false });
        playEpisode(item);
    }} onClose={()=>openModal({ visible: false })}/>
    </>;

}
