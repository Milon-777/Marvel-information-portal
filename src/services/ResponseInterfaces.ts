interface Response<T> {
    code: number;
    status: string;
    copyright: string;
    attributionText: string;
    attributionHTML: string;
    data: T;
    etag: string;
}

interface Data<T> {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: Array<T>;
}

interface FullInfo {
    id: number;
    description: string;
    modified: Date;
    resourceURI: string;
    urls: Array<Url>;
    thumbnail: Image;
    stories: List;
    events: List;
}

interface CharacterResponse extends Response<CharacterData> {}
interface ComicResponse extends Response<ComicData> {}

interface CharacterData extends Data<CharacterFullInfo> {}
interface ComicData extends Data<ComicFullInfo> {}

interface CharacterFullInfo extends FullInfo {
    name: string;
    comics: List;
    series: List;
}

interface ComicFullInfo extends FullInfo {
    digitalId: number;
    title: string;
    issueNumber: number;
    variantDescription: number;
    isbn: string;
    upc: string;
    diamondCode: string;
    ean: string;
    issn: string;
    format: string;
    pageCount: number;
    textObjects: Array<TextObject>;
    series: Summary;
    variants: Array<Summary>;
    collections: Array<Summary>;
    collectedIssues: Array<Summary>;
    dates: Array<ComicDate>;
    prices: Array<ComicPrice>;
    images: Array<Image>;
    creators: List;
    characters: List;
}

// interface ComicFullInfo
//     extends Omit<CharacterFullInfo, "name" | "comics" | "series"> {
//     digitalId: number;
//     title: string;
//     issueNumber: number;
//     variantDescription: number;
//     isbn: string;
//     upc: string;
//     diamondCode: string;
//     ean: string;
//     issn: string;
//     format: string;
//     pageCount: number;
//     textObjects: Array<TextObject>;
//     series: Summary;
//     variants: Array<Summary>;
//     collections: Array<Summary>;
//     collectedIssues: Array<Summary>;
//     dates: Array<ComicDate>;
//     prices: Array<ComicPrice>;
//     images: Array<Image>;
//     creators: List;
//     characters: List;
// }

interface CharacterInfo
    extends Omit<
        CharacterFullInfo,
        | "modified"
        | "resourceURI"
        | "thumbnail"
        | "urls"
        | "stories"
        | "events"
        | "series"
    > {
    thumbnail: string;
    homepage: string;
    wiki: string;
}

interface ComicInfo
    extends Pick<ComicFullInfo, "id" | "title" | "description"> {
    thumbnail: string;
    language: string;
    price: string;
    pageCount: string;
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

interface TextObject {
    type: string;
    language: string;
    text: string;
}

interface ComicDate {
    type: string;
    date: Date;
}

interface ComicPrice {
    type: string;
    price: number;
}

export type {
    CharacterResponse,
    CharacterFullInfo,
    CharacterInfo,
    Image,
    Url,
    ComicFullInfo,
    ComicInfo,
};
