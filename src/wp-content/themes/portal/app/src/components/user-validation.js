import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = "http://localhost:8080/wp-json";

const AuthButtons = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/wp/v2/users/me`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    },
                });

                if (response.ok) {
                    setIsLoggedIn(true); // Usuário logado
                } else {
                    setIsLoggedIn(false); // Usuário não logado
                }
            } catch (error) {
                console.error("Erro ao verificar login:", error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <div className="simple-buttons">
            {isLoggedIn ? (
                <div className="flex-links">
                    <Link className="simple-link" to="/painel">
                        Painel
                    </Link>
                    <button className="simple-link" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            ) : (
                <Link className="simple-link" to="/login">
                    Entrar
                </Link>
            )}
        </div>
    );
};

export default AuthButtons;
