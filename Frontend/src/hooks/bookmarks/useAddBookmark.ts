import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookmark } from "../../api/bookmarksApi";

export function useAddBookmark() {
	const queryClient = useQueryClient();

	return useMutation<
		{ message: string },
		Error,
		{ bookmark: object }
	>({
		mutationFn: ({ bookmark }) => addBookmark(bookmark),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
		},
	});
}