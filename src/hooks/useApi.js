import { useQuery } from "@tanstack/react-query";

const BASE_URL = "https://fakestoreapi.com";

const fetchData = async (endpoint, id) => {
    let url = `${BASE_URL}`;
    if (endpoint) url += `/${endpoint}`
    if (id) url += `/${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${endpoint}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
}

export const useApi = (endpoint , id = null) => {
    return useQuery({
        queryKey: id ? [endpoint, id] : [endpoint],
        queryFn: () => fetchData(endpoint, id)
    });
}
