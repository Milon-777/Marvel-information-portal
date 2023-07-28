import "./comicList.scss";
import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";

const ComicsList = () => {
    return (
        <div className="comic__list">
            <ul className="comic__grid">
                <li className="comic__item">
                    <a href="#">
                        <img
                            src={uw}
                            alt="ultimate war"
                            className="comic__item-img"
                        />
                        <div className="comic__item-name">
                            ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
                        </div>
                        <div className="comic__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comic__item">
                    <a href="#">
                        <img
                            src={xMen}
                            alt="x-men"
                            className="comic__item-img"
                        />
                        <div className="comic__item-name">
                            X-Men: Days of Future Past
                        </div>
                        <div className="comic__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comic__item">
                    <a href="#">
                        <img
                            src={uw}
                            alt="ultimate war"
                            className="comic__item-img"
                        />
                        <div className="comic__item-name">
                            ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
                        </div>
                        <div className="comic__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comic__item">
                    <a href="#">
                        <img
                            src={xMen}
                            alt="x-men"
                            className="comic__item-img"
                        />
                        <div className="comic__item-name">
                            X-Men: Days of Future Past
                        </div>
                        <div className="comic__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comic__item">
                    <a href="#">
                        <img
                            src={uw}
                            alt="ultimate war"
                            className="comic__item-img"
                        />
                        <div className="comic__item-name">
                            ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
                        </div>
                        <div className="comic__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comic__item">
                    <a href="#">
                        <img
                            src={xMen}
                            alt="x-men"
                            className="comic__item-img"
                        />
                        <div className="comic__item-name">
                            X-Men: Days of Future Past
                        </div>
                        <div className="comic__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comic__item">
                    <a href="#">
                        <img
                            src={uw}
                            alt="ultimate war"
                            className="comic__item-img"
                        />
                        <div className="comic__item-name">
                            ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB
                        </div>
                        <div className="comic__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comic__item">
                    <a href="#">
                        <img
                            src={xMen}
                            alt="x-men"
                            className="comic__item-img"
                        />
                        <div className="comic__item-name">
                            X-Men: Days of Future Past
                        </div>
                        <div className="comic__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
            </ul>
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default ComicsList;
