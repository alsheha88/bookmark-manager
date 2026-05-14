import { CircleUser } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useUser } from "../hooks/auth/useUser";
import { useUI } from "../Context/ToggleContext";

type modalProps = {
	isOpen: boolean;
	fullName: string;
	email: string;
};

const ProfileCard = ({ isOpen }: modalProps) => {
	const { close } = useUI();
	const { logout } = useAuth();
	const navigate = useNavigate();
	const { data } = useUser();

	const handleLogout = () => {
		logout();
		close();
		navigate("/login");
	};

	return (
		<div className={`${isOpen ? "grid" : "hidden"} z-50 w-72 bg-neutral-light-0 dark:bg-neutral-dark-600 absolute top-[3rem] right-0 rounded-lg border border-neutral-light-100 shadow-[0px_2px_4px_0px_rgba(34,38,39,0.1)] dark:border-neutral-dark-500`}>
			<button className="px-4 py-3 flex gap-3 cursor-pointer min-w-0 w-full">
				<CircleUser className="w-10 h-10 rounded-full text-neutral-light-500 dark:text-neutral-dark-100 shrink-0" />
				<div className="flex flex-col items-start min-w-0 w-full">
					<h3 className="text-sm font-semibold text-neutral-light-900 dark:text-neutral-dark-0 truncate w-full">
						{`${data?.firstName} ${data?.lastName}`}
					</h3>
					<p className="text-sm text-neutral-light-800 dark:text-neutral-dark-100 truncate w-full">
						{data?.username}
					</p>
				</div>
			</button>
			<div className="flex items-center justify-between my-1 px-2 py-1">
				<div className="flex gap-2.5 p-2 cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="none"
						viewBox="0 0 20 20">
						<g
							stroke="#051513"
							className="stroke-neutral-light-800 dark:stroke-neutral-dark-100">
							<path d="M1.667 10A8.333 8.333 0 0 0 10 18.333a2.5 2.5 0 0 0 2.5-2.5v-.416c0-.387 0-.58.022-.743a2.5 2.5 0 0 1 2.152-2.153c.162-.021.356-.021.743-.021h.417a2.5 2.5 0 0 0 2.5-2.5 8.333 8.333 0 0 0-16.667 0" />
							<path d="M5.834 10.833a.833.833 0 1 0 0-1.666.833.833 0 0 0 0 1.666M13.334 7.5a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667M8.334 6.667a.833.833 0 1 0 0-1.667.833.833 0 0 0 0 1.667" />
						</g>
						<defs>
							<clipPath id="a">
								<path fill="#fff" d="M0 0h20v20H0z" />
							</clipPath>
						</defs>
					</svg>
					<span className="text-sm font-semibold text-neutral-light-800 dark:text-neutral-dark-100">
						Theme
					</span>
				</div>
				<ThemeSwitcher />
			</div>
			<div className="px-2 py-1">
				<button
					onClick={handleLogout}
					type="button"
					className="flex gap-2.5 p-2 cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						fill="none"
						viewBox="0 0 20 20">
						<path
							d="M13.333 14.167 17.5 10m0 0-4.167-4.167M17.5 10h-10m0-7.5h-1c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 4.4 2.5 5.1 2.5 6.5v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092C4.4 17.5 5.1 17.5 6.5 17.5h1"
							className="stroke-neutral-light-800 dark:stroke-neutral-dark-100"
						/>
					</svg>
					<span className="text-neutral-light-800 dark:text-neutral-dark-100">
						Log out
					</span>
				</button>
			</div>
		</div>
	);
};

export default ProfileCard;