import { useEffect, useState } from "react";
import '../assets/scss/components/post-list.scss';
import { Link, useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080/wp-json/wp/v2";

const PostsList = ({ isPanel = false, isLoggedIn = false }) => {
    const [posts, setPosts] = useState([]);
    const [mediaUrls, setMediaUrls] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/posts`);
                const postsData = await response.json();
                setPosts(postsData);

                const mediaPromises = postsData.map(async (post) => {
                    if (post.featured_media) {
                        const mediaResponse = await fetch(`${API_BASE_URL}/media/${post.featured_media}`);
                        if (mediaResponse.ok) {
                            const mediaData = await mediaResponse.json();
                            return { id: post.id, url: mediaData.source_url };
                        }
                    }
                    return { id: post.id, url: null }; 
                });

                const mediaData = await Promise.all(mediaPromises);

                const urls = mediaData.reduce((acc, item) => {
                    acc[item.id] = item.url;
                    return acc;
                }, {});
                setMediaUrls(urls);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPosts();
    }, []);

    const deletePost = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/posts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            });

            if (response.ok) {
                alert("Post deletado com sucesso!");
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)); 
                navigate("/painel");
            } else {
                alert("Erro ao deletar post.");
            }
        } catch (error) {
            console.error("Erro ao deletar post:", error);
        }
    };

    return (
        <div className={`posts-list ${isPanel ? "painel-list" : "home-list"}`}>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <Link to={`/post/${post.slug}`}>
                            <img class="image-post" src={mediaUrls[post.id]} alt={post.title.rendered} />                            
                            <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />                                
                        </Link>

                        {isPanel && isLoggedIn && (
                            <div className="post-actions">
                                <button className="btn edit-btn" onClick={() => navigate(`/editar/${post.slug}`)}>Editar</button>
                                <button className="btn delete-btn" onClick={() => deletePost(post.id)}>Deletar</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsList;