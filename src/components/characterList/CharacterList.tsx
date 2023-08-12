import React, { useState, useEffect, useRef, RefCallback } from "react";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

import useMarvelService from "../../services/MarvelService";
import { CharacterInfo } from "../../services/ResponseInterfaces";

import "./characterList.scss";

type Props = { onCharacterSelected: (id: number) => void };

const CharacterList: React.FC<Props> = (props) => {
    const [characters, setCharacters] = useState<CharacterInfo[]>([]);
    const [loadingNewCharacters, setLoadingNewCharacters] = useState(true); //can be error here
    const [offset, setOffset] = useState(210);
    const [charactersEnded, setCharactersEnded] = useState(false);
    const { error, loading, getAllCharacters } = useMarvelService();
    const itemRefs = useRef<HTMLLIElement[]>([]);

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    useEffect(() => {
        if (loadingNewCharacters && !charactersEnded) {
            onRequest(offset, true);
        }
    }, [loadingNewCharacters]);

    const setRef: RefCallback<HTMLLIElement> = (ref: HTMLLIElement): void => {
        if (ref) {
            itemRefs.current.push(ref);
        }
    };

    const focusOnCharacter = (id: number): void => {
        itemRefs.current.forEach((item) => {
            if (item) {
                item.classList.remove("character__item_selected");
            }
        });
        if (itemRefs.current[id]) {
            itemRefs.current[id].classList.add("character__item_selected");
            itemRefs.current[id].focus();
        }
    };

    const onScroll = (): void => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setLoadingNewCharacters(true);
        }
    };

    const onRequest = (
        offsetValue: number = offset,
        initial: boolean
    ): void => {
        initial
            ? setLoadingNewCharacters(false)
            : setLoadingNewCharacters(true);

        console.log(`fetch`);

        getAllCharacters(offsetValue)
            .then(onCharactersLoaded)
            .finally(() => setLoadingNewCharacters(false));
    };

    const onCharactersLoaded = (newCharacters: CharacterInfo[]): void => {
        setCharacters((characters) => [...characters, ...newCharacters]);

        setLoadingNewCharacters(false);
        setOffset((offset) => offset + 9);
        setCharactersEnded(newCharacters.length < 9 ? true : false);
    };

    function renderItems(characters: CharacterInfo[]): JSX.Element {
        const characterList = characters.map((character, index) => {
            return (
                <li
                    key={index}
                    className={`character__item`}
                    onClick={() => {
                        props.onCharacterSelected(character.id);
                        focusOnCharacter(index);
                    }}
                    ref={(element) => setRef(element)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === " " || e.key === "Enter") {
                            props.onCharacterSelected(character.id);
                            focusOnCharacter(index);
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

        return <ul className="character__grid">{characterList}</ul>;
    }

    const characterList = renderItems(characters);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !loadingNewCharacters ? <Spinner /> : null;

    return (
        <div className="character__list">
            {errorMessage}
            {spinner}
            {characterList}
            <button
                onClick={() => onRequest(offset, false)}
                disabled={loadingNewCharacters}
                style={{ display: charactersEnded ? "none" : "block" }}
                className="button button__main button__long"
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default CharacterList;
