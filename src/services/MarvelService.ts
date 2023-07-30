import {
    CharacterResponse,
    CharacterFullInfo,
    CharacterInfo,
} from "./ResponseInterfaces";

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

    public getAllCharacters = async (): Promise<Array<CharacterInfo>> => {
        const res: CharacterResponse = await this.getResource(
            `${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`
        );
        return res.data.results.map(this._transformCharacter);
    };

    public getCharacterById = async (id: number): Promise<CharacterInfo> => {
        const res: CharacterResponse = await this.getResource(
            `${this._apiBase}characters/${id}?${this._apiKey}`
        );
        return this._transformCharacter(res.data.results[0]);
    };

    private _transformCharacter = (res: CharacterFullInfo): CharacterInfo => {
        return {
            name: res.name,
            description: res.description
                ? `${res.description.slice(0, 210)}...`
                : "There is no description for this character",
            thumbnail: `${res.thumbnail.path}.${res.thumbnail.extension}`,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
        };
    };
}

export default MarvelService;
