import logo from './logo.svg';
import React, { useEffect } from 'react';
//import './App.css';
//import Login from './views/login';
import PageLayout from './components/PageLayout';
import Home from './components/Home';
import { Button } from 'react-bootstrap';
import { useNavigate, Route, Routes} from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
function App() {

    // useEffect(()=>{
    //     const navigate = useNavigate();
    //     navigate('/')
    // },[])

  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" exact element={<Home/>} /> 
        <Route path="/employee-details" element={<PageLayout/>} />
    </Routes>
    </BrowserRouter>
    // <>
    //     <Home/>
    // </>
    
    
  );
}

export default App;
