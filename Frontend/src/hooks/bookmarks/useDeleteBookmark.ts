import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteBookmark } from "../../api/bookmarksApi";

export function useDeleteBookmark() {
	const queryClient = useQueryClient();

	return useMutation<{ message: string }, Error, number>({
		mutationFn: (id: number) => deleteBookmark(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
		},
		onError: (error) => {
			console.log(error)
		}
	});
}
