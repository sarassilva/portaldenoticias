import React, { useState, useEffect } from "react";
import API_BASE_URL from "../helpers/config";
import '../assets/scss/pages/home.scss';
import PostsList from "../components/postList";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}posts`)
                if(!response.ok) {
                    throw new Error("Não foi possivel encontrar posts");                    
                }

                const data = await response.json();
                setPosts(data);                            
            } catch(err) {
                console.log('erro');
            }
            
        };

        fetchPosts();
    }, []);


    return (
        <div className="home">
            <div class="container">
                <PostsList />
            </div>
        </div>
    )
};

export default Home;