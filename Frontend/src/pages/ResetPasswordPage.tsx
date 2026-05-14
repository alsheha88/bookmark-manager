import { NavLink } from "react-router-dom";
import InputComponent from "../Components/InputComponent";
import logo from "../assets/images/logo-dark-theme.svg";

const ResetPasswordPage = () => {
	return (
		<div className=" min-h-dvh flex items-center justify-center bg-neutral-light-100 dark:bg-neutral-dark-900">
			<form
				action=""
				className=" grid gap-8 rounded-xl py-8 px-5 md:py-10 md:px-8 shadow-[0px,1px,2px,rgba(10,13,18,0.05)] border border-neutral-light-500 dark:border-neutral-dark-500  bg-neutral-light-0 dark:bg-neutral-dark-800">
				<img src={logo} alt="" />

				<div className="grid gap-1.5">
					<h2 className="text-2xl text-neutral-light-900 font-bold leading-[1.4] dark:text-neutral-dark-0 ">
						Reset Your Password
					</h2>
					<p className="text-sm text-neutral-light-800 font-medium dark:text-neutral-dark-100">
						Enter your new password below. Make sure it’s strong and secure.
					</p>
				</div>
				<div className="grid gap-4">
					<InputComponent text="New Password" name="newPassword" type="text" label={<sup>*</sup>} />
					<InputComponent text="Confirm Password" name="confirmPassword" type="text" label={<sup>*</sup>} />

					<button
						className="py-3 px-4 bg-teal-700 rounded-lg text-neutral-light-0 shadow-[0px,0px,0px,1px,rgba(34,38,39,0.12)] cursor-pointer hover:bg-teal-800"
						type="submit">
						Reset Password
					</button>
				</div>
				<div className="flex gap-1.5 justify-center">
					<NavLink
						to={"/login"}
						className=" text-neutral-light-900 font-semibold leading-normal text-sm dark:text-neutral-light-0">
						Back to login
					</NavLink>
				</div>
			</form>
		</div>
	);
};

export default ResetPasswordPage;
