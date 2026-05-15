import { Check, Trash2, Copy, RotateCcw, Archive, Pin } from "lucide-react";
import { useTheme } from "../Context/ThemeContext";

type Props = {
	mode: string | null;
	toastOpen: boolean;
};

const Toast = ({ mode, toastOpen }: Props) => {
	const { theme } = useTheme();
	const color = theme === "dark" ? "#ffffff" : "#899492";
	const size = 20;

	function getToast(mode: string | null) {
		if (mode === "add") {
			return (
				<div className="flex items-center gap-2">
					<Check color={color} size={size} />
					<p>Bookmark added successfully.</p>
				</div>
			);
		}
		if (mode === "edit") {
			return (
				<div className="flex items-center gap-2">
					<Check color={color} size={size} />
					<p>Changes saved.</p>
				</div>
			);
		}
		if (mode === "delete") {
			return (
				<div className="flex items-center gap-2">
					<Trash2 color={color} size={size} />
					<p>Bookmark deleted.</p>
				</div>
			);
		}
		if (mode === "copy") {
			return (
				<div className="flex items-center gap-2">
					<Copy color={color} size={size} />
					<p>Link copied to clipboard.</p>
				</div>
			);
		}
		if (mode === "archive") {
			return (
				<div className="flex items-center gap-2">
					<Archive color={color} size={size} />
					<p>Bookmark archived.</p>
				</div>
			);
		}
		if (mode === "pin") {
			return (
				<div className="flex items-center gap-2">
					<Pin color={color} size={size} />
					<p>Bookmark pinned to top.</p>
				</div>
			);
		}
		if (mode === "unarchive") {
			return (
				<div className="flex items-center gap-2">
					<RotateCcw color={color} size={size} />
					<p>Bookmark restored.</p>
				</div>
			);
		}

		return null;
	}
	return (
		<div
			className={`absolute top-[1.5rem] right-[1rem] md:top-[2rem] md:right-[2rem] flex items-center justify-between ${toastOpen ? "pointer-events-auto opacity-100 transition-opacity duration-500" : "pointer-events-none opacity-0 transition-opacity duration-500"} transition-opacity duration-300 ease-in-out rounded-lg text-sm py-2.5 px-3 bg-neutral-light-0 border border-neutral-light-300 text-neutral-light-900 dark:bg-neutral-dark-500 dark:border-neutral-dark-400 dark:text-neutral-dark-0 shadow-[0px_6px_9px_0px_rgba(21,21,21,0.08)]`}>
			{getToast(mode)}
			<button type="button"></button>
		</div>
	);
};

export default Toast;
