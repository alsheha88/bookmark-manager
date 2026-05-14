import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "../Components/InputComponent";
import logo from "../assets/images/logo-dark-theme.svg";
import { NavLink } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { type LoginData, loginSchema } from "../schemas/loginSchema";
import { useLogin } from "../hooks/auth/useLogin";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
	const { mutate, isError, error } = useLogin();
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginData>({
		resolver: zodResolver(loginSchema),
	});

	const onSubmit: SubmitHandler<LoginData> = (data) => mutate(data);

	return (
		<div className="h-screen flex items-center justify-center bg-neutral-light-100 dark:bg-neutral-dark-900">
			<form
				action=""
				onSubmit={handleSubmit(onSubmit)}
				className=" grid gap-8 rounded-xl py-8 px-5 md:py-10 md:px-8 shadow-[0px,1px,2px,rgba(10,13,18,0.05)] border border-neutral-light-500 dark:border-neutral-dark-500  bg-neutral-light-0 dark:bg-neutral-dark-800">
				<img src={logo} alt="" />

				<div className="grid gap-1.5">
					<h2 className="text-2xl text-neutral-light-900 font-bold leading-[1.4] dark:text-neutral-dark-0 ">
						Log in to your account
					</h2>
					<p className="text-sm text-neutral-light-800 font-medium dark:text-neutral-dark-100">
						Welcome back! Please enter your details.
					</p>
				</div>

				<div className="grid gap-4">
					<InputComponent text="Email" type="text" {...register("email")} />
					{errors.email && (
						<small className="bold text-red-800 text-[12px]">
							{errors.email.message}
						</small>
					)}
					<div className="relative">
						<InputComponent
							text="Password"
							type={showPassword ? "text" : "password"}
							{...register("password")}
						/>
						<button
							type="button"
							onMouseDown={() => setShowPassword(true)}
							onMouseUp={() => setShowPassword(false)}
							className="absolute top-[50%] right-3 translate-y-[10%] cursor-pointer">
							{showPassword ? (
								<EyeOff color="#001f1f" size={20} />
							) : (
								<Eye color="#001f1f" size={20} />
							)}
						</button>
					</div>
					{errors.password && (
						<small className="bold text-red-800 text-[12px]">
							{errors.password.message}
						</small>
					)}

					<button
						className="py-3 px-4 bg-teal-700 rounded-lg text-neutral-light-0 shadow-[0px,0px,0px,1px,rgba(34,38,39,0.12)] cursor-pointer hover:bg-teal-800"
						type="submit">
						Log in
					</button>
				</div>
				{isError && (
					<small className="bold text-red-800 text-[12px]">
						{error.message}
					</small>
				)}
				<div className="grid gap-3">
					<div className="flex gap-1.5 justify-center">
						<p className=" text-neutral-light-800 font-medium leading-normal text-sm dark:text-neutral-dark-100">
							Forgot password?
						</p>
						<NavLink
							to={"/reset"}
							className=" text-neutral-light-900 font-semibold leading-normal text-sm dark:text-neutral-light-0">
							Reset it
						</NavLink>
					</div>
					<div className="flex gap-1.5 justify-center">
						<p className=" text-neutral-light-800 font-medium leading-normal text-sm dark:text-neutral-dark-100">
							Don’t have an account?
						</p>

						<NavLink
							to={"/signup"}
							className=" text-neutral-light-900 font-semibold leading-normal text-sm dark:text-neutral-light-0">
							Sign up
						</NavLink>
					</div>
				</div>
			</form>
		</div>
	);
};

export default LoginPage;
