export async function getBookmarks(
	token: string,
	tag?: string,
	sort?: string,
	title?: string,
) {
	const urlParams = new URLSearchParams();

	if (tag) urlParams.append("tag", tag);
	if (sort) urlParams.append("sort", sort);
	if (title) urlParams.append("search", title);

	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/bookmarks?${urlParams.toString()}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}
export async function getArchivedBookmarks(
	token: string,
	tag?: string,
	sort?: string,
	title?: string,
) {
	const urlParams = new URLSearchParams();
	urlParams.append("archived", "true");

	if (tag) urlParams.append("tag", tag);
	if (sort) urlParams.append("sort", sort);
	if (title) urlParams.append("search", title);

	const res = await fetch(
		`${import.meta.env.VITE_API_URL}/bookmarks?${urlParams.toString()}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		},
	);

	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}

export async function archiveBookmark(id: number) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/bookmarks/${id}/archive`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
		},
	});
	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}
export async function updateVisitBookmark(id: number) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/bookmarks/${id}/visit`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
		},
	});

	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}
export async function pinBookmark(id: number) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/bookmarks/${id}/pinned`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
		},
	});

	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}
export async function unpinBookmark(id: number) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/bookmarks/${id}/unpin`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
		},
	});

	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}
export async function unarchiveBookmark(id: number) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/bookmarks/${id}/unarchive`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
		},
	});

	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}
export async function editBookmark(id: number, bookmark: object) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/bookmarks/${id}`, {
		method: "PUT",
		body: JSON.stringify(bookmark),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
		},
	});

	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}
export async function addBookmark(bookmark: object) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/bookmarks`, {
		method: "POST",
		body: JSON.stringify(bookmark),
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
		},
	});

	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}

export async function deleteBookmark(id: number) {
	const res = await fetch(`${import.meta.env.VITE_API_URL}/bookmarks/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
		},
	});

	if (res.status === 401) throw new Error("401");
	if (!res.ok) throw new Error("Failed to fetch data");

	return res.json();
}
