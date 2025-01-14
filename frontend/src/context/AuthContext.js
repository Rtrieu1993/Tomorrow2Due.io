import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decoded = jwtDecode(token);
                setUser(decoded);
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem("token");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { email, password });
            const { token } = response.data;
            localStorage.setItem("token", token);
            const decoded = jwtDecode(token);
            setUser(decoded);
            navigate("/dashboard");
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
