import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";

import Spinner from "../../spinner/Spinner";
import ErrorMessage from "../../errorMessage/ErrorMessage";
import Skeleton from "../../skeleton/Skeleton";

import { ComicInfo } from "../../../services/ResponseInterfaces";
import useMarvelService from "../../../services/MarvelService";

import "./singleComicPage.scss";

const SingleComicPage = () => {
    const { comicId } = useParams();
    const [comic, setComic] = useState<ComicInfo>({
        id: 0,
        title: "",
        description: "",
        thumbnail: "",
        language: "",
        price: "",
        pageCount: "",
    });
    const { error, loading, getComicById, clearError } = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        if (!comicId) {
            return;
        }

        clearError();
        getComicById(Number(comicId)).then(onComicLoaded);
    };

    const onComicLoaded = (comic: ComicInfo): void => {
        setComic(comic);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const loadingSpinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !comic.id) ? (
        <View {...comic} />
    ) : null;

    return (
        <>
            {errorMessage}
            {loadingSpinner}
            {content}
        </>
    );
};

const View: React.FC<ComicInfo> = (comic): JSX.Element => {
    const { title, description, thumbnail, language, price, pageCount } = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img" />
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleComicPage;
