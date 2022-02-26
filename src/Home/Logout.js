import axios from "axios";
import React, { useState, useEffect } from 'react';
import { getApiDomain } from "../App";


export default function Logout(props) {
    let logoutClicked = props.logoutClicked;

    const [email, setEmail] = useState("")

    useEffect(() => {
        const getEmail = async () => {
            let response2 = await axios.get(getApiDomain() + "/sessioninfo");
            setEmail(response2.data.email)
            // console.log('here')
            // console.log(response2)
        }
        getEmail();
    }, []); 

    return (
        <div >
            <div
            style={{
                display: "flex",
                height: "40px",
                alignItems: "center",
                justifyContent: "flex-end",
                // paddingLeft: "75px",
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
                    }}>
                    SIGN OUT
                </div>
            </div>
        </div>
    );
}
