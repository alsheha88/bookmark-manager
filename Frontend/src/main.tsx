import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./Context/AuthContext.tsx";
import { ThemeProvider } from "./Context/ThemeContext.tsx";
import { UIProvider } from "./Context/ToggleContext.tsx";
import { QueryClient, QueryClientProvider, QueryCache, MutationCache } from '@tanstack/react-query'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (error.message === '401') {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (error.message === '401') {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
  }),
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<ThemeProvider>
			<QueryClientProvider client={queryClient}>
				<UIProvider>
					<AuthProvider>
						<App />
					</AuthProvider>
				</UIProvider>
			</QueryClientProvider>
		</ThemeProvider>
	</StrictMode>,
);
