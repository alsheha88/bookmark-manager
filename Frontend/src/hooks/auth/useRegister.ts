import { signUpUser } from "../../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export function useRegister() {
    const {saveToken} = useAuth()
	const navigate = useNavigate();

	return useMutation({
		mutationFn: signUpUser,
		onSuccess: (data) => {
			saveToken(data.token)
            navigate("/login");

		},
	});
}
