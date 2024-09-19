import React from 'react'
import HrDashboard from '../Components/HRComponents/HrDashboard'
import PMDashboard from '../Components/PMComponents/PMDashboard'

const Dashboard = () => {

    const loggedUserJSON = localStorage.getItem('loggedIn_UserDetails')
    const loggedUser = JSON.parse(loggedUserJSON)
    
    return (
        <>
            {
                loggedUser && loggedUser.employee_role === 'HR' ?

                    <HrDashboard />

                    : loggedUser && loggedUser.employee_role === 'Project Manager' &&

                    <PMDashboard />
            }
        </>
    )
}

export default Dashboard