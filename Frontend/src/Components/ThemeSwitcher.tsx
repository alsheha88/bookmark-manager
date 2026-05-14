import { useTheme } from "../Context/ThemeContext";

const ThemeSwitcher = () => {
	const { toggleTheme} = useTheme();
	return (
		<div className="flex items-center p-0.5 rounded-sm bg-neutral-light-300 dark:bg-neutral-dark-500">
			<button onClick={toggleTheme} className="px-2 py-1.5 rounded-lg cursor-pointer bg-neutral-light-0 dark:bg-neutral-dark-500">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="none"
					viewBox="0 0 20 20">
					<g >
						<path
							d="M10 1.667v1.666m0 13.334v1.666M3.334 10H1.667m3.595-4.738L4.084 4.083m10.655 1.179 1.178-1.179M5.262 14.742 4.084 15.92m10.655-1.178 1.178 1.178M18.334 10h-1.667m-2.5 0a4.167 4.167 0 1 1-8.333 0 4.167 4.167 0 0 1 8.333 0"
                            className="stroke-neutral-light-800 dark:stroke-neutral-dark-0"
                        />
					</g>
					<defs>
						<clipPath id="a">
							<path fill="#fff" d="M0 0h20v20H0z" />
						</clipPath>
					</defs>
				</svg>
			</button>
			<button onClick={toggleTheme} className="px-2 py-1.5 rounded-lg dark:bg-neutral-dark-800 cursor-pointer">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="20"
					height="20"
					fill="none"
					viewBox="0 0 20 20">
					<g>
						<path
							d="M18.296 10.797a6.667 6.667 0 1 1-9.092-9.093 8.334 8.334 0 1 0 9.092 9.093"
                            className="stroke-neutral-light-800 dark:stroke-neutral-dark-0"
						/>
					</g>
					<defs>
						<clipPath id="b">
							<path fill="#fff" d="M0 0h20v20H0z" />
						</clipPath>
					</defs>
				</svg>
			</button>
		</div>
	);
};

export default ThemeSwitcher;
