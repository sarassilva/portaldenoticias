import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError("");
        setSuccess("");

        try {
            const response = await fetch('http://localhost:8080/wp-json/jwt-auth/v1/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();

            if(data.token) {
                setSuccess("Login realizado com sucesso");
                localStorage.setItem('token', data.token);
                navigate('/painel');
            } else {
                setError(data.message || "Erro ao fazer login")
            }
        } catch(err) {
            setError("Erro de conexão");
        }
    };
    
    return (
        <div className='login-form'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuário</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>Senha</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Acessar</button>
            </form>
            <ul className='links'>
                <li>Não tem conta? <Link rel="nofollow" to="/cadastrar">Cadastre-se</Link> </li>
                <li><Link rel="nofollow" to="/resetar-senha">Esqueci minha senha</Link></li>
             </ul>

            {error && <div>{error}</div>}
            {success && <div>{success}</div>}
        </div>

    );
};

export default LoginForm;