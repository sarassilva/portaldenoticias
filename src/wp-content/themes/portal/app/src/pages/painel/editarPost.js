import { useParams } from "react-router-dom";
import EditPostForm from "../../components/forms/PostForm/EditForm";

const PageEditPost = () => {
    const { slug } = useParams();

    return (
        <div className="painel post-form">
            <div className="container">
                <h1>Editar </h1>
                <EditPostForm slug={slug} />
            </div>
        </div>
    );
};

export default PageEditPost;