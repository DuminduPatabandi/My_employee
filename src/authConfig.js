import { LogLevel } from "@azure/msal-browser";

export const msalConfig = {
    auth: {
        clientId: "61ce46dc-9a0b-4383-b1c9-a98876061159",
        authority: "https://login.microsoftonline.com/8cca04a2-846d-45ce-affe-03b14adeff79",
        redirectUri: "http://localhost:3000",
    },
    // auth: {
    //     clientId: "467ede59-6039-42d7-a3b2-d3cf8f350e62",
    //     authority: "https://login.microsoftonline.com/8cca04a2-846d-45ce-affe-03b14adeff79",
    //     redirectUri: "http://localhost:3000",
    // },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {	
        loggerOptions: {	
            loggerCallback: (level, message, containsPii) => {	
                if (containsPii) {		
                    return;		
                }		
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        return;
                    case LogLevel.Info:
                        console.info(message);
                        return;
                    case LogLevel.Verbose:
                        console.debug(message);
                        return;
                    case LogLevel.Warning:
                        console.warn(message);
                        return;
                    default:
                        return;
                }	
            }	
        }	
    }
};

/**
 * Scopes you add here will be prompted for user consent during sign-in.
 * By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
 * For more information about OIDC scopes, visit: 
 * https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
 */
export const loginRequestV2 = {
    //scopes: ["User.Read"]
    scopes :["api://467ede59-6039-42d7-a3b2-d3cf8f350e62/Scope.read"]
};

export const loginRequestV1 = {
    scopes: ["User.Read"]
    //scopes :["api://467ede59-6039-42d7-a3b2-d3cf8f350e62/Scope.read"]
};

/**
 * Add here the scopes to request when obtaining an access token for MS Graph API. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
