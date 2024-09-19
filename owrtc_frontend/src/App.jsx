import React, { createContext } from 'react'
import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import Login from "./Pages/Login"
import NavBar from "./Components/Navbar/NavBar"
import Protected from './Protected/Protected'
import Dashboard from "./Pages/Dashboard"
import EmployeeForm from "./Pages/EmployeeForm"
import AssignmentForm from './Pages/AssignmentForm'
import PageNotFound404 from './Pages/PageNotFound404'

export const RolesArray = createContext()
export const AssignmentStatusArray = createContext()

function App() {
  const rolesArray = ["HR", "Project Manager", "Designer", "Programmer", "Tester"]
  const assignmentStatusArray = ["Completed", "WIP", "Not Started"]

  return (
    <RolesArray.Provider value={rolesArray}>
      <AssignmentStatusArray.Provider value={assignmentStatusArray}>

        <div className='md:h-screen lg:h-fit xl:h-screen font-sans bg-sky-100 xl:overflow-hidden'>
          <HashRouter>
            <NavBar />
            <Routes>
              <Route path="/" element={<Navigate to='/dashboard' />} />
              <Route path='/login' element={<Login />} />
              <Route path="/dashboard" element={<Protected component={<Dashboard />} />} />
              <Route path="/employeeForm/" element={<Protected component={<EmployeeForm />} />} />
              <Route path="/employeeForm/:employeeId" element={<Protected component={<EmployeeForm />} />} />
              <Route path="/assignmentForm/" element={<Protected component={<AssignmentForm />} />} />
              <Route path="/assignmentForm/:assignmentId" element={<Protected component={<AssignmentForm />} />} />
              <Route path="/*" element={<PageNotFound404 />} />
            </Routes>
          </HashRouter>
        </div>
        
      </AssignmentStatusArray.Provider>
    </RolesArray.Provider>
  )
}

export default App
