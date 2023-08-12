import { RefCallback, useEffect, useRef, useState } from "react";

import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

import useMarvelService from "../../services/MarvelService";
import { ComicInfo } from "../../services/ResponseInterfaces";

import "./comicList.scss";

const ComicsList = () => {
    const { error, loading, getAllComics } = useMarvelService();
    const [comics, setComics] = useState<ComicInfo[]>([]);
    const [loadingNewComics, setLoadingNewComics] = useState(true);
    const [offset, setOffset] = useState(0);
    const [charactersEnded, setCharactersEnded] = useState(false);
    const itemRefs = useRef<HTMLLIElement[]>([]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    useEffect(() => {
        if (loadingNewComics && !charactersEnded) {
            onRequest(offset, true);
        }
    }, [loadingNewComics]);

    const setRef: RefCallback<HTMLLIElement> = (ref: HTMLLIElement): void => {
        if (ref) {
            itemRefs.current.push(ref);
        }
    };

    // const focusOnCharacter = (id: number): void => {
    //     itemRefs.current.forEach((item) => {
    //         if (item) {
    //             item.classList.remove("character__item_selected");
    //         }
    //     });
    //     if (itemRefs.current[id]) {
    //         itemRefs.current[id].classList.add("character__item_selected");
    //         itemRefs.current[id].focus();
    //     }
    // };

    const onScroll = (): void => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setLoadingNewComics(true);
        }
    };

    const onRequest = (
        offsetValue: number = offset,
        initial: boolean
    ): void => {
        initial ? setLoadingNewComics(false) : setLoadingNewComics(true);

        console.log(`fetch`);

        getAllComics(offsetValue)
            .then(onComicsLoaded)
            .finally(() => setLoadingNewComics(false));
    };

    const onComicsLoaded = (newComics: ComicInfo[]): void => {
        setComics((comics) => [...comics, ...newComics]);

        setLoadingNewComics(false);
        setOffset((offset) => offset + 8);
        setCharactersEnded(newComics.length < 8 ? true : false);
    };

    function renderItems(comics: ComicInfo[]): JSX.Element {
        const comicList = comics.map((comic, index) => {
            return (
                <li
                    ref={(element) => setRef(element)}
                    className="comic__item"
                    key={index}
                >
                    <a href="#">
                        <img
                            src={comic.thumbnail}
                            alt={comic.title}
                            className="comic__item-img"
                        />
                        <div className="comic__item-name">{comic.title}</div>
                        <div className="comic__item-price">{comic.price}</div>
                    </a>
                </li>
            );
        });

        return <ul className="comic__grid">{comicList}</ul>;
    }

    const comicList = renderItems(comics);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !loadingNewComics ? <Spinner /> : null;

    return (
        <div className="comic__list">
            {errorMessage}
            {spinner}
            {comicList}
            <button
                disabled={loadingNewComics}
                style={{ display: charactersEnded ? "none" : "block" }}
                onClick={() => onRequest(offset, false)}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
