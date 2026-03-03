
import { clearToken } from '@/app/Cookies/auth.actions';
import { useRouter } from 'next/navigation';
import { Bounce, toast } from 'react-toastify';

export default function useLogout() {
    const router = useRouter();

    const logout = async () => {
    await clearToken();
    
    
    toast.success('Account logged out successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    }); 
    
    router.push('/login');
    router.refresh();

    }

    return{
        logout
    }
}
