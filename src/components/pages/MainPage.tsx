import { useState } from "react";

import RandomCharacter from "../randomCharacter/RandomCharacter";
import CharacterList from "../characterList/CharacterList";
import CharacterInfo from "../characterInfo/CharacterInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";
import CharacterSearchForm from "../characterSearchForm/CharacterSearchForm";

const MainPage = () => {
    const [selectedCharacter, selectCharacter] = useState<number | null>(null);

    const onCharacterSelected = (id: number): void => {
        selectCharacter(id);
    };

    return (
        <>
            <ErrorBoundary>
                <RandomCharacter />
            </ErrorBoundary>
            <div className="character__content">
                <ErrorBoundary>
                    <CharacterList onCharacterSelected={onCharacterSelected} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharacterInfo characterId={selectedCharacter} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharacterSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <img className="bg-decoration" src={decoration} alt="vision" />
        </>
    );
};

export default MainPage;
