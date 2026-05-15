import { NavLink, useLocation } from "react-router-dom";
import darkThemeLogo from "../assets/images/logo-dark-theme.svg";
import lightThemeLogo from "../assets/images/logo-light-theme.svg";
import Tag from "./Tag";
import { useTheme } from "../Context/ThemeContext";
import { useArchBookmarks, useBookmarks } from "../hooks/bookmarks/useBookmarks";
import type { Bookmark } from "../schemas/bookmarksSchema";
import { useFilterContext } from "../Context/FilterContext";
import { useUI } from "../Context/ToggleContext";
import { X } from "lucide-react";

interface ItemCount {
	name: string;
	count: number;
}

const Sidebar = () => {
	const { theme } = useTheme();
	const location = useLocation();
	const { selectedTag, handleTagSelect } = useFilterContext();
	const { data: bookmarksData } = useBookmarks();
	const { data: archiveData } = useArchBookmarks();
	const { active, close } = useUI();

	const isMobileOpen = active === "mobile-sidebar";

	function getTagCounts(data: Bookmark[] | undefined): ItemCount[] {
		const tagsArr = data?.map((d) => d.tags).flat() ?? [];
		const bookmarkTags = tagsArr.reduce(
			(acc: Record<string, number>, item: string) => {
				acc[item] = (acc[item] || 0) + 1;
				return acc;
			},
			{},
		);
		return Object.entries(bookmarkTags)
			.map(([name, count]) => ({ name, count }))
			.sort((a, b) => a.name.localeCompare(b.name));
	}

	function renderTags() {
		const data = location.pathname === "/" ? bookmarksData : archiveData;
		return getTagCounts(data);
	}

	const sidebarContent = (
		<div className="flex flex-col gap-4">
			<div className="px-5 py-5">
				<img src={theme === "dark" ? darkThemeLogo : lightThemeLogo} />
			</div>
			<div className="grid gap-4 px-4 pb-5">
				<div>
					<NavLink
						to={"/"}
						onClick={close}
						className={`flex items-center gap-2 rounded-md px-3 py-2 font-semibold text-neutral-light-900 dark:text-neutral-dark-0 ${location.pathname === "/" ? "bg-neutral-light-100 dark:bg-neutral-dark-600" : "bg-neutral-light-0 dark:bg-neutral-dark-800"}`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
							<path  d="M6.667 14.167h6.666M9.181 2.303 3.53 6.7c-.377.294-.566.441-.702.625-.12.163-.21.347-.265.542-.062.22-.062.46-.062.938v6.03c0 .933 0 1.4.182 1.756.16.314.414.569.728.728.357.182.823.182 1.757.182h9.666c.934 0 1.4 0 1.757-.182.314-.16.569-.414.728-.728.182-.357.182-.823.182-1.757V8.804c0-.478 0-.718-.062-.938a1.7 1.7 0 0 0-.265-.542c-.136-.184-.325-.33-.702-.625l-5.652-4.396c-.293-.227-.44-.341-.601-.385a.83.83 0 0 0-.436 0c-.161.044-.308.158-.6.385" className="stroke-neutral-light-900 dark:stroke-neutral-dark-0" />
						</svg>
						Home
					</NavLink>
					<NavLink
						to={"/archive"}
						onClick={close}
						className={`flex items-center gap-2 rounded-md px-3 py-2 font-semibold text-neutral-light-900 dark:text-neutral-dark-0 ${location.pathname === "/archive" ? "bg-neutral-light-100 dark:bg-neutral-dark-600" : "bg-neutral-light-0 dark:bg-neutral-dark-800"}`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 20 20">
							<path  d="M3.334 6.664a2 2 0 0 1-.325-.03 1.67 1.67 0 0 1-1.31-1.309c-.032-.16-.032-.354-.032-.742 0-.387 0-.58.032-.741a1.67 1.67 0 0 1 1.31-1.31c.16-.032.354-.032.741-.032h12.5c.387 0 .581 0 .742.032a1.67 1.67 0 0 1 1.31 1.31c.032.16.032.354.032.742 0 .388 0 .581-.032.742a1.67 1.67 0 0 1-1.31 1.31 2 2 0 0 1-.325.029m-8.333 4.17h3.333M3.334 6.666h13.333V13.5c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092c-.535.273-1.235.273-2.635.273H7.334c-1.4 0-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092c-.272-.535-.272-1.235-.272-2.635z" className="stroke-neutral-light-900 dark:stroke-neutral-dark-0" />
						</svg>
						Archived
					</NavLink>
				</div>
				<div>
					<p className="px-3 pb-1 text-xs font-bold text-[rgba(77,77,77,1)] dark:text-neutral-dark-100">
						TAGS
					</p>
					{renderTags()?.map((item) => (
						<Tag
							key={item.name}
							tag={item.name}
							tagCount={item.count}
							selectedTag={selectedTag}
							onChange={() => { handleTagSelect(item.name); close(); }}
						/>
					))}
				</div>
			</div>
		</div>
	);

	return (
		<>
			{/* Desktop */}
			<div className="hidden lg:flex flex-col min-h-screen w-74 bg-neutral-light-0 dark:bg-neutral-dark-800 border-r border-r-neutral-light-300 dark:border-r-neutral-dark-500">
				{sidebarContent}
			</div>

			{/* Mobile drawer */}
			{isMobileOpen && (
				<div className="lg:hidden fixed inset-0 z-50 flex">
					<div className="w-74 min-h-screen bg-neutral-light-0 dark:bg-neutral-dark-800 overflow-y-auto relative">
						<button
							onClick={close}
							className="absolute top-4 right-4 p-1 cursor-pointer text-neutral-light-900 dark:text-neutral-dark-0">
							<X className="w-5 h-5" />
						</button>
						{sidebarContent}
					</div>
					{/* Backdrop */}
					<div
						className="flex-1 bg-black/50"
						onClick={close}
					/>
				</div>
			)}
		</>
	);
};

export default Sidebar;