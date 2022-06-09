export interface Episode {
    title: string;
    description: string;
    link: string;
    author: string;
    published: number;
    created: number;
    category: string[];
    enclosures: { url: string; length: string; type: string; }[],
    itunes_summary: string;
    itunes_explicit: string;
    itunes_duration: number,
    itunes_season: number,
    itunes_episode: number,
    itunes_episodeType: string,
    itunes_image: {
        href: string
    }

}
