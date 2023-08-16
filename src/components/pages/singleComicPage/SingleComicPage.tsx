import { Link } from "react-router-dom";

import "./singleComicPage.scss";
import { CharacterInfo, ComicInfo } from "../../../services/ResponseInterfaces";

interface Props {
    data: ComicInfo;
}

const SingleComicPage: React.FC<Props> = ({ data }) => {
    const { title, description, pageCount, thumbnail, language, price } = data;

    console.log(data);

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
