import { Component } from "react";
import "./randomCharacter.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";
import { CharacterInfo } from "../../services/ResponseInterfaces";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

interface Character extends CharacterInfo {}
interface State {
    character: Character | {};
    loading: boolean;
    error: boolean;
}
interface Props {}

class RandomCharacter extends Component<Props, State> {
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
                collectionURI: "string",
                items: [],
            },
        },
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount(): void {
        this.updateCharacter();
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

    updateCharacter = (): void => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharacterLoading();
        this.marvelService
            .getCharacterById(id)
            .then(this.onCharacterLoaded)
            .catch(this.onError);
    };

    render() {
        const { character, loading, error } = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const loadingSpinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View {...character} /> : null;

        return (
            <div className="random-character">
                {errorMessage}
                {loadingSpinner}
                {content}
                <div className="random-character__static">
                    <p className="random-character__title">
                        Random character for today!
                        <br />
                        Do you want to get to know him better?
                    </p>
                    <p className="random-character__title">
                        Or choose another one
                    </p>
                    <button
                        className="button button__main"
                        onClick={() => this.updateCharacter()}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img
                        src={mjolnir}
                        alt="mjolnir"
                        className="random-character__decoration"
                    />
                </div>
            </div>
        );
    }
}

const View: React.FC<Character> = (character) => {
    const { name, description, thumbnail, homepage, wiki } = character;

    return (
        <div className="random-character__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="random-character__img"
            />
            <div className="random-character__info">
                <p className="random-character__name">{name}</p>
                <p className="random-character__descr">{description}</p>
                <div className="random-character__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomCharacter;
