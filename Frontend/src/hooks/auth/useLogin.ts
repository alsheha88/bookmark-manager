import { loginUser } from "../../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

export function useLogin() {
    const {saveToken} = useAuth();

	const navigate = useNavigate();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
            saveToken(data.token)
			navigate("/");
		},
	});
}
