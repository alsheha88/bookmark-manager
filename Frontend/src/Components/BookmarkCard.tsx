import BookmarkMeta from "./BookmarkMeta";
import TagBadge from "./TagBadge";
import PinnedBookmarkDropdown from "./Dropdpwns/PinnedBookmarkDropdown";
import ActiveBookmarkDropdown from "./Dropdpwns/ActiveBookmarkDropdown";
import ArchivedBookmarkDropdown from "./Dropdpwns/ArchivedBookmarkDropdown";
import { Pin } from "lucide-react";
import UnarchiveBookmarkDialog from "./Dialogs/UnarchiveBoomarkDialog";
import ArchiveBookmarkDialog from "./Dialogs/ArchiveBookmarkDialog";
import DeleteBookmarkDialog from "./Dialogs/DeleteBookmarkDialog";
import EditBookmarkForm from "./Forms/EditBookmarkForm";
import { useUI } from "../Context/ToggleContext";

type CardProps = {
	id: number;
	title: string;
	url: string;
	description: string;
	favicon: string;
	visitCount: number;
	lastVisited: string;
	createdAt: string;
	tags: string[];
	isPinned: boolean;
	isArchived: boolean;
	copy?: () => void;
	archive?: () => void;
	visit?: () => void;
	pin?: () => void;
	unpin?: () => void;
	unarchive?: () => void;
	bookmarkDelete?: () => void;
};

const BookmarkCard = ({
	id,
	title,
	url,
	description,
	favicon,
	visitCount,
	lastVisited,
	createdAt,
	tags,
	isPinned,
	isArchived,
	copy,
	archive,
	visit,
	pin,
	unpin,
	unarchive,
	bookmarkDelete,
}: CardProps) => {
	const { active, open, close } = useUI();

	const dropdownId = `dropdown-${id}`;
	const isDropdownOpen = active === dropdownId;

	function archiveOrPin() {
		if (isArchived) {
			return (
				<p className="text-xs text-center px-2 py-0.5 rounded-sm bg-neutral-light-100 text-neutral-light-800 dark:bg-neutral-dark-600 dark:text-neutral-dark-100">
					Archived
				</p>
			);
		} else if (isPinned) {
			return (
				<Pin className="w-4 stroke-2 text-neutral-light-800 dark:text-neutral-dark-100" />
			);
		}
	}

	return (
		<div className="flex flex-col bg-neutral-light-0 rounded-xl dark:bg-neutral-dark-800 shadow-[0px_2px_4px_0px_rgba(21,21,21,0.06)]">
			<div className="p-4 flex flex-col min-w-0 flex-1">
				<div className="flex justify-between items-center gap-3">
					<div className="flex items-center gap-2 min-w-0">
						<img
							src={`${favicon}`}
							alt={title}
							className="w-11 h-11 rounded-lg shrink-0"
						/>
						<div className="flex flex-col gap-1.5 min-w-0">
							<h2 className="text-xl font-bold text-neutral-light-900 dark:text-neutral-dark-0 truncate">
								{title}
							</h2>
							<a
								href={url}
								rel="noopener noreferrer"
								target="_blank"
								className="text-xs truncate font-medium text-neutral-light-800 dark:text-neutral-dark-100">
								{url}
							</a>
						</div>
					</div>
					<div className="relative shrink-0">
						<button
							onClick={() => (isDropdownOpen ? close() : open(dropdownId))}
							className="w-8 h-8 flex items-center justify-center rounded-lg border border-neutral-light-400 dark:border-neutral-dark-500 cursor-pointer">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="20"
								height="20"
								fill="none"
								viewBox="0 0 20 20">
								<path
									stroke="#051513"
									d="M10 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666M10 5a.833.833 0 1 0 0-1.667A.833.833 0 0 0 10 5M10 16.667A.833.833 0 1 0 10 15a.833.833 0 0 0 0 1.667"
									className="stroke-neutral-light-900 dark:stroke-neutral-dark-0"
								/>
							</svg>
						</button>
						{isPinned ? (
							<PinnedBookmarkDropdown
								id={id}
								isOpen={isDropdownOpen}
								url={url}
								copy={copy}
								archive={archive}
								visit={visit}
								unpin={unpin}
							/>
						) : isArchived ? (
							<ArchivedBookmarkDropdown
								id={id}
								isOpen={isDropdownOpen}
								url={url}
								copy={copy}
								unarchive={unarchive}
								visit={visit}
								bookmarkDelete={bookmarkDelete}
							/>
						) : (
							<ActiveBookmarkDropdown
								id={id}
								isOpen={isDropdownOpen}
								url={url}
								copy={copy}
								archive={archive}
								visit={visit}
								pin={pin}
							/>
						)}
					</div>
				</div>
				<hr className="my-4 text-neutral-light-300 dark:text-neutral-dark-500" />
				<div className="grid min-w-0">
					<p className="mb-4 text-sm text-neutral-light-800 dark:text-neutral-dark-100 wrap-break-word">
						{description}
					</p>
					<div className="flex items-center gap-3 mb-9 flex-wrap">
						{tags.map((tag) => (
							<TagBadge key={tag} tag={tag} />
						))}
					</div>
				</div>
			</div>
			<div className="flex gap-2 justify-between items-center px-4 py-3 border-t border-t-neutral-light-300 dark:border-t-neutral-dark-500">
				<div className="flex items-center gap-4">
					<BookmarkMeta
						visitCount={visitCount}
						lastVisited={lastVisited}
						createdAt={createdAt}
						isArchived={isArchived}
					/>
				</div>
				<div>{archiveOrPin()}</div>
			</div>
			<EditBookmarkForm id={id} title={title} url={url} description={description} tags={tags}  />
			<ArchiveBookmarkDialog id={id} archive={archive} />
			<DeleteBookmarkDialog id={id} bookmarkDelete={bookmarkDelete} />
			<UnarchiveBookmarkDialog id={id} unarchive={unarchive} />
		</div>
	);
};

export default BookmarkCard;
