import BookmarkCard from "../Components/BookmarkCard";
import { useArchBookmarks } from "../hooks/bookmarks/useBookmarks";
import SortOptions from "../Components/Dropdpwns/SortOptions";
import {
	useUnarchiveBookmark,
	useUpdateBookmarkVisit,
} from "../hooks/bookmarks/useBookmark";
import { useFilterContext } from "../Context/FilterContext";
import { useUI } from "../Context/ToggleContext";
import { BeatLoader } from "react-spinners";
import { useTheme } from "../Context/ThemeContext";
import { useDeleteBookmark } from "../hooks/bookmarks/useDeleteBookmark";

const ArchivePage = () => {
	const { selectedTag, sort, search } = useFilterContext();
	const { active, close, open } = useUI();
	const {theme} = useTheme()
	const { data, isPending, isError, isFetching } = useArchBookmarks(
		selectedTag ?? undefined,
		sort ?? undefined,
		search ?? undefined,
	);

	const { mutate: unarchiveBookmark } = useUnarchiveBookmark();
	const { mutate: updateVisitBookmark } = useUpdateBookmarkVisit();
	const {mutate:deleteBookmark} = useDeleteBookmark()

	function visit(id: number) {
		close();
		updateVisitBookmark(id);
	}

	const copy = async function copyUrl(url: string) {
		try {
			await navigator.clipboard.writeText(url);
			close();
		} catch (err) {
			if (err instanceof Error) {
				console.log(err.message);
			}
		}
	};

	function unarchive(id: number) {
		close();
		unarchiveBookmark(id);
	}

	function bookmarkDelete(id: number) {
		close();
		deleteBookmark(id);
	}
	function fetchFavicon(url: string) {
		const domain = new URL(url).hostname;
		const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

		return favicon
	}

	const archivedBookmarks = data?.filter((bookmark) => bookmark.isArchived);

	return (
		<div className="min-h-dvh flex flex-col gap-5 px-4 pt-6 pb-16 md:pt-8 md:px-8 bg-neutral-light-100 dark:bg-neutral-dark-900">
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-xl md:text-2xl font-bold text-neutral-light-900 dark:text-neutral-dark-0">
					Archived bookmarks
				</h2>
				<div className="relative">
					<button
						type="button"
						onClick={() => open("sort-dropdown")}
						className="px-3 py-2.5 flex items-center gap-1 text-neutral-light-900 dark:text-neutral-dark-0 font-semibold rounded-md border border-neutral-light-400 dark:border-neutral-dark-400 cursor-pointer">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							fill="none"
							viewBox="0 0 20 20">
							<path
								d="M14.167 3.333v13.334m0 0-3.334-3.334m3.334 3.334 3.333-3.334M5.833 16.667V3.333m0 0L2.5 6.667m3.333-3.334 3.334 3.334"
								className="stroke-neutral-light-900 dark:stroke-neutral-light-0"
							/>
						</svg>
						Sort by
					</button>
					<SortOptions
						isOpen={active === "sort-dropdown"}
						setSort={() => close()}
					/>
				</div>
			</div>
			<div className="grid gap-8 pb-8" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
				{isPending || isFetching ? (
					<div className="col-span-full flex justify-center items-center py-20">
						<BeatLoader
							color={theme === "dark" ? "#00706e" : "#899492"}
							size={15}
						/>
					</div>
				) : isError ? (
					<div className="col-span-full flex justify-center items-center py-20">
						<p className="text-sm text-neutral-light-800 font-bold dark:text-neutral-dark-300">
							Something went wrong. Please try again.
						</p>
					</div>
				) : archivedBookmarks?.map((item) => {
					return (
						<BookmarkCard
							key={item.id}
							id={item.id}
							title={item.title}
							url={item.url}
							description={item.description}
							favicon={fetchFavicon(item.url)}
							visitCount={item.visitCount}
							lastVisited={item.lastVisited}
							createdAt={item.createdAt}
							tags={item.tags}
							isPinned={item.pinned}
							isArchived={item.isArchived}
							copy={() => copy(item.url)}
							unarchive={() => unarchive(item.id)}
							visit={() => visit(item.id)}
							bookmarkDelete={() => bookmarkDelete(item.id)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default ArchivePage;
