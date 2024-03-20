import React from "react"
import { useNavigate } from 'react-router-dom';


const Home = (props) => {
    const navigate = useNavigate();


    return(
        <>
        <h5 className="profileContent">
        Welcome {props.accountName}
        </h5>
        <button onClick={()=>{navigate('/employee-details')}}>
            get Employee
        </button>
        </>
    )
}

export default Home