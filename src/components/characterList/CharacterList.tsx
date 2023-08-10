import React, {
    Component,
    LegacyRef,
    RefObject,
    RefCallback,
    createRef,
} from "react";
import MarvelService from "../../services/MarvelService";
import { CharacterInfo } from "../../services/ResponseInterfaces";

import "./characterList.scss";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

interface State {
    characters: CharacterInfo[];
    loading: boolean;
    error: boolean;
    loadingNewCharacters: boolean;
    offset: number;
    charactersEnded: boolean;
}
type Props = { onCharacterSelected: (id: number) => void };

class CharacterList extends Component<Props, State> {
    state = {
        characters: [],
        loading: true,
        error: false,
        loadingNewCharacters: false,
        offset: 210,
        charactersEnded: false,
    };
    marvelService = new MarvelService();
    itemRefs: HTMLLIElement[] = [];

    componentDidMount = (): void => {
        this.onRequest();
        if (this.state.offset < 219) {
            this.onRequest();
        }
        window.addEventListener("scroll", this.onScroll);
    };

    componentWillUnmount(): void {
        window.removeEventListener("scroll", this.onScroll);
    }

    setRef: RefCallback<HTMLLIElement> = (ref: HTMLLIElement) => {
        if (ref) {
            this.itemRefs.push(ref);
        }
    };

    focusOnCharacter = (id: number): void => {
        this.itemRefs.forEach((item) => {
            if (item) {
                item.classList.remove("character__item_selected");
            }
        });
        if (this.itemRefs[id]) {
            this.itemRefs[id].classList.add("character__item_selected");
            this.itemRefs[id].focus();
        }
    };

    onScroll = (): void => {
        if (this.state.offset < 219) return;
        if (this.state.loadingNewCharacters) return;
        if (this.state.charactersEnded)
            window.removeEventListener("scroll", this.onScroll);

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            this.onCharactersLoading();
            this.onRequest(this.state.offset);
        }
    };

    onRequest = (offset: number = this.state.offset): void => {
        console.log("request");
        this.onCharactersLoading();

        this.marvelService
            .getAllCharacters(offset)
            .then(this.onCharactersLoaded)
            .catch(this.onError);
    };

    onCharactersLoading = (): void => {
        this.setState({ loadingNewCharacters: true });
    };

    onCharactersLoaded = (newCharacters: CharacterInfo[]): void => {
        let ended = false;
        if (newCharacters.length < 9) {
            ended = true;
        }

        this.setState(({ characters, offset }) => ({
            characters: [...characters, ...newCharacters],
            loading: false,
            loadingNewCharacters: false,
            offset: offset + 9,
            charactersEnded: ended,
        }));
    };

    onError = (): void => {
        this.setState({ error: true });
    };

    renderItems(characters: CharacterInfo[]): JSX.Element {
        const characterList = characters.map((character, index) => {
            return (
                <li
                    key={index}
                    className={`character__item`}
                    onClick={() => {
                        this.props.onCharacterSelected(character.id);
                        this.focusOnCharacter(index);
                    }}
                    ref={(ref) => this.setRef(ref)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            this.props.onCharacterSelected(character.id);
                            this.focusOnCharacter(index);
                        }
                    }}
                >
                    <img
                        src={character.thumbnail}
                        alt={character.name}
                        style={{ objectFit: "fill" }}
                    />
                    <div className="character__name">{character.name}</div>
                </li>
            );
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return <ul className="character__grid">{characterList}</ul>;
    }

    render() {
        const {
            characters,
            loading,
            error,
            loadingNewCharacters,
            offset,
            charactersEnded,
        } = this.state;
        const characterList = this.renderItems(characters);
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? characterList : null;

        return (
            <div className="character__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    onClick={() => this.onRequest(offset)}
                    disabled={loadingNewCharacters}
                    style={{ display: charactersEnded ? "none" : "block" }}
                    className="button button__main button__long"
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        );
    }
}

export default CharacterList;
