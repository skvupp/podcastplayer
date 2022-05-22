import React from 'react';
import { Image, Layout, List} from 'antd';
import Sider from 'antd/es/layout/Sider';
import {Content, Footer } from 'antd/es/layout/layout';
import {Podcast} from '../types/Podcast';

export default function PodcastSite(props: {podcast?: Podcast; visible: boolean}) {
    const { podcast, visible } = props;
    if(!podcast || !visible) return <></>;
    const { title, image, description, items } = podcast;

    return <><Layout>

        <Content><h2 style={{margin: '20px'}}>{title}</h2></Content>
        <Layout>
            <Sider style={{backgroundColor: 'white'}}><Image src={image} /></Sider>
            <Content style={{padding: '10px'}}>{description}</Content>
        </Layout>
        <Footer><b>{items[0].author}</b></Footer>
    </Layout>;
    <List
        style={{width: '100%'}}
        itemLayout="horizontal"
        dataSource={items}
        renderItem={item => (
            <List.Item extra={<Image src={item.itunes_image.href} style={{width: '150px'}}/>}>
                <List.Item.Meta
                    title={item.title}
                    description={item.description}
                />
            </List.Item>
        )}
    /></>;

}
