import { useParams } from "react-router-dom";
import React, {
    useState,
    useEffect,
    Component,
    LazyExoticComponent,
    FC,
} from "react";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import AppBanner from "../appBanner/AppBanner";
import { CharacterInfo, ComicInfo } from "../../services/ResponseInterfaces";

interface Props {
    // Component: React.ReactNode;
    Comp: LazyExoticComponent<FC<any>>;
    dataType: string;
}

type ComicOrCharacter = ComicInfo | CharacterInfo;

const SinglePage: React.FC<Props> = (props) => {
    const { id } = useParams();
    const [data, setData] = useState<ComicOrCharacter>();
    const { loading, error, getComicById, getCharacterById, clearError } =
        useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();
        console.log(id);

        if (id !== undefined) {
            const ID = Number(id);
            switch (props.dataType) {
                case "comic":
                    getComicById(ID).then(onDataLoaded);
                    break;
                case "character":
                    getCharacterById(ID).then(onDataLoaded);
            }
        }
    };

    const onDataLoaded = (data: ComicOrCharacter) => {
        setData(data);
    };

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error || !data) ? (
        <props.Comp data={data} />
    ) : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

export default SinglePage;
