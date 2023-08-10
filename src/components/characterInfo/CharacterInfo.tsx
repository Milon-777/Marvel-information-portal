import { Component, ErrorInfo } from "react";

import MarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";

import { CharacterInfo as Character } from "../../services/ResponseInterfaces";

import "./characterInfo.scss";

interface State {
    character: Character;
    loading: boolean;
    error: boolean;
}
interface Props {
    characterId: number | null;
}

class CharacterInfo extends Component<Props, State> {
    state = {
        character: {
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
        },
        loading: false,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount(): void {
        this.updateCharacter();
    }

    componentDidUpdate(
        prevProps: Readonly<Props>,
        prevState: Readonly<State>
    ): void {
        if (this.props.characterId !== prevProps.characterId) {
            this.updateCharacter();
        }
    }

    onCharacterLoaded = (character: Character): void => {
        this.setState({ character, loading: false });
    };

    onCharacterLoading = (): void => {
        this.setState({ loading: true });
    };

    onError = (): void => {
        this.setState({ loading: false, error: true });
    };

    updateCharacter = () => {
        const { characterId } = this.props;
        if (!characterId) {
            return;
        }

        this.onCharacterLoading();

        this.marvelService
            .getCharacterById(characterId)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    };

    render() {
        const { character, loading, error } = this.state;
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
    }
}

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
