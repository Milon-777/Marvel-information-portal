import { Component } from "react";
import "./randomCharacter.scss";
import mjolnir from "../../resources/img/mjolnir.png";
import MarvelService from "../../services/MarvelService";
import { CharacterInfo } from "../../services/ResponseInterfaces";

interface Character extends Record<keyof CharacterInfo, null | string> {}
interface State {
    character: Character;
}
interface Props {}

class RandomCharacter extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.updateCharacter();
    }

    state = {
        character: {
            name: null,
            description: null,
            thumbnail: null,
            homepage: null,
            wiki: null,
        },
    };

    marvelService = new MarvelService();

    onCharacterLoaded = (character: Character): void => {
        this.setState({ character });
    };

    updateCharacter = (): void => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService.getCharacterById(id).then(this.onCharacterLoaded);
    };

    render() {
        const {
            character: { name, description, thumbnail, homepage, wiki },
        } = this.state;

        console.log(`descr: ${description}`);

        return (
            <div className="random-character">
                <div className="random-character__block">
                    <img
                        src={thumbnail ?? "#"}
                        alt="Random character"
                        className="random-character__img"
                    />
                    <div className="random-character__info">
                        <p className="random-character__name">{name}</p>
                        <p className="random-character__descr">
                            {description ?? "No description"}
                        </p>
                        <div className="random-character__btns">
                            <a
                                href={homepage ?? "#"}
                                className="button button__main"
                            >
                                <div className="inner">Homepage</div>
                            </a>
                            <a
                                href={wiki ?? "#"}
                                className="button button__secondary"
                            >
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="random-character__static">
                    <p className="random-character__title">
                        Random character for today!
                        <br />
                        Do you want to get to know him better?
                    </p>
                    <p className="random-character__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
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

export default RandomCharacter;
