import { useState } from "react";
import { Link } from "react-router-dom";
import {
    Formik,
    Form,
    Field,
    ErrorMessage as FormikErrorMessage,
} from "formik";
import * as Yup from "yup";

import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import { CharacterInfo } from "../../services/ResponseInterfaces";

import "./characterSearchForm.scss";

const CharacterSearchForm = () => {
    const [character, setCharacter] = useState<CharacterInfo>({
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
    const { loading, error, getCharacterByName, clearError } =
        useMarvelService();

    const onCharacterLoaded = (character: CharacterInfo) => {
        console.log(character);
        setCharacter(character);
    };

    const updateCharacter = (name: string) => {
        clearError();

        getCharacterByName(name).then(onCharacterLoaded);
    };

    const errorMessage = error ? (
        <div className="character__search-critical-error">
            <ErrorMessage />
        </div>
    ) : null;
    const results = !character ? null : character.name.length > 0 ? (
        <div className="character__search-wrapper">
            <div className="character__search-success">
                There is! Visit {character.name} page?
            </div>
            <Link
                to={`/characters/${character.id}`}
                className="button button__secondary"
            >
                <div className="inner">To page</div>
            </Link>
        </div>
    ) : (
        <div className="character__search-error">
            The character was not found. Check the name and try again
        </div>
    );

    return (
        <div className="character__search-form">
            <Formik
                initialValues={{
                    characterName: "",
                }}
                validationSchema={Yup.object({
                    characterName: Yup.string().required(
                        "This field is required"
                    ),
                })}
                onSubmit={({ characterName }) => {
                    updateCharacter(characterName);
                }}
            >
                <Form>
                    <label
                        className="character__search-label"
                        htmlFor="characterName"
                    >
                        Or find a character by name:
                    </label>
                    <div className="character__search-wrapper">
                        <Field
                            id="characterName"
                            name="characterName"
                            type="text"
                            placeholder="Enter name"
                        />
                        <button
                            type="submit"
                            className="button button__main"
                            disabled={loading}
                        >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage
                        component="div"
                        className="character__search-error"
                        name="characterName"
                    />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    );
};

export default CharacterSearchForm;
