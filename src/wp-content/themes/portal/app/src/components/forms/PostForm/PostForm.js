import { useState } from "react";
import { createPost, uploadFeaturedImage } from "../../../helpers/posts";
import { useNavigate } from 'react-router-dom';

const CreatePostForm = ({ initialData = {} }) => {
    const [title, setTitle] = useState(initialData.title || "");
    const [content, setContent] = useState(initialData.content || "");
    const [featuredImage, setFeaturedImage] = useState(initialData.featuredImage || "");
    const [status, setStatus] = useState(initialData.status || "draft");

    const navigate = useNavigate();

    const handleCreatePost = async (e) => {
        e.preventDefault();

        try {
            const featuredImageId = featuredImage
                ? await uploadFeaturedImage(featuredImage)
                : null;

            const postData = {
                title: title,
                content: content,
                status: status,
                featured_media: featuredImageId,
            };

            const response = await createPost(postData);
            navigate('/editar-post/' + response.id);
        } catch (error) {
            console.error("Erro ao criar post:", error);
        }
    };

    return (
        <form onSubmit={handleCreatePost}>
            <div>
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="content">Conteúdo:</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </div>

            <div>
                <label htmlFor="featuredImage">Imagem Destacada:</label>
                <input
                    type="file"
                    id="featuredImage"
                    onChange={(e) => setFeaturedImage(e.target.files[0])}
                />
            </div>

            <div>
                <label htmlFor="status">Status:</label>
                <select
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="publish">Publicado</option>
                </select>
            </div>

            <button type="submit">Criar Post</button>
        </form>
    );
};

export default CreatePostForm;
