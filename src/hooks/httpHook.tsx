import { useState, useCallback } from "react";

interface HttpRequest {
    url: string;
    method: "GET";
    body: {} | null;
    headers: { "Content-Type": "application/json" };
}

const useHttp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const request = useCallback(async (requestParams: string) => {
        setLoading(true);

        try {
            const response = await fetch(requestParams);

            // const response = await fetch(requestParams.url, {
            //     method: requestParams.method,
            //     body: JSON.stringify(requestParams.body),
            //     headers: requestParams.headers,
            // });

            if (!response.ok) {
                throw new Error(
                    `Could not fetch ${requestParams}, status: ${response.status}`
                );
            }

            const data = await response.json();
            setLoading(false);
            return data;
        } catch (error) {
            setLoading(false);
            setError(error);
            throw error;
        }
    }, []);

    const clearError = useCallback(() => setError(null), []);

    return { loading, request, error, clearError };
};
export default useHttp;
