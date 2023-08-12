import { Link, useNavigate } from "react-router-dom";

import ErrorMessage from "../errorMessage/ErrorMessage";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage />
            <p
                style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "24px",
                }}
            >
                Page doesn't exist
            </p>
            <button
                className="button button_main button_long"
                style={{ margin: "20px auto 0", display: "block" }}
            >
                <Link to="/" className="inner">
                    Back to main page
                </Link>
            </button>
        </div>
    );
};

export default Page404;
