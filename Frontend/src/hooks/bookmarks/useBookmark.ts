import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVisitBookmark, archiveBookmark, unarchiveBookmark, unpinBookmark, pinBookmark } from "../../api/bookmarksApi";

export function useArchiveBookmark() {
	const queryClient = useQueryClient();

	return useMutation<{ message: string }, Error, number>({
		mutationFn: (id: number) => archiveBookmark(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
		},
	});
}

export function useUpdateBookmarkVisit(){
	const queryClient = useQueryClient();

	return useMutation<{ message: string }, Error, number>({
		mutationFn: (id: number) => updateVisitBookmark(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
		},
	});
	
}
export function usePinBookmark(){
	const queryClient = useQueryClient();

	return useMutation<{ message: string }, Error, number>({
		mutationFn: (id: number) => pinBookmark(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
		},
	});
	
}
export function useUnpinBookmark(){
	const queryClient = useQueryClient();

	return useMutation<{ message: string }, Error, number>({
		mutationFn: (id: number) => unpinBookmark(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
		},
	});
	
}
export function useUnarchiveBookmark(){
	const queryClient = useQueryClient();

	return useMutation<{ message: string }, Error, number>({
		mutationFn: (id: number) => unarchiveBookmark(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
		},
	});
	
}
