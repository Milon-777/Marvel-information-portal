interface CharacterResponse {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: CharacterData;
    etag: string;
}

interface CharacterData {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<CharacterFullInfo>;
}

interface CharacterFullInfo {
    id: number;
    name: string;
    description: string;
    modified: Date;
    resourceURI: string;
    urls: Array<Url>;
    thumbnail: Image;
    comics: Array<List>;
    stories: Array<List>;
    events: Array<List>;
    series: Array<List>;
}

interface CharacterInfo {
    name: string;
    description: string;
    thumbnail: string;
    homepage: string;
    wiki: string;
}

interface Url {
    type: string;
    url: string;
}

interface Image {
    path: string;
    extension: string;
}

interface List {
    available: number;
    returned: number;
    collectionURI: string;
    items: Array<Summary>;
}

interface Summary {
    resourceURI: string;
    name: string;
}

export type { CharacterResponse, CharacterFullInfo, CharacterInfo, Image, Url };
