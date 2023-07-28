import { CharacterResponse } from "./ResponseInterfaces";

interface Character {
    name: string;
    description: string;
    thumbnail: string;
    homepage: string;
    wiki: string;
}

class MarvelService {
    private _apiBase = "https://gateway.marvel.com:443/v1/public/";
    private _apiKey = "apikey=748e83ba2c9bf92e5102e19762a1d9d9";

    private getResource = async (
        url: string
    ): Promise<CharacterResponse> | never => {
        let res: Response = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    };

    public getAllCharacters = (): Promise<CharacterResponse> => {
        return this.getResource(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
        );
    };

    public getCharacterById = async (id: number): Promise<Character> => {
        const res: CharacterResponse = await this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
        return this._transformCharacter(res);
    };

    private _transformCharacter = (res: CharacterResponse): Character => {
        return {
            name: res.data.results[0].name,
            description: res.data.results[0].description,
            thumbnail: `${res.data.results[0].thumbnail.path}.${res.data.results[0].thumbnail.extension}`,
            homepage: res.data.results[0].urls[0].url,
            wiki: res.data.results[0].urls[1].url,
        };
    };
}

export default MarvelService;
