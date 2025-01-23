import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Saúde</Link>
                </li>
                <li>
                    <Link to="/">Energia</Link>
                </li>
                <li>
                    <Link to="/">Trabalhista</Link>
                </li>  
                <li>
                    <Link to="/">Poder</Link>
                </li>
                <li>
                    <Link to="/">Esporte</Link>
                </li> 
                <li>
                    <Link to="/">Serviços</Link>
                </li>                   
            </ul>
        </nav>
    )
};

export default Navbar