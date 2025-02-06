import { useMutation } from "@tanstack/react-query";

const BASE_URL = "https://fakestoreapi.com";

const apiRequest = async (endpoint, method, data, id) => {
    let url = `${BASE_URL}/${endpoint}`;
    if (id) url += `/${id}`; 
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
            },
            body: data ? JSON.stringify(data) : null, 
        });
        if (!response.ok) {
            throw new Error(`Failed to ${method} to ${endpoint}: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
};

export const usePostApi = (endpoint) => {
    return useMutation({
        mutationFn: (data) => apiRequest(endpoint, "POST", data),
    });
};

export const usePutApi = (endpoint, id) => {
    return useMutation({
        mutationFn: (data) => apiRequest(endpoint, "PUT", data, id),
    });
};

export const useDeleteApi = (endpoint) => {
    return useMutation({
        mutationFn: (id) => apiRequest(endpoint, "DELETE", null, id),
    });
};
