import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { CheckIcon} from "@heroicons/react/20/solid";

/**
 * Renders a drop down button with child buttons for logging in with a popup or redirect
 */
export const SignInButton = () => {
  const { instance } = useMsal();

  const handleLogin = () => {
    instance.loginPopup(loginRequest).catch((e) => {});
  };

  return (
    <>
      <button
        className="inline-flex items-center bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:ring-2 hover:text-gray-900 hover:ring-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        onClick={() => handleLogin()}
      >
        <CheckIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Sign In
      </button>
    </>
  );
};
