import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editBookmark } from "../../api/bookmarksApi";

export function useEditBookmark() {
	const queryClient = useQueryClient();

	return useMutation<
		{ message: string },
		Error,
		{ id: number; bookmark: object }
	>({
		mutationFn: ({ id, bookmark }) => editBookmark(id, bookmark),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
		},
	});
}
