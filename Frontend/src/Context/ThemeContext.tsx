import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";


interface ThemeContextType {
	theme: "light" | "dark";
	toggleTheme: () => void;
}


const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({children}:{children: React.ReactNode}) {
	const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "dark");

	useEffect(() => {
		theme === "dark"
			? document.documentElement.classList.add("dark")
			: document.documentElement.classList.remove("dark");
	}, [theme]);
    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"))

    }

    return <ThemeContext.Provider value={{theme, toggleTheme}} >{children}</ThemeContext.Provider>
}

export function useTheme() {
	const context = useContext(ThemeContext);
	if (!context) throw new Error("useTheme must be used inside ThemeProvider");

	return context;
}
