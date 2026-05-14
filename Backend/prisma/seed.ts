import data from "./data.json" with { type: "json" };
import { prisma } from "./lib/prisma.js";

export async function defaultSeedData(id: number) {
	function getFavicon(url:string) {
		const domain = new URL(url).hostname;
		const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

    return favicon
	}

	for (const item of data.bookmarks) {
		const upsertedTags = await Promise.all(
			item.tags.map(async (tag: string) => {
				return await prisma.tag.upsert({
					where: { tag },
					update: {},
					create: { tag },
				});
			}),
		);

		await prisma.bookmark.create({
			data: {
				user_id: id,
				title: item.title,
				url: item.url,
				favicon: getFavicon(item.url),
				description: item.description,
				pinned: item.pinned,
				isArchived: item.isArchived,
				visitCount: item.visitCount,
				createdAt: new Date(item.createdAt),
				lastVisited: item.lastVisited ? new Date(item.lastVisited) : null,
				bookmarkTags: {
					create: upsertedTags.map((tag) => ({ tag_id: tag.id })),
				},
			},
		});
	}
}
