import { useForm, type SubmitHandler } from "react-hook-form";
import { useEditBookmark } from "../../hooks/bookmarks/useEditBookmark";
import InputComponent from "../InputComponent";
import {
	bookmarkSchema,
	type BookmarkData,
} from "../../schemas/bookmarksSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUI } from "../../Context/ToggleContext";
import { useState } from "react";
import { useToastContext } from "../../Context/ToastContext";

type Props = {
	id: number;
};

const EditBookmarkForm = ({ id }: Props) => {
	const { active, close } = useUI();
	const isModalOpen = active === `edit-bookmark-modal-${id}`;
	const [count, setCount] = useState(0);
	const { setMode, setIsToastOpen } = useToastContext();

	const { mutate } = useEditBookmark();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<BookmarkData>({
		resolver: zodResolver(bookmarkSchema),
	});

	const onSubmit: SubmitHandler<BookmarkData> = (data) => {
		const domain = new URL(data.websiteURL).hostname;
		const favicon = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
		const tags = data.tags
			? data.tags
					.split(",")
					.map((t) => t.trim())
					.filter(Boolean)
			: [];
		mutate({ id, bookmark: { ...data, tags, favicon } });
		setMode("edit");
		setIsToastOpen(true);
		close();
		reset();
	};

	function handleClose() {
		reset();
		close();
	}

	return (
		<div
			className={`${isModalOpen ? "grid" : "hidden"} z-50 fixed inset-0 bg-black/50 place-items-center`}>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid gap-8 rounded-2xl py-6 px-5 md:p-8 shadow-[0px_1px_2px_rgba(10,13,18,0.05)] border border-neutral-light-500 dark:border-neutral-dark-500 bg-neutral-light-0 dark:bg-neutral-dark-800">
				<div className="flex flex-col gap-2.5">
					<h1 className="text-2xl font-bold text-neutral-light-900 dark:text-neutral-dark-0">
						Edit Bookmark
					</h1>
					<p className="text-sm font-medium dark:text-neutral-dark-100 text-neutral-light-800">
						Update your saved link details — change the title, description, URL,
						or tags anytime.
					</p>
				</div>
				<div className="grid gap-5">
					<InputComponent
						text="Title"
						type="text"
						label={<sup>*</sup>}
						{...register("title")}
					/>
					<span className="text-red-500">{errors.title?.message}</span>

					<div className="grid gap-5">
						<label
							htmlFor="description"
							className="text-sm text-neutral-light-900 dark:text-neutral-dark-0">
							Description<sup>*</sup>
						</label>
						<div className="flex flex-col gap-1">
							<textarea
								id="description"
								{...register("description", {
									onChange: (e) => setCount(e.target.value.length),
								})}
								className="h-20 p-3 border text-neutral-light-900 dark:text-neutral-dark-0 border-neutral-light-500 rounded-lg bg-neutral-light-0 shadow-[0px_1px_2px_rgba(10,13,18,0.05)] dark:bg-neutral-dark-600 dark:border-neutral-dark-300"
							/>
							<span className="text-end text-xs font-medium dark:text-neutral-dark-100 text-neutral-light-800">
								{count}/280
							</span>
							<span className="text-red-500">
								{errors.description?.message}
							</span>
						</div>
					</div>
					<InputComponent
						text="Website URL"
						type="text"
						label={<sup>*</sup>}
						{...register("websiteURL")}
					/>
					<span className="text-red-500">{errors.websiteURL?.message}</span>
					<InputComponent
						text="Tags"
						type="text"
						placeholder="e.g. design, learning, tools"
						label={<sup>*</sup>}
						{...register("tags")}
					/>
					<span className="text-red-500">{errors.tags?.message}</span>
				</div>
				<div className="flex gap-4 items-center justify-end">
					<button
						onClick={handleClose}
						className="px-4 py-3 rounded-lg text-neutral-light-900 dark:text-neutral-light-0 font-semibold border border-neutral-light-400 shadow-[0px_0px_0px_1px_rgba(34,38,39,0.12)] dark:border-neutral-dark-400 cursor-pointer"
						type="button">
						Cancel
					</button>
					<button
						className="py-3 px-4 bg-teal-700 rounded-lg text-neutral-light-0 shadow-[0px_0px_0px_1px_rgba(34,38,39,0.12)] cursor-pointer hover:bg-teal-800"
						type="submit">
						Edit Bookmark
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditBookmarkForm;
