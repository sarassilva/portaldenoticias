const API_BASE = "http://localhost:8080/wp-json";

export const fetchWithAuth = async (endpoint, options = {}) => {
    const token = localStorage.getItem("token");

    const headers = {
        ...options.headers,
        "Authorization": `Bearer ${token}`,
    }        

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        ...helpers,
    });

    return response.json();
}