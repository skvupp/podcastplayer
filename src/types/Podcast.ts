import {Episode} from './Episode';

export interface Podcast {
    title: string;
    description: string;
    link: string;
    image: string;
    items: Episode[];
}
