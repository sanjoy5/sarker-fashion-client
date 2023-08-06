import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";


const useAdmin = () => {
    const { user, loading } = useAuthContext()
    const [axiosSecure] = useAxiosSecure()
    const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`)
            return res.data.admin
        }
    })

    return [isAdmin, isAdminLoading]
};

export default useAdmin;