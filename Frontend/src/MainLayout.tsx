import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import AddBookmarkForm from "./Components/Forms/AddBookmarkForm";
import { FilterProvider } from "./Context/FilterContext";

const MainLayout = () => {
	return (
		<div className="grid lg:grid-cols-[18.5rem_1fr]">
			<FilterProvider>
				<Sidebar />
				<div>
					<Header  />
					<Outlet />
					<AddBookmarkForm
					/>
				</div>
			</FilterProvider>
		</div>
	);
};

export default MainLayout;
