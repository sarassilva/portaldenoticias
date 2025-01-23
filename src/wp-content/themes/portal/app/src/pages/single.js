import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import single from "../assets/scss/pages/single.scss";

const API_BASE_URL = "http://localhost:8080/wp-json/wp/v2";

const SinglePost = () => {
    const { slug } = useParams(); 
    const [post, setPost] = useState(null); 
    const [featuredImage, setFeaturedImage] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/posts?slug=${slug}`);
                const postsData = await response.json();

                if (postsData.length > 0) {
                    const post = postsData[0]; 
                    setPost(post);

                    if (post.featured_media) {
                        const mediaResponse = await fetch(`${API_BASE_URL}/media/${post.featured_media}`);
                        if (mediaResponse.ok) {
                            const mediaData = await mediaResponse.json();
                            setFeaturedImage(mediaData.source_url);
                        }
                    }
                }
            } catch (error) {
                console.error("Erro ao buscar o post:", error);
            } finally {
                setLoading(false); 
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    if (!post) {
        return <p>Post não encontrado.</p>;
    }

    return (
        <div className="single-post">
            <div className="container">
                <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                {featuredImage && <img src={featuredImage} className="image-post" alt={post.title.rendered} />}
                <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
            </div>
        </div>
    );
};

export default SinglePost;
