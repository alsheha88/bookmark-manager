import { useEffect, useState, createContext, useContext } from "react";

type ToastContext = {
    mode:string | null;
    setMode: (value:string | null) => void;
    isToastOpen: boolean;
    setIsToastOpen: (value:boolean) => void;
}


const ToastContext = createContext<ToastContext | null>(null);

export function ToastProvider({ children }: {children: React.ReactNode}) {
	const [mode, setMode] = useState<string | null>(null);
	const [isToastOpen, setIsToastOpen] = useState(false);

	useEffect(() => {
		if (!isToastOpen) return;
		const intervalId = setTimeout(() => setIsToastOpen(false), 2500);

		return () => clearTimeout(intervalId);
	}, [isToastOpen]);

	return <ToastContext.Provider value={{mode, setMode, isToastOpen, setIsToastOpen}}>{children}</ToastContext.Provider>;
}

export function useToastContext(){
    const context = useContext(ToastContext);
    if (!context) throw new Error("useToastContext shall be used within Toast Provider");

    return context;
}
