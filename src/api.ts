import {Channel} from './types/Channel';
import {Podcast} from './types/Podcast';
import {parse} from 'rss-to-json';
import {Episode} from './types/Episode';
import {encode} from 'base64-arraybuffer';

export async function getPodcastList(search: string): Promise<Channel[]>{
    const query = `{
    podcasts(searchTerm: "${search}") {
        paginatorInfo {
            currentPage,
            hasMorePages,
            lastPage,
        },
        data {
            title,
            description,
            imageUrl,
            rssUrl
        }
    }}`;
    const Authorization = `Bearer ${process.env['REACT_APP_PODCHASER_ACCESS_TOKEN']}`;

    if(!Authorization) return [];

    const result = await fetch('https://api.podchaser.com/graphql',
        {
            method: 'POST',
            headers: {
                Authorization,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({query})
        });
    const full = await result.json();
    return full.data.podcasts.data;
}

export async function getRSS(rss: string): Promise<Podcast> {
    const res = await parse(rss, {});
    return res as Podcast;
}

export async function getBase64Audio(item: Episode): Promise<string> {
    const {link, enclosures} = item;
    const {url} = enclosures[0];
    const token = localStorage.getItem(link);
    const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
    const result = await fetch(url, {method: 'GET', headers});
    if(result.status === 401) {
        localStorage.removeItem(link);
        throw Error('Not authorized');
    }
    console.log(result.status);
    const arrayBuffer = await result.arrayBuffer();
    const base64 = encode(arrayBuffer);
    return `data:audio/mpeg;base64,${base64}`;
}
