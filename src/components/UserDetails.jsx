import { useEffect, useState } from "react";
import axios from 'axios';
import { useIsAuthenticated } from "@azure/msal-react";

const UserDetails = () => {

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

    return(
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
                    <label>Name : </label>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                      />
                      {employee.userName}
                    </a>
                  </h3>
                  
                  <p className="mt-1 text-sm text-gray-500">
                    Job Role : {employee.jobRole}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Age : {employee.age}
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
    )

}

export default UserDetails;