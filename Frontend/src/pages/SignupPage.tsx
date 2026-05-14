import { NavLink } from "react-router-dom";
import InputComponent from "../Components/InputComponent";
import logo from "../assets/images/logo-dark-theme.svg";
import { type SignUpData, signUpSchema } from "../schemas/registerSchema";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../hooks/auth/useRegister";


const SignupPage = () => {
	const {mutate} = useRegister()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignUpData>({
		resolver: zodResolver(signUpSchema),
	});

	const onSubmit: SubmitHandler<SignUpData> = (data) => mutate(data);

	return (
		<div className="h-screen flex items-center justify-center bg-neutral-light-100 dark:bg-neutral-dark-900">
			<form
				action=""
				onSubmit={handleSubmit(onSubmit)}
				className="max-w-md grid gap-8 rounded-xl py-8 px-5 md:py-10 md:px-8 shadow-[0px,1px,2px,rgba(10,13,18,0.05)] border border-neutral-light-500 dark:border-neutral-dark-500  bg-neutral-light-0 dark:bg-neutral-dark-800">
				<img src={logo} alt="" />

				<div className="grid gap-1.5">
					<h2 className="text-2xl text-neutral-light-900 font-bold leading-[1.4] dark:text-neutral-dark-0 ">
						Create your account
					</h2>
					<p className="text-sm text-neutral-light-800 font-medium dark:text-neutral-dark-100">
						Join us and start saving your favorite links — organized,
						searchable, and always within reach.
					</p>
				</div>

				<div className="grid gap-4">
					<InputComponent
						text="Full Name"
						type="text"
						label={<sup>*</sup>}
						{...register("fullName")}
					/>
					{errors.fullName && <small className="bold text-red-800 text-[12px]">{errors.fullName.message}</small>}
					<InputComponent
						text="Email Address"
						type="text"
						label={<sup>*</sup>}
						{...register("email")}
					/>
					{errors.email && <small className="bold text-red-800 text-[12px]">{errors.email.message}</small>}

					<InputComponent
						text="Password"
						type="password"
						label={<sup>*</sup>}
						{...register("password")}
					/>
					{errors.password && <small className="bold text-red-800 text-[12px]">{errors.password.message}</small>}

					<button
						className="py-3 px-4 bg-teal-700 rounded-lg text-neutral-light-0 shadow-[0px,0px,0px,1px,rgba(34,38,39,0.12)] cursor-pointer hover:bg-teal-800"
						type="submit">
						Create account
					</button>
				</div>
				<div className="grid gap-3">
					<div className="flex gap-1.5 justify-center">
						<p className=" text-neutral-light-800 font-medium leading-normal text-sm dark:text-neutral-dark-100">
							Already have an account?
						</p>
						<NavLink
							to={"/login"}
							className=" text-neutral-light-900 font-semibold leading-normal text-sm dark:text-neutral-light-0">
							Log in
						</NavLink>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignupPage;
