import useHttp from "../hooks/httpHook";

import {
    CharacterResponse,
    CharacterFullInfo,
    CharacterInfo,
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

    const getCharacterById = async (id: number): Promise<CharacterInfo> => {
        const res: CharacterResponse = await request(
            `${_apiBase}characters/${id}?${_apiKey}`
        );
        return _transformCharacter(res.data.results[0]);
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

    return { loading, error, getAllCharacters, getCharacterById, clearError };
};

export default useMarvelService;
