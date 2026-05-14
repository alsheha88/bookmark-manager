

export async function getUser() {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
            
		},
	});

	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}