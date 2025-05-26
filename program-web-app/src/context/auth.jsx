import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../actions/user";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAuthenticated && location.pathname === "") {
            navigate("/login", { replace: true });
        }
    }, [navigate]);

    const login = async (credentials) => {
        try {
            const response = await loginUser(credentials);
            if (response.data)
            {
                setIsAuthenticated(true);
                setUser(credentials.username);
                navigate("/products");
            }
        } catch (error) {
            setIsAuthenticated(false);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        navigate("/login", { replace: true });
    };

    const value = {
        isAuthenticated,
        user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;