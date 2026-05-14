
type TagProps = {
	tag: string;
	tagCount: number;
	selectedTag: string | null;
	onChange: () => void;
};

const Tag = ({ tag, tagCount, selectedTag, onChange }: TagProps) => {

	
	return (
		<div className="px-3 py-2 flex justify-between items-center">
			<div className="flex gap-2">
				<label
					htmlFor={tag}
					className="flex items-center gap-2 cursor-pointer font-semibold text-neutral-light-800 dark:text-neutral-dark-100">
					<input
						type="checkbox"
						className="sr-only peer"
						name="tag"
						id={tag}
						value={tag}
						checked={selectedTag === tag}
						onChange={onChange}
					/>
					<div className="w-4 h-4 border border-neutral-light-500 dark:border-neutral-dark-300 rounded dark:peer-checked:bg-neutral-dark-600 peer-checked:bg-neutral-light-500" />
					{tag}
				</label>
			</div>
			<div className="flex justify-center items-center aspect-square text-xs font-medium text-neutral-light-800 rounded-full px-2 py-0.5 bg-neutral-light-100 border-2 border-neutral-light-300 dark:bg-neutral-dark-600 dark:border-neutral-dark-400 dark:text-neutral-dark-0">
				{tagCount}
			</div>
		</div>
	);
};

export default Tag;
