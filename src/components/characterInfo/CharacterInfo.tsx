import { useState, useEffect } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import { CharacterInfo as Character } from "../../services/ResponseInterfaces";
import useMarvelService from "../../services/MarvelService";

import "./characterInfo.scss";

interface Props {
    characterId: number | null;
}

const CharacterInfo: React.FC<Props> = (props) => {
    const [character, setCharacter] = useState<Character>({
        id: 0,
        name: "",
        description: "",
        thumbnail: "",
        homepage: "",
        wiki: "",
        comics: {
            available: 0,
            returned: 0,
            collectionURI: "",
            items: [],
        },
    });
    const { error, loading, getCharacterById, clearError } = useMarvelService();

    useEffect(() => {
        updateCharacter();
    }, [props.characterId]);

    const onCharacterLoaded = (character: Character): void => {
        setCharacter(character);
    };

    const updateCharacter = () => {
        const { characterId } = props;
        if (!characterId) {
            return;
        }

        clearError();
        getCharacterById(characterId).then(onCharacterLoaded);
    };

    const skeleton = character.id || loading || error ? null : <Skeleton />;
    const errorMessage = error ? <ErrorMessage /> : null;
    const loadingSpinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !character.id) ? (
        <View {...character} />
    ) : null;

    return (
        <div className="character__info">
            {skeleton}
            {errorMessage}
            {loadingSpinner}
            {content}
        </div>
    );
};

const View: React.FC<Character> = (character) => {
    const { name, description, thumbnail, homepage, wiki, comics } = character;

    return (
        <>
            <div className="character__basics">
                <img src={thumbnail} alt={name} />
                <div>
                    <div className="character__info-name">{name}</div>
                    <div className="character__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="character__descr">{description}</div>
            <div className="character__comics">Comics:</div>
            <ul className="character__comics-list">
                {comics.items.length > 0
                    ? null
                    : `There are no comics with this character`}
                {comics.items.map((comic, index) => {
                    if (!comic) {
                        return (
                            <li key={index} className="character__comics-item">
                                There is no comics
                            </li>
                        );
                    }
                    if (index > 9) {
                        return;
                    }
                    return (
                        <li key={index} className="character__comics-item">
                            {comic.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

export default CharacterInfo;
