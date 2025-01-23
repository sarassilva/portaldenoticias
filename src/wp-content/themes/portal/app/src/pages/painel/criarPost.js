import CreatePostForm from "../../components/forms/PostForm/CreateForm";
import '../../assets/scss/pages/painel.scss';

const PageCreatePost = () => {
    return (
        <div className="painel post-form">
            <div className="container">
                <h1>Criar novo post</h1>
                <CreatePostForm />
                </div>
        </div>
    )
};

export default PageCreatePost; 