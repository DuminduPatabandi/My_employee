import { useState,useEffect } from 'react';

import { PageLayout } from './components/PageLayout';
import { loginRequest } from './authConfig';
import { callMsGraph } from './graph';
import { ProfileData } from './components/ProfileData';

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import './App.css';
import Unauthenticated from './components/Unauthenticated';

const ProfileContent = () => {
    const { instance, accounts } = useMsal();
    const [graphData, setGraphData] = useState(null);

    useEffect(()=>{
        console.log("run");
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                sessionStorage.setItem('accessToken',response.accessToken);
                console.log("ZIM",response.accessToken);
            })
            .catch(()=>{
                sessionStorage.setItem('accessToken',null);
            });
        
    },[])

    function RequestProfileData() {
        instance
            .acquireTokenSilent({
                ...loginRequest,
                account: accounts[0],
            })
            .then((response) => {
                console.log("Token TOken",response.accessToken);
                callMsGraph(response.accessToken).then((response) => setGraphData(response));

            });
    }

    return (
        <>
            <p className="text-[6rem] font-bold tracking-tight text-gray-900 mt-12">Hi</p>
            <h5 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl -mt-8 mb-4">{accounts[0].name}</h5>
            {graphData ? (
                <ProfileData graphData={graphData} />
            ) : (
                <button className='text-gray-900 mt-2 duration-700 hover:bg-gray-900 hover:text-white py-2 px-4 ring-1 ring-gray-900 rounded-full' onClick={RequestProfileData}>
                    Request Profile
                </button>
            )}
        </>
    );
};


const MainContent = () => {
    return (
        <div className="App">
            <AuthenticatedTemplate>
                <ProfileContent />
            </AuthenticatedTemplate>

            <UnauthenticatedTemplate>
                <Unauthenticated />
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
