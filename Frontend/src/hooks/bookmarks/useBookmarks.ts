import { useQuery } from "@tanstack/react-query";
import { getArchivedBookmarks, getBookmarks } from "../../api/bookmarksApi";
import { useAuth } from "../../Context/AuthContext";
import type { Bookmark } from "../../schemas/bookmarksSchema";


export function useBookmarks(tag?: string, sort?: string, title?: string){
    const {token} = useAuth()

    return useQuery<Bookmark[]>({
        queryKey: ["bookmarks", tag, sort, title],
        queryFn: () => getBookmarks(token!, tag, sort, title) 
    })
}
export function useArchBookmarks(tag?: string, sort?: string, title?: string){
    const {token} = useAuth()

    return useQuery<Bookmark[]>({
        queryKey: ["bookmarks", "archived", tag, sort, title],
        queryFn: () => getArchivedBookmarks(token!, tag, sort, title) 
    })
}

