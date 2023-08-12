import { useState } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomCharacter from "../randomCharacter/RandomCharacter";
import CharacterList from "../characterList/CharacterList";
import CharacterInfo from "../characterInfo/CharacterInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from "../../resources/img/vision.png";
import ComicsList from "../comicList/ComicList";

interface State {
    selectedCharacter: null | number;
}

const App = () => {
    const [selectedCharacter, selectCharacter] = useState<number | null>(null);

    const onCharacterSelected = (id: number): void => {
        selectCharacter(id);
    };

    return (
        <div className="app">
            <AppHeader />
            <main>
                {/* <ErrorBoundary>
                    <RandomCharacter />
                </ErrorBoundary>
                <div className="character__content">
                    <CharacterList onCharacterSelected={onCharacterSelected} />
                    <ErrorBoundary>
                        <CharacterInfo characterId={selectedCharacter} />
                    </ErrorBoundary>
                </div>
                <img className="bg-decoration" src={decoration} alt="vision" /> */}
                <ComicsList />
            </main>
        </div>
    );
};

export default App;
