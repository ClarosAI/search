import { useState } from "react";
import "./App.css";
import SuperTokens, { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import Session from "supertokens-auth-react/recipe/session";
import Home from "./Home";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./Footer";
import SessionExpiredPopup from "./SessionExpiredPopup";

export function getApiDomain() {
    const apiPort = process.env.REACT_APP_API_PORT || 3001;
    const apiUrl = process.env.REACT_APP_API_URL || `http://localhost:${apiPort}`;
    return apiUrl;
}

export function getWebsiteDomain() {
    const websitePort = process.env.REACT_APP_WEBSITE_PORT || 3000;
    const websiteUrl = process.env.REACT_APP_WEBSITE_URL || `http://localhost:${websitePort}`;
    return websiteUrl;
}

SuperTokens.init({
    appInfo: {
        appName: "Search", // TODO: Your app name
        apiBasePath: "api/v3/auth",
        websiteBasePath: "auth",
        apiDomain: "https://console.diva.so",
        websiteDomain: "localhost:3000"
        // apiDomain: getApiDomain(), // TODO: Change to your app's API domain
        // websiteDomain: getWebsiteDomain(), // TODO: Change to your app's website domain
    },
    recipeList: [
        EmailPassword.init({
            emailVerificationFeature: {
                mode: "REQUIRED",
            },
            getRedirectionURL: async (context) => {
                if (context.action === "RESET_PASSWORD") {
                    // called when the user clicked on the forgot password button
                } else if (context.action === "SIGN_IN_AND_UP") {
                    // called when the user is navigating to sign in / up page
                } else if (context.action === "SUCCESS") {
                    // called on a successful sign in / up. Where should the user go next?
                    let redirectToPath = context.redirectToPath;
                    if (redirectToPath !== undefined) {
                        // we are navigating back to where the user was before they authenticated
                        return redirectToPath;
                    }
                    if (context.isNewUser) {
                        // user signed up
                        return "/onboarding"
                    } else {
                        // user signed in
                        return "/dashboard"
                    }
                } else if (context.action === "VERIFY_EMAIL") {
                    // called when the user is to be shown the verify email screen
                }
                // return undefined to let the default behaviour play out
                return undefined;
            } 
        }),
        Session.init(),
    ],
});

function App() {
    let [showSessionExpiredPopup, updateShowSessionExpiredPopup] = useState(false);

    return (
        <div className="App">
            <Router>
                <div className="fill">
                    <Routes>
                        {/* This shows the login UI on "/auth" route */}
                        {getSuperTokensRoutesForReactRouterDom(require("react-router-dom"))}

                        <Route
                            path="/"
                            element={
                                /* This protects the "/" route so that it shows 
                                <Home /> only if the user is logged in.
                                Else it redirects the user to "/auth" */
                                <EmailPassword.EmailPasswordAuth
                                    onSessionExpired={() => {
                                        updateShowSessionExpiredPopup(true);
                                    }}>
                                        <>
                                            <Home />
                                            {showSessionExpiredPopup && <SessionExpiredPopup />}
                                        </>
                                </EmailPassword.EmailPasswordAuth>
                            }
                        />
                    </Routes>
                </div>
                {/* <Footer /> */}
            </Router>
        </div>
    );
}

export default App;
