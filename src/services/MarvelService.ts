import useHttp from "../hooks/httpHook";

import {
    CharacterResponse,
    CharacterFullInfo,
    CharacterInfo,
    ComicInfo,
    ComicFullInfo,
} from "./ResponseInterfaces";

const useMarvelService = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public/";
    const _apiKey = "apikey=748e83ba2c9bf92e5102e19762a1d9d9";
    const _baseOffset = 210;

    const getAllCharacters = async (
        offset: number = _baseOffset
    ): Promise<Array<CharacterInfo>> => {
        const res: CharacterResponse = await request(
            `${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformCharacter);
    };

    const getAllComics = async (
        offset: number = 0
    ): Promise<Array<ComicInfo>> => {
        const res = await request(
            `${_apiBase}comics?orderBy=issueNumber&limit=8&offset=${offset}&${_apiKey}`
        );
        return res.data.results.map(_transformComic);
    };

    const getCharacterById = async (id: number): Promise<CharacterInfo> => {
        const res: CharacterResponse = await request(
            `${_apiBase}characters/${id}?${_apiKey}`
        );
        return _transformCharacter(res.data.results[0]);
    };

    const getComicById = async (id: number): Promise<ComicInfo> => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    };

    const _transformCharacter = (res: CharacterFullInfo): CharacterInfo => {
        return {
            id: res.id,
            name: res.name,
            description: res.description
                ? `${res.description.slice(0, 210)}...`
                : "There is no description for this character",
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics,
        };
    };

    const _transformComic = (comic: ComicFullInfo): ComicInfo => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || "There is no description",
            pageCount: comic.pageCount
                ? `${comic.pageCount} p.`
                : "No information about the number of pages",
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
            language: comic.textObjects[0]?.language || "en-us",
            // optional chaining operator
            price: comic.prices[0].price
                ? `${comic.prices[0].price}$`
                : "not available",
        };
    };

    return {
        loading,
        error,
        getAllCharacters,
        getCharacterById,
        getAllComics,
        getComicById,
        clearError,
    };
};

export default useMarvelService;
