import React, { useState } from 'react';

import PageLayout from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';
//import PageLayout from './components/PageLayout';
import Home from './components/Home';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import './App.css';
import Button from 'react-bootstrap/Button';
import { useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';

/**
 * Renders information about the signed-in user or a button to retrieve data about the user
 */

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    const navigate = useNavigate();

    function RequestProfileData() {
        // Silently acquires an access token which is then attached to a request for MS Graph data
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                callMsGraph(response.accessToken).then((response) => setGraphData(response));
                console.log("This is the token", response.accessToken);
            });
    }

    return (
        <>
            {/* <BrowserRouter>
                <Routes>
                    <Route path="/" exact element={<Home accountName={accounts[0].name}/>} />
                    <Route path="/employee-details" element={<PageLayout />} />
                </Routes>
            </BrowserRouter> */}
            <h5 className="profileContent">Welcome {accounts[0].name}</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <Button variant="secondary" onClick={RequestProfileData}>
                    Request Profile
                </Button>
            )}
        </>
    );
};

/**
 * If a user is authenticated the ProfileContent component above is rendered. Otherwise a message indicating a user is not authenticated is rendered.
 */
const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <h5 className="card-title">Please sign-in to see your profile information.</h5>
            </UnauthenticatedTemplate>
        </div>
    );
};

export default function App() {
    return (
        <PageLayout>
            <MainContent />
        </PageLayout>
    );
}
