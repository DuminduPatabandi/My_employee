import React from "react";
import { useMsal } from "@azure/msal-react";
import { PowerIcon } from "@heroicons/react/20/solid";

export const SignOutButton = () => {
  const { instance } = useMsal();

  const handleLogout = () => {
    sessionStorage.setItem('accessToken',null);
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/",
    });
  };

  return (
    <>
      <button
        className="inline-flex items-center bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white hover:ring-2 hover:text-gray-900 hover:ring-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
        onClick={() => handleLogout()}
      >
        <PowerIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
        Sign Out
      </button>
    </>
    ) 
};
