import { Component, ErrorInfo, ReactNode } from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";

interface Props {
    children: ReactNode;
}

class ErrorBoundary extends Component<Props, {}> {
    state = {
        error: false,
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error(`Error: ${error}\nError info: ${errorInfo}`);
        this.setState({
            error: true,
        });
    }

    render() {
        if (this.state.error) {
            return <ErrorMessage />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
