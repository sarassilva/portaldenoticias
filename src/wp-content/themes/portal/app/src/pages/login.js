import LoginForm from "../components/forms/LoginForm";
import login from "../assets/scss/pages/login.scss";

const Login = () => {
    return (
        <div className="login">
            <div className="login__container">
                <h1>Login</h1>
                <LoginForm></LoginForm>
            </div>
        </div>
    )
};

export default Login;