import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
const useSelectedClasses = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token')

    const { refetch, data: selectedClass = [] } = useQuery({
        queryKey: ['selectedClass', user?.email],
        queryFn: async () => {
            const response = await fetch(`http://localhost:5000/selectedClass?email=${user.email}`, {
                headers: {
                    authorization: `bearer ${token}`
                }
            });
            return response.json();
        }
    })

    return [selectedClass, refetch];
}

export default useSelectedClasses;