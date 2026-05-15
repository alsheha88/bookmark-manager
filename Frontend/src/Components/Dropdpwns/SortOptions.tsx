import { Check } from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useFilterContext } from "../../Context/FilterContext";
type DropdownProps = {
	isOpen: boolean;
	setSort: Dispatch<SetStateAction<boolean>>;
};

const SortOptions = ({ isOpen, setSort }: DropdownProps) => {
	const [selectedSort, setSelectedSort] = useState("");
	const { handleSort } = useFilterContext();

	function handleClick(value: string) {
		setSelectedSort(value);
		handleSort(value);
		setSort(false);
	}

	return (
		<div
			className={`grid absolute ${isOpen ? "pointer-events-auto opacity-100 transition-opacity duration-200 ease-in" : "pointer-events-none opacity-0 transition-opacity duration-200 ease-in"} z-1000 w-48 right-0 top-[calc(100%+0.5rem)] gap-2 p-2 bg-neutral-light-0 dark:bg-neutral-dark-600 rounded-lg border border-neutral-light-100 dark:border-neutral-dark-500 shadow-[0px_6px_14px_0px_rgba(34,38,39,0.12)]`}>
			
			<button
				type="button"
				onClick={() => handleClick("recentlyAdded")}
				className="p-2 flex items-center justify-between gap-1 cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">
					Recently Added
				</p>
				{selectedSort === "recentlyAdded" && (
					<Check className="text-neutral-light-800 dark:text-neutral-dark-100" />
				)}
			</button>
			<button
				type="button"
				onClick={() => handleClick("recentlyVisited")}
				className="p-2 flex items-center justify-between gap-1 cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">
					Recently Visited
				</p>
				{selectedSort === "recentlyVisited" && (
					<Check className="text-neutral-light-800 dark:text-neutral-dark-100" />
				)}
			</button>
			<button
				type="button"
				onClick={() => handleClick("mostVisited")}
				className="p-2 flex items-center justify-between gap-1 cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">
					Most Visited
				</p>
				{selectedSort === "mostVisited" && (
					<Check className="text-neutral-light-800 dark:text-neutral-dark-100" />
				)}
			</button>
			<button
				type="button"
				onClick={() => handleClick("")}
				className="p-2 flex items-center justify-between gap-1 cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 rounded-sm">
				<p className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">
					Reset
				</p>
				{selectedSort === "" && (
					<Check className="text-neutral-light-800 dark:text-neutral-dark-100" />
				)}
			</button>
		</div>
	);
};

export default SortOptions;
