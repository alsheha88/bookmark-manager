import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface UIContextType {
    active: string | null;
    open: (name: string) => void;
    close: () => void;
}

const UIContext = createContext<UIContextType | null>(null);

export function UIProvider({ children }: { children: ReactNode }) {
    const [active, setActive] = useState<string | null>(null);

    const open = (name: string) => setActive(name);
    const close = () => setActive(null);

    return (
        <UIContext.Provider value={{ active, open, close }}>
            {children}
        </UIContext.Provider>
    );
}

export function useUI() {
    const context = useContext(UIContext);
    if (!context) throw new Error('useUI must be used within a UIProvider');
    return context;
}