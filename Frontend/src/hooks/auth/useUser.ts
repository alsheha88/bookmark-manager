import { useQuery } from "@tanstack/react-query"
import { getUser } from "../../api/userApi"

type User = {
	id: number;
	username: string;
	firstName?: string;
	lastName?: string;
};

export function useUser(){

    return useQuery<User>({
        queryKey: ["user"],
        queryFn: () => getUser() 
    })
}