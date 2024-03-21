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

  //const accessToken = sessionStorage.getItem()

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
    console.log("Input 1:", input1);
    console.log("Input 2:", input2);
    // Close modal after submission
    axios
      .post('http://localhost:5190/api/User', {
        id: 0,
        userName: input1,
        jobRole: input2,
        age: input3
      })
      .then((res) => {
        console.log(res);
        const accessToken = sessionStorage.getItem('accessToken')
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
    const accessToken = sessionStorage.getItem('accessToken')
    console.log("Header Token", accessToken);
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
  }, [])

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4  sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
          <Navigation />
          {props.children}
          {isAuthenticated ? (
            <>
              <div className="flex items-center mt-16 justify-between">
                <p className="text-2xl font-bold tracking-tight text-gray-900">
                  Employee Details
                </p>
                <button
                  className="text-gray-900 duration-700 py-2 hover:bg-gray-900 hover:text-white px-4 ring-1 ring-gray-900 font-medium"
                  onClick={openModal}
                >
                  Add Employees
                </button>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                {employeeDetails.map((employee) => (
                  <div key={employee.id} className="group relative">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                      <img
                        src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                        alt="Front of men's Basic Tee in black."
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="mt-4 flex justify-between">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <a href="#">
                            <span
                              aria-hidden="true"
                              className="absolute inset-0"
                            />
                            {employee.userName}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {employee.jobRole}
                        </p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">
                        {employee.age}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                {showModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-80">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Modal Title</h2>
                        <button className="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={closeModal}>
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                        </button>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label htmlFor="input1" className="block text-gray-700 text-sm font-bold mb-2">User Name:</label>
                          <input className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-indigo-500" type="text" id="input1" placeholder="Enter Name" value={input1} onChange={(e) => setInput1(e.target.value)} />
                        </div>
                        <div className="mb-6">
                          <label htmlFor="input2" className="block text-gray-700 text-sm font-bold mb-2">Job Role:</label>
                          <input className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-indigo-500" type="text" id="input2" placeholder="Enter Job Role" value={input2} onChange={(e) => setInput2(e.target.value)} />
                        </div>
                        <div className="mb-6">
                          <label htmlFor="input2" className="block text-gray-700 text-sm font-bold mb-2">Age: </label>
                          <input className="w-full border rounded px-3 py-2 text-gray-700 focus:outline-none focus:border-indigo-500" type="text" id="input2" placeholder="Enter Age" value={input3} onChange={(e) => setInput3(e.target.value)} />
                        </div>
                        <div className="flex justify-end">
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Submit</button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>

            </>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"></div>
            </>
          )}
        </div>
      </div>

    </>
  );
};
