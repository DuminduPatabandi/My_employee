import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import logo from "../logo.png";

export default function Navigation() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="min-w-0 flex-2">
        <div className="flex">
          <img className="w-12 h-12 mr-4" src={logo} alt="applogo" />
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Unicorn App
          </h2>
        </div>
      </div>
      <div className="mt-5 flex lg:ml-4 lg:mt-0">
        <span className="sm:ml-3">
          <div className="">
            {isAuthenticated ? <SignOutButton /> : <SignInButton />}
          </div>
        </span>
      </div>
    </div>
  );
}
