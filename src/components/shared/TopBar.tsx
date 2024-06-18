import {Link, useNavigate} from "react-router-dom";
import { useLogoutMutation } from '@/lib/react-query';
import {useEffect} from "react";
import {useAuthContext} from "@/context/AuthContext.tsx";
import {Button} from "@/components/ui";

const TopBar = () => {
    const {mutate: signOut, isSuccess} = useLogoutMutation()
    const navigate = useNavigate()
    const {user} = useAuthContext()
    useEffect(() => {
        if (isSuccess) {
            navigate(0)
        }
    }, [isSuccess])
    return (
        <section className="top-bar">
            <div className="flex-between py-3 px-5">
                <Link to="/" className="flex gap-3 items-center text-white font-bold">
                    <img src="/assets/logo.png" className="w-10 h-10 rounded-full" alt="logo"/>
                    Instagram C
                </Link>

                <div className="flex-center gap-4">
                    <Button variant="ghost" onClick={() => signOut()}>
                        <img src="/assets/icons/logout.svg" alt="logout"/>
                    </Button>

                    <Link to={`/profile/${user.id}`} className="flex-center gap-3">
                        <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile"
                             className="w-8 h-8 rounded-full" />
                    </Link>
                </div>
            </div>


        </section>
    );
}

export default TopBar;