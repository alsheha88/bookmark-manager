import { Calendar, Clock, Eye } from "lucide-react";
import { formatDate } from "../utils/utils";

type TextProps = {
	visitCount: number;
	lastVisited: string;
	createdAt: string;
	isArchived: boolean;
};

const BookmarkMeta = ({ visitCount, lastVisited, createdAt }: TextProps) => {
	return (
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-1.5 text-neutral-light-800 dark:text-neutral-dark-100">
					<Eye className="w-3 stroke-2" />
					<p className="text-xs font-medium">{visitCount}</p>
				</div>
				<div className="flex items-center gap-1.5 text-neutral-light-800 dark:text-neutral-dark-100">
					<Clock className="w-3 stroke-2" />
					<p className="text-xs font-medium">
						{" "}
						{lastVisited ? formatDate(lastVisited) : "Never"}
					</p>
				</div>
				<div className="flex items-center gap-1.5 text-neutral-light-800 dark:text-neutral-dark-100">
					<Calendar className="w-3 stroke-2" />
					<p className="text-xs font-medium">{formatDate(createdAt)}</p>
				</div>
			</div>
		</div>
	);
};

export default BookmarkMeta;
