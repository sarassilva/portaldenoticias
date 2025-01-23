import '../../assets/scss/pages/painel.scss';
import { Link } from "react-router-dom";
import PostsList from "../../components/postList";

const Painel = () => {
    return (
        <div className="painel">
            <div className="container">
                <div className="painel__header">
                    <h1>Lista de posts</h1>
                    <Link className="btn" to="/criar-post">Criar novo post</Link>
                </div> 

                <PostsList isPanel={true} isLoggedIn={true} />               
            </div>
        </div>
    )
}

export default Painel; 