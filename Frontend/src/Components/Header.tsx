import { CircleUser } from "lucide-react";
import ProfileCard from "./ProfileCard";
import { useFilterContext } from "../Context/FilterContext";
import { useUI } from "../Context/ToggleContext";

const Header = () => {
	const { handleSearch } = useFilterContext();
	const { active, open, close } = useUI();

	const isProfileOpen = active === "profile-dropdown";

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const { value } = e.target;
		handleSearch(value);
	}

	return (
		<div className="bg-neutral-light-0 dark:bg-neutral-dark-800 px-4 py-3 md:px-8 md:py-4 flex items-center justify-between gap-2.5 border-b border-b-neutral-light-300 dark:border-b-neutral-dark-500">
			<div className="flex items-center gap-4">
				<button
					onClick={() => open("mobile-sidebar")}
					className="lg:hidden rounded-lg flex items-center justify-center p-3 border-2 border-neutral-400 dark:border-neutral-dark-400 cursor-pointer">
					
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="none"
						viewBox="0 0 20 20">
						<path
							d="M2.5 10h15m-15-5h15m-15 10h15"
							className="stroke-neutral-light-900 dark:stroke-neutral-dark-0"
						/>
					</svg>
				</button>
				<label
					htmlFor="search"
					className="w-80 min-w-48 shrink dark:bg-neutral-dark-600 bg-neutral-light-0 hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 p-3 flex items-center gap-1.5 rounded-lg border border-neutral-light-300 shadow-[0px,0px,0px,1px,rgba(34,38,39,0.12)] cursor-pointer dark:border-neutral-dark-500">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="none"
						viewBox="0 0 20 20">
						<path
							d="m17.5 17.5-3.625-3.625m1.958-4.708a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0"
							className="stroke-neutral-light-800 dark:bg-neutral-dark-100"
						/>
					</svg>
					<input
						type="text"
						name="search"
						id="search"
						placeholder="Search by title..."
						onChange={handleChange}
						className="w-full text-sm font-medium placeholder-neutral-light-800 text-neutral-light-900 dark:text-neutral-dark-0 dark:placeholder-neutral-dark-100"
					/>
				</label>
			</div>
			<div className="flex items-center gap-2.5 md:gap-4">
				<button
					onClick={() => open("add-bookmark-modal")}
					className="p-2.5 md:py-3 md:px-4 bg-teal-700 rounded-lg text-neutral-light-0 shadow-[0px,0px,0px,1px_rgba(34,38,39,0.12)] cursor-pointer hover:bg-teal-800"
					type="button">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="none"
						viewBox="0 0 20 20"
						className="md:hidden p-[0.26rem]">
						<path
							d="M10 4.167v11.666M4.167 10h11.667"
							className="stroke-neutral-light-0"
						/>
					</svg>
					<span className="hidden md:block">+ Add Bookmark</span>
				</button>
				<div className="relative">
					<button
						onClick={() =>
							isProfileOpen ? close() : open("profile-dropdown")
						}>
						<CircleUser className="w-10 h-10 rounded-full text-neutral-light-500 dark:text-neutral-dark-100 cursor-pointer" />
					</button>
					<ProfileCard isOpen={isProfileOpen} fullName={""} email={""} />
				</div>
			</div>
		</div>
	);
};

export default Header;
