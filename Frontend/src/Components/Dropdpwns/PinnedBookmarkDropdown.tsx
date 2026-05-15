import { SquareArrowOutUpRight, Copy, Archive, PinOff, SquarePen } from "lucide-react";
import { useUI } from "../../Context/ToggleContext";

type DropdownProps = {
	isOpen: boolean;
	url: string;
	id: number;
	copy?: () => void;
	archive?: () => void;
	visit?: () => void;
	unpin?: () => void;
};

const PinnedBookmarkDropdown = ({ id, url, isOpen, copy, visit, unpin }: DropdownProps) => {
	const { open } = useUI();

	return (
		<div className={`grid absolute ${isOpen ? "pointer-events-auto opacity-100 transition-opacity duration-200 ease-in" : "pointer-events-none opacity-0 transition-opacity duration-200 ease-in"} w-48 right-0 top-[calc(100%+0.5rem)] gap-2 p-2 bg-neutral-light-0 dark:bg-neutral-dark-600 rounded-lg border border-neutral-light-100 dark:border-neutral-dark-500 shadow-[0px_6px_14px_0px_rgba(34,38,39,0.12)]`}>
			<a onClick={visit} target="_blank" href={url} className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100 p-2 flex items-center gap-2.5 hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<SquareArrowOutUpRight className="text-neutral-light-800 dark:text-neutral-dark-100" />
				Visit
			</a>
			<button type="button" onClick={copy} className="p-2 flex items-center gap-2.5 cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<Copy className="text-neutral-light-800 dark:text-neutral-dark-100" />
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">Copy URL</p>
			</button>
			<button onClick={unpin} type="button" className="p-2 flex items-center gap-2.5 cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<PinOff className="text-neutral-light-800 dark:text-neutral-dark-100" />
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">Unpin</p>
			</button>
			<button onClick={() => open(`edit-bookmark-modal-${id}`)} type="button" className="p-2 flex items-center gap-2.5 cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<SquarePen className="text-neutral-light-800 dark:text-neutral-dark-100" />
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">Edit</p>
			</button>
			<button type="button" onClick={() => open(`archive-dialog-${id}`)} className="p-2 flex items-center gap-2.5 cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<Archive className="text-neutral-light-800 dark:text-neutral-dark-100" />
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">Archive</p>
			</button>
		</div>
	);
};

export default PinnedBookmarkDropdown;