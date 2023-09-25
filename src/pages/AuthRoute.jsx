import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginPage from "./LoginPage";

export default function AuthRoute ({children}) {
    const naviagte = useNavigate()
    const [isLogin, setLogin] = useState(!!localStorage.getItem('9token'))
    
    if (!isLogin) {
        return <><LoginPage /></>
    }

    return (
        <>
            {children}
        </>
    )
}