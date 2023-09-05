import { useContext } from "react";
import Listbar from "../components/Listbar";
import { AuthContext } from "../context/auth.context";


const Home = () =>{

    const { isLoggedIn, user, logout } = useContext(AuthContext)
    return(
        <di>
{
            isLoggedIn && (
                <Listbar user={user}/>
            )
        }
</di>
        
        
    )
}

export default Home;