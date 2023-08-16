import { CharacterInfo } from "../../../services/ResponseInterfaces";
import "./singleCharacterPage.scss";

type Props = {
    data: CharacterInfo;
};

const SingleCharacterPage: React.FC<Props> = ({ data }) => {
    const { name, description, thumbnail } = data;

    console.log(`character`, data.name);

    return (
        <div className="single-character">
            <img src={thumbnail} alt={name} className="single-character__img" />
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <p className="single-character__descr">{description}</p>
            </div>
        </div>
    );
};

export default SingleCharacterPage;
