import { useUI } from "../../Context/ToggleContext";

type Props = {
	id: number;
	unarchive?: () => void;
};

const UnarchiveBookmarkDialog = ({ id, unarchive }: Props) => {
	const { active, close } = useUI();
	const isDialogOpen = active === `unarchive-dialog-${id}`;

	return (
		<div className={`${isDialogOpen ? "grid" : "hidden"} place-items-center fixed inset-0 bg-black/50 z-50`}>
			<div className="grid gap-6 rounded-2xl py-6 px-5 md:p-8 border border-neutral-light-500 dark:border-neutral-dark-500 bg-neutral-light-0 dark:bg-neutral-dark-800">
				<div className="grid gap-2">
					<h1 className="text-2xl font-bold text-neutral-light-900 dark:text-neutral-dark-0">Unarchive bookmark</h1>
					<p className="text-sm text-neutral-light-800 dark:text-neutral-dark-100">Move this bookmark back to your active list?</p>
				</div>
				<div className="flex gap-4 items-center justify-end">
					<button
						onClick={close}
						className="px-4 py-3 text-neutral-light-900 dark:text-neutral-light-0 font-semibold rounded-lg border border-neutral-light-400 dark:border-neutral-dark-400 cursor-pointer">
						Cancel
					</button>
					<button
						type="button"
						onClick={() => { unarchive?.(); close(); }}
						className="px-4 py-3 bg-teal-700 text-neutral-light-0 font-semibold rounded-lg cursor-pointer hover:bg-teal-800">
						Unarchive
					</button>
				</div>
			</div>
		</div>
	);
};

export default UnarchiveBookmarkDialog;