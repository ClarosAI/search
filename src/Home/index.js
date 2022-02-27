import React from "react";
import Navbar from "./Navbar";
import SuccessView from "./SuccessView";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useNavigate } from "react-router-dom";
import { signOut } from "supertokens-auth-react/recipe/emailpassword";

export default function Home() {
    const { userId } = useSessionContext();
    const navigate = useNavigate();

    async function logoutClicked() {
        await signOut();
        navigate("/auth");
    }
    function redirectToConsole() {
        window.location.href = "https://console.diva.so";
    }

    return (
        <div className="fill">
            <Navbar logoutClicked={logoutClicked} redirectToConsole={redirectToConsole}/>
            <SuccessView userId={userId} />
        </div>
    );
}