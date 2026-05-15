import BookmarkCard from "../Components/BookmarkCard";
import { useBookmarks } from "../hooks/bookmarks/useBookmarks";
import SortOptions from "../Components/Dropdpwns/SortOptions";
import {
	useArchiveBookmark,
	useUpdateBookmarkVisit,
	usePinBookmark,
	useUnpinBookmark,
} from "../hooks/bookmarks/useBookmark";
import { useFilterContext } from "../Context/FilterContext";
import { useUI } from "../Context/ToggleContext";
import { useTheme } from "../Context/ThemeContext";
import { BeatLoader } from "react-spinners";
import Toast from "../Components/Toast";
import { useToastContext } from "../Context/ToastContext";

const HomePage = () => {
	const { selectedTag, sort, search } = useFilterContext();
	const { active, close, open } = useUI();
	const { theme } = useTheme();
	const { setMode, setIsToastOpen, isToastOpen, mode } = useToastContext();
	const { mutate: archiveBookmark } = useArchiveBookmark();
	const { mutate: updateVisitBookmark } = useUpdateBookmarkVisit();
	const { mutate: pinBookmark } = usePinBookmark();
	const { mutate: unPinBookmark } = useUnpinBookmark();

	const { data, isPending, isError, isFetching } = useBookmarks(
		selectedTag ?? undefined,
		sort ?? undefined,
		search ?? undefined,
	);

	const bookmarks = data?.sort((a, b) => Number(b.pinned) - Number(a.pinned));
	const activeBookmarks = bookmarks?.filter((item) => !item.isArchived);

	const copy = async function copyUrl(url: string) {
		try {
			await navigator.clipboard.writeText(url);
			setMode("copy");
			setIsToastOpen(true);
			close();
		} catch (err) {
			if (err instanceof Error) {
				console.log(err.message);
			}
		}
	};

	function archive(id: number) {
		close();
		archiveBookmark(id);
		setMode("archive");
		setIsToastOpen(true);
	}

	function visit(id: number) {
		close();
		updateVisitBookmark(id);
	}

	function pin(id: number) {
		close();
		pinBookmark(id);
		setMode("pin");
		setIsToastOpen(true);
	}

	function unpin(id: number) {
		close();
		unPinBookmark(id);
	}

	function fetchFavicon(url: string) {
		const domain = new URL(url).hostname;
		const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

		return favicon;
	}

	return (
		<div className="min-h-dvh flex flex-col gap-5 px-4 pt-6 pb-16 md:pt-8 md:px-8 bg-neutral-light-100 dark:bg-neutral-dark-900 relative">
			<div className="flex items-center justify-between gap-4">
				<h2 className="text-xl md:text-2xl font-bold text-neutral-light-900 dark:text-neutral-dark-0">
					All bookmarks
				</h2>
				<div className="relative">
					<button
						type="button"
						onClick={() =>
							active === "sort-dropdown" ? close() : open("sort-dropdown")
						}
						className="cursor-pointer px-3 py-2.5 flex items-center gap-1 text-neutral-light-900 dark:text-neutral-dark-0 font-semibold rounded-md border border-neutral-light-400 dark:border-neutral-dark-400">
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
			<div
				className="grid gap-8 pb-8 relative"
				style={{
					gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
				}}>
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
				) : (
					activeBookmarks?.map((item) => {
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
								archive={() => archive(item.id)}
								visit={() => visit(item.id)}
								pin={() => pin(item.id)}
								unpin={() => unpin(item.id)}
							/>
						);
					})
				)}
			</div>
			<Toast mode={mode} toastOpen={isToastOpen} />
		</div>
	);
};

export default HomePage;
