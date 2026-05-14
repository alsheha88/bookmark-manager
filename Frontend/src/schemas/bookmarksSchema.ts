import { z } from 'zod';

export const bookmarkSchema = z.object({
    title: z.string().min(1, "Title shouldn't be empty"),
    description: z.string().max(280, "You have reached maximum of 280 characters").min(1, "Description shouldn't be empty"),
    websiteURL: z.url("Please enter a valid URL"),
    tags: z.string().min(1, "Tags shouldn't be empty"),
})

export type BookmarkData = z.infer<typeof bookmarkSchema>


export type Bookmark = {
    id: number;
    title: string;
    url: string;
    favicon: string;
    description: string;
    pinned: boolean;
    isArchived: boolean;
    visitCount: number;
    createdAt: string;
    updatedAt: string;
    lastVisited: string;
    tags: string[]
}