import type { SignUpData } from "../schemas/registerSchema";
import type { LoginData } from "../schemas/loginSchema";

export async function signUpUser(credentials: SignUpData) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/register`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	});

	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Email already exists");

	return res.json();
}

export async function loginUser(credentials: LoginData) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(credentials),
	});

	if (res.status === 404) throw new Error("Invalid email or password");
	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to login");

	return res.json();
}
