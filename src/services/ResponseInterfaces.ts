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
    results: Array<Character>;
}

interface Character {
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

export type { CharacterResponse };
