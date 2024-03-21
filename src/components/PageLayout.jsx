import React from "react";
// import Navbar from "react-bootstrap/Navbar";
import { useIsAuthenticated } from "@azure/msal-react";
import Navigation from "./Navigation";
import { useEffect, useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const products = [
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 1,
    name: "Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
];

/**
 * Renders the navbar component with a sign-in or sign-out button depending on whether or not a user is authenticated
 * @param props
 */
export const PageLayout = (props) => {
  const isAuthenticated = useIsAuthenticated();
  const [employeeDetails, setEmployeeDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [initialRun,setInitiaRun] = useState(true);

  //const accessToken = sessionStorage.getItem()
  console.log("Hello");

  const openModal = () => {
    setShowModal(true);
    setInput1('');
    setInput2('');
    setInput3('');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform any submission logic here
    // For demo, we'll just log the input values
    console.log("Input 1:", );
   
    // Close modal after submission

    const accessToken = sessionStorage.getItem('accessToken')
    axios
      .post('http://localhost:5190/api/User', {
        id: 0,
        userName: input1,
        jobRole: input2,
        age: input3
      },{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        console.log(res);
        //const accessToken = sessionStorage.getItem('accessToken')
        console.log("TToken",accessToken);
        axios
          .get('http://localhost:5190/api/User', {
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then((res) => {
            console.log("Response", res);
            setEmployeeDetails(res.data)

          })
          .catch((err) => {
            console.log(err)
          })

      })
      .catch((err) => {
        console.log(err)
      })

    closeModal();
  };

  useEffect(() => {

    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSIsImtpZCI6IlhSdmtvOFA3QTNVYVdTblU3Yk05blQwTWpoQSJ9.eyJhdWQiOiJhcGk6Ly80NjdlZGU1OS02MDM5LTQyZDctYTNiMi1kM2NmOGYzNTBlNjIiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC84Y2NhMDRhMi04NDZkLTQ1Y2UtYWZmZS0wM2IxNGFkZWZmNzkvIiwiaWF0IjoxNzExMDIxMjc1LCJuYmYiOjE3MTEwMjEyNzUsImV4cCI6MTcxMTAyNjQ2NiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhXQUFBQWs2NGNGYi9UUWJDclRvMytZOTN3WU9zbkg0S01wc05JZER2SmVPWWV3YlBwdFdOdXdqRGNCMGtLMFZpSVVmYkMiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiNDY3ZWRlNTktNjAzOS00MmQ3LWEzYjItZDNjZjhmMzUwZTYyIiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJhZGh1c2hhbiIsImdpdmVuX25hbWUiOiJJc3VydSIsImlwYWRkciI6IjEyNC40My4xOS4yNiIsIm5hbWUiOiJJc3VydSBNYWRodXNoYW4iLCJvaWQiOiJlMzJiNDBmMC1iOWRhLTQ3ZjktYjMwNi01ZjhkYzc2MmNjNGUiLCJyaCI6IjAuQVNzQW9nVEtqRzJFemtXdl9nT3hTdDdfZVZuZWZrWTVZTmRDbzdMVHo0ODFEbUxDQU1VLiIsInNjcCI6IlNjb3BlLnJlYWQiLCJzdWIiOiJRTnB4UGlTRkVyZkpxNEVBT0FpNGtpSnlfVjJsZnBrSHpMeDcwY3B5WUxnIiwidGlkIjoiOGNjYTA0YTItODQ2ZC00NWNlLWFmZmUtMDNiMTRhZGVmZjc5IiwidW5pcXVlX25hbWUiOiJpc3VydUBBcGVib2RpbWEub25taWNyb3NvZnQuY29tIiwidXBuIjoiaXN1cnVAQXBlYm9kaW1hLm9ubWljcm9zb2Z0LmNvbSIsInV0aSI6InBFZ3FKNUpKQTB1R2diU3NxVjZPQUEiLCJ2ZXIiOiIxLjAifQ.OcAcHA6rhUsREnEQzrskkJKjT8iqDSH7fa-DNcO7VfvVQRHGHSjqYhwI_QSpkIU2oG_m4DlZKORP4gBAg4Vhu9KILsaVpE2D4cqG8bnnw9HyCoC7kZ02DeR8dlS0uvFf0-8xV3lTGFY3K3zQ_uE8x_jr0PVh3a2M2uikvbDf5UXBeaBArm62vrVoV1pkSW2rC8rjfpmn84wc4X52_2ZJVGmIle_zqAIAFV26f0Hva5j_bCZRCBChU3V2lZAP7dqgRkPH3qEUd23LdJsyHO3tbuswHF8Pu3CkEfq5ExCw7JpWUQPIrxDKTn5CocYoF9crCIlyBur7q8ByZHFvKE4ewA"


    const accessToken = sessionStorage.getItem('accessToken')
    console.log("Header Token", accessToken);
    console.log("bird");
    axios
      .get('http://localhost:5190/api/User', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then((res) => {
        console.log("Response", res);
        setEmployeeDetails(res.data)

      })
      .catch((err) => {
        console.log(err)
      })
  },[])

  

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <Navigation />
          {props.children}
        </div>
      </div>

    </>
  );
};
