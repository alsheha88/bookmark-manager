type TagProps = {
	tag: string;
};

const TagBadge = ({ tag }: TagProps) => {
	return (
		<>
			<p className="text-xs text-center px-2 py-0.5 rounded-sm bg-neutral-light-100 text-neutral-light-800 dark:bg-neutral-dark-600 dark:text-neutral-dark-100">
				{tag}
			</p>
		</>
	);
};

export default TagBadge;
