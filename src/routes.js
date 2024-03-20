import React from "react";

const EmployeeDetails = React.lazy(()=> import('./components/PageLayout'));

const routes = [
    { path: '/employee-details', exact: true, name: 'EmployeeDetails',element: EmployeeDetails},
  ]
  
export default routes;