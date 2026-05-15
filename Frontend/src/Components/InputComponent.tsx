type InputProps = {
	type: string;
	name: string;
	text: string;
	placeholder?: string;
    label?: React.ReactNode
};

const InputComponent = ({ type, name, text, placeholder, label, ...props }: InputProps) => {
	return (
		<div className="flex flex-col gap-1.5 ">
			<label
				className="text-sm text-neutral-light-900 dark:text-neutral-dark-0"
				htmlFor={name}>
				{text}{label}
			</label>
			<input
				className="p-3 border cursor-pointer hover:bg-neutral-light-100 dark:hover:bg-neutral-dark-500 text-neutral-light-900 dark:text-neutral-dark-0 border-neutral-light-500 rounded-lg bg-neutral-light-0 shadow-[0px_1px_2px_rgba(10,13,18,0.05)] dark:bg-neutral-dark-600 dark:border-neutral-dark-300"
				type={type}
				autoComplete=""
				name={name}
				id={name}
				placeholder={placeholder}
				{...props}
			/>
		</div>
	);
};

export default InputComponent;
