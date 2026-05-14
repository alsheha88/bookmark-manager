import { useUI } from "../../Context/ToggleContext";

type Props = {
	id: number;
	archive?: () => void;
};

const ArchiveBookmarkDialog = ({ id, archive }: Props) => {
	const { active, close } = useUI();
	const isDialogOpen = active === `archive-dialog-${id}`;

	return (
		<div className={`${isDialogOpen ? "grid" : "hidden"} place-items-center fixed inset-0 bg-black/50  z-50`}>
			<div className="grid gap-6 rounded-2xl py-6 px-5 md:p-8 border border-neutral-light-500 dark:border-neutral-dark-500 bg-neutral-light-0 dark:bg-neutral-dark-800">
				<div className="grid gap-2">
					<h1 className="text-2xl font-bold text-neutral-light-900 dark:text-neutral-dark-0">Archive bookmark</h1>
					<p className="text-sm text-neutral-light-800 dark:text-neutral-dark-100">Are you sure you want to archive this bookmark?</p>
				</div>
				<div className="flex gap-4 items-center justify-end">
					<button
						onClick={close}
						className="px-4 py-3 text-neutral-light-900 dark:text-neutral-light-0 font-semibold rounded-lg border border-neutral-light-400 dark:border-neutral-dark-400 cursor-pointer">
						Cancel
					</button>
					<button
						type="button"
						onClick={() => { archive?.(); close(); }}
						className="px-4 py-3 bg-teal-700 text-neutral-light-0 font-semibold rounded-lg cursor-pointer hover:bg-teal-800">
						Archive
					</button>
				</div>
			</div>
		</div>
	);
};

export default ArchiveBookmarkDialog;