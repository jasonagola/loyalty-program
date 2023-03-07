import { Outlet } from "react-router-dom";
import Logout from '../authentication/logout'
import useAuth from '../hooks/useAuth'
import Sidebar from "./NavComponents/sidebar";

const Layout = () => {

    const auth = useAuth()

    if (auth.auth.username) {
           return (
            <main className="App">
                <Sidebar/>
                <Outlet/>
            </main>
        )
    } 

    return (
        <main className="App">
                <Outlet/>
            </main>

    )


    // console.log("No authentication so there is no logout button")
    // return (
    //     <main className="App">
    //         <Outlet/>
    //     </main>
    // )

    
    
}

export default Layout