import express from "express";
import { prisma } from "../../prisma/lib/prisma.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const {sort, search, tag} = req.query;
    let orderBy: object = { createdAt: 'desc' };

    if (sort === "recentlyAdded") orderBy = {createdAt: "desc"}
    if (sort === "recentlyVisited") orderBy =  {lastVisited: "desc"}
    if (sort === "mostVisited") orderBy = {visitCount: "desc"}

	try {
		if (!req.id) return res.status(401).json({ message: "Unauthorized" });

		const isArchived = req.query.archived === "true";
		const bookmarks = await prisma.bookmark.findMany({
			where: {
				user_id: req.id,
				isArchived: isArchived,
                ...(search ? {title: {
                    contains: search as string,
                    mode: "insensitive"
                }} : {}),
				...(tag ? {bookmarkTags: {
					some: {
						tag: {tag: tag as string},
					}
				}} : {})

			},
			include: {
				bookmarkTags: {
					include: { tag: true },

				},
			},
            orderBy: orderBy,
		});

		const formatted = bookmarks.map(bookmark => ({
			...bookmark,
			tags: bookmark.bookmarkTags.map((bt: any) => bt.tag.tag),
			bookmarkTags: undefined

		}))
		res.json(formatted);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to fetch bookmarks" });
	}
});

router.post("/", async (req, res) => {
	const { title, description, url, tags, favicon } = req.body;

	try {
		const getOrCreateTag = await Promise.all(
			tags.map(async (tag: string) => {
				return await prisma.tag.upsert({
					where: {
						tag: tag,
					},
					update: {},
					create: {
						tag: tag,
					},
				});
			}),
		);

		const newBookmark = await prisma.bookmark.create({
			include: {
				bookmarkTags: {
					include: {
						tag: true,
					},
				},
			},
			data: {
				user_id: req.id!,
				title: title,
				description: description,
				url: url,
				favicon: favicon,
				bookmarkTags: {
					create: getOrCreateTag.map((tag) => {
						return {
							tag_id: tag.id,
						};
					}),
				},
			},
		});
		res.status(201).json(newBookmark);
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Error: Couldn`t add bookmark" });
	}
});
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const { title, url, description, tags, favicon } = req.body;
	try {
		if (!req.id) return res.status(401).json({ message: "Unauthorized" });

		// Step 1 Delete all tags

		await prisma.bookmarkTag.deleteMany({
			where: {
				bookmark_id: parseInt(id),
			},
		});
		// Step 2 re-create tags
		const updateTags = await Promise.all(
			tags.map(async (tag: string) => {
				return await prisma.tag.upsert({
					where: {
						tag: tag,
					},
					update: {},
					create: {
						tag: tag,
					},
				});
			}),
		);

		const updatedBookmark = await prisma.bookmark.update({
			include: {
				bookmarkTags: {
					include: {
						tag: true,
					},
				},
			},
			where: {
				id: parseInt(id),
				user_id: req.id,
			},
			data: {
				title: title,
				url: url,
				description: description,
				favicon: favicon,
				bookmarkTags: {
					// step 3 reference junction table
					create: updateTags.map((tag) => {
						return {
							tag_id: tag.id,
						};
					}),
				},
			},
		});
		res.json(updatedBookmark);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to update bookmark" });
	}
});


router.put("/:id/archive", async (req, res) => {
	const { id } = req.params;
	console.log(req.id);
	if (!req.id) return res.status(401).json({ message: "Unauthorized" });

	try {
		await prisma.bookmark.update({
			where: {
				id: parseInt(id),
			},
			data: {
				isArchived: true,
				pinned: false,
			},
		});
		res.status(200).json({ message: "Bookmark Archived!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to archive bookmark" });
	}
});
router.put("/:id/visit", async (req, res) => {
	const { id } = req.params;
	console.log(req.id);
	if (!req.id) return res.status(401).json({ message: "Unauthorized" });

	try {
		await prisma.bookmark.update({
			where: {
				id: parseInt(id),
			},
			data: {
				visitCount: {increment: 1},
				lastVisited: new Date(),
			},
		});
		res.status(200).json({ message: "Bookmark visited!" })
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to update bookmark" });
	}
});
router.put("/:id/unarchive", async (req, res) => {
	const { id } = req.params;

	if (!req.id) return res.status(401).json({ message: "Unauthorized" });

	try {
		await prisma.bookmark.update({
			where: {
				id: parseInt(id),
			},
			data: {
				isArchived: false,
			},
		});
		res.status(200).json({ message: "Bookmark unarchived!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to unarchive bookmark" });
	}
});
router.put("/:id/pinned", async (req, res) => {
	const { id } = req.params;

	if (!req.id) return res.status(401).json({ message: "Unauthorized" });

	try {
		await prisma.bookmark.update({
			where: {
				id: parseInt(id),
			},
			data: {
				pinned: true,
			},
		});
		res.status(200).json({ message: "Bookmark Pinned!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to pin bookmark" });
	}
});
router.put("/:id/unpin", async (req, res) => {
	const { id } = req.params;

	if (!req.id) return res.status(401).json({ message: "Unauthorized" });

	try {
		await prisma.bookmark.update({
			where: {
				id: parseInt(id),
			},
			data: {
				pinned: false,
			},
		});
		res.status(200).json({ message: "Bookmark Unpinned!" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to unpin bookmark" });
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;

	try {
		if (!req.id) return res.status(401).json({ message: "Unauthorized" });

		await prisma.bookmarkTag.deleteMany({
			where: {
				bookmark_id: parseInt(id),
			},
		});

		await prisma.bookmark.delete({
			where: {
				id: parseInt(id),
			},
		});
		res.status(200).json({ message: "Bookmark Deleted" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to delete bookmark" });
	}
});

export default router;
