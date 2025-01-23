import { useParams } from "react-router-dom";
import EditPostForm from "../../components/forms/PostForm/EditForm";

const PageEditPost = () => {
    const { id } = useParams();

    return (
        <div className="painel post-form">
            <div className="container">
                <h1>Criar novo post</h1>
                <EditPostForm id={id} />
            </div>
        </div>
    );
};

export default PageEditPost;