

const API_BASE = "http://localhost:8080/wp-json/wp/v2";

export const createPost = async (postData) => {
    const response = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(postData),
    });

    if(response.ok) {
        return response.json();
        
    } else {
        throw new Error("Erro ao publicar post");
    }
};

export const uploadFeaturedImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('file', imageFile); 

    const response = await fetch(`${API_BASE}/media`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formData, 
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao fazer upload da imagem: ${errorData.message}`);
    }

    const data = await response.json();
    return data.id;  
};

export const fetchPosts = async (id) => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });

    if (response.ok) {
        const data = await response.json(); // Leia a resposta JSON uma vez
        console.log(data.title); // Aqui você pode acessar o título corretamente
        return data; // Retorne os dados já processados
    } else {
        throw new Error("Erro ao buscar posts");
    }
};


export const updatePost = async (id, postData) => {
    const response = await fetch(`${API_BASE}/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(postData),
    });
    if(response.ok) {
        return response.json();
    } else {
        throw new Error("Erro ao atualizar post");
    }
};

