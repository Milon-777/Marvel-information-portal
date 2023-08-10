import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomCharacter from "../randomCharacter/RandomCharacter";
import CharacterList from "../characterList/CharacterList";
import CharacterInfo from "../characterInfo/CharacterInfo";

import decoration from "../../resources/img/vision.png";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

interface State {
    selectedCharacter: null | number;
}

class App extends Component<{}, State> {
    state = {
        selectedCharacter: null,
    };

    onCharacterSelected = (id: number): void => {
        this.setState({ selectedCharacter: id });
    };

    render() {
        return (
            <div className="app">
                <AppHeader />
                <main>
                    <ErrorBoundary>
                        <RandomCharacter />
                    </ErrorBoundary>
                    <div className="character__content">
                        <CharacterList
                            onCharacterSelected={this.onCharacterSelected}
                        />
                        <ErrorBoundary>
                            <CharacterInfo
                                characterId={this.state.selectedCharacter}
                            />
                        </ErrorBoundary>
                    </div>
                    <img
                        className="bg-decoration"
                        src={decoration}
                        alt="vision"
                    />
                </main>
            </div>
        );
    }
}

export default App;
