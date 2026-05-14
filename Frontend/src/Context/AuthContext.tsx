import { createContext, useContext, useState } from "react";

// const BASE_URL = "http://localhost:3000/auth";



type AuthContextType = {
	token: string | null;
	saveToken: (token: string) => void;
	logout: () => void;
	isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [token, setToken] = useState<string | null>(
		localStorage.getItem("token"),
	);
	// const [user, setUser] = useState<User | null>(null);

	const saveToken = (token: string) => {
		localStorage.setItem("token", token);
		setToken(token);
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
	};

	const isAuthenticated = !!token;

	return (
		<AuthContext.Provider
			value={{ token, saveToken, logout, isAuthenticated }}>
			{children}
		</AuthContext.Provider>
	);
};

export function useAuth() {
	const context = useContext(AuthContext);
	if (!context) throw new Error("useAuth must be used inside AuthProvider");

	return context;
}
