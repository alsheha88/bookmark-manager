import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import HomePage from "./pages/HomePage";
import ArchivePage from "./pages/ArchivePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import { ProtectedRoute } from "./routes/ProtectedRoute";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route
					element={
						<ProtectedRoute>
							<MainLayout />
						</ProtectedRoute>
					}>
					<Route path="/" element={<HomePage />} />
					<Route path="/archive" element={<ArchivePage />} />
				</Route>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/forgot" element={<ForgotPasswordPage />} />
				<Route path="/reset" element={<ResetPasswordPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
