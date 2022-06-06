import {Channel} from './types/Channel';
import {Podcast} from './types/Podcast';
import {parse} from 'rss-to-json';

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
