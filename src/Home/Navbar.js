
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { getApiDomain } from "../App";
import "../App.css";

export default function Logout(props) {
    let logoutClicked = props.logoutClicked;
    let redirectToConsole = props.redirectToConsole;

    const [email, setEmail] = useState("")

    useEffect(() => {
        const getNotionKey = async () => {
            let response2 = await axios.get(getApiDomain() + "/sessioninfo");
            setEmail(response2.data.email)
            console.log('here')
            console.log(response2)
        }
        getNotionKey();
    }, []); 

    return (
        <div className="navbar">
            <div  
            style={{
                display: "flex",
                height: "40px",
                justifyContent: "flex-end",
                alignItems: "center",
                paddingRight: "75px",
                fontWeight: "bold",
                }}>
                {email}
            </div>
            <div
                style={{
                    display: "flex",
                    height: "70px",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    paddingLeft: "75px",
                    paddingRight: "75px",
                }}>
                
                <div
                    onClick={redirectToConsole}
                    style={{
                        display: "flex",
                        width: "116px",
                        height: "42px",
                        backgroundColor: "#000000",
                        borderRadius: "10px",
                        alignItems: "center",
                        cursor: "pointer",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontWeight: "bold",
                        margin: ".5%"
                    }}>
                    CONSOLE
                </div>
                    
                <div
                    onClick={logoutClicked}
                    style={{
                        display: "flex",
                        width: "116px",
                        height: "42px",
                        backgroundColor: "#000000",
                        borderRadius: "10px",
                        cursor: "pointer",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#ffffff",
                        fontWeight: "bold",
                        margin: ".5%"
                    }}>
                    SIGN OUT
                </div>
            </div>

        </div>
    );
}
