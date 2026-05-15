import { SquareArrowOutUpRight, Copy, RotateCcw, Trash2 } from "lucide-react";
import { useUI } from "../../Context/ToggleContext";

type DropdownProps = {
	isOpen: boolean;
	url: string;
	id: number;
	copy?: () => void;
	unarchive?: () => void;
	visit?: () => void;
	bookmarkDelete?: () => void;
};

const ArchivedBookmarkDropdown = ({ id, url, isOpen, copy, visit }: DropdownProps) => {
	const { open } = useUI();

	return (
		<div className={`grid absolute ${isOpen ? "pointer-events-auto opacity-100 transition-opacity duration-200 ease-in" : "pointer-events-none opacity-0 transition-opacity duration-200 ease-in"} w-54 right-0 top-[calc(100%+0.5rem)] gap-2 p-2 bg-neutral-light-0 dark:bg-neutral-dark-600 rounded-lg border border-neutral-light-100 dark:border-neutral-dark-500 shadow-[0px_6px_14px_0px_rgba(34,38,39,0.12)]`}>
			<a onClick={visit} target="_blank" href={url} className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100 p-2 flex items-center gap-2.5 hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<SquareArrowOutUpRight className="text-neutral-light-800 dark:text-neutral-dark-100" />
				Visit
			</a>
			<button type="button" onClick={copy} className="p-2 flex items-center gap-2.5 cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<Copy className="text-neutral-light-800 dark:text-neutral-dark-100" />
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">Copy URL</p>
			</button>
			<button type="button" onClick={() => open(`unarchive-dialog-${id}`)} className="p-2 flex items-center gap-2.5 cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<RotateCcw className="text-neutral-light-800 dark:text-neutral-dark-100" />
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">Unarchive</p>
			</button>
			<button type="button" onClick={() => open(`delete-dialog-${id}`)} className="p-2 flex items-center gap-2.5 text-start cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<Trash2 className="text-neutral-light-800 dark:text-neutral-dark-100" />
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">Delete Permanently</p>
			</button>
		</div>
	);
};

export default ArchivedBookmarkDropdown;