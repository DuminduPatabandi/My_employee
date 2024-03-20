import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = () => {
            instance.loginPopup(loginRequest).catch(e => {
            });
    }

    return (
        <button onClick={() => handleLogin()}>
            Sign In
        </button>
    )
}
