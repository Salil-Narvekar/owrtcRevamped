import React, { useContext, useEffect, useState } from 'react'
import { RolesArray, AssignmentStatusArray } from '../../App'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import StatusBar from '../StatusBar'
import ButtonPrimary from '../ButtonPrimary'
import EmployeeDetailsPlate from './EmployeeDetailsPlate'
import OverviewPlate from '../OverviewPlate'
import baseURL from '../../ApiBaseUrl/baseUrl'

const HrDashboard = () => {

    const navigate = useNavigate()
    const rolesArray = useContext(RolesArray)
    const assignmentStatusArray = useContext(AssignmentStatusArray)
    const baseUrl = baseURL

    const [employeesData, setEmployeesData] = useState([])
    const [assignmentsData, setAssignmentsData] = useState([])
    const [roleBasedEmployeesArray, setRoleBasedEmployeesArray] = useState([])
    const [selectedButtonName, setSelectedButtonName] = useState('HR')

    const [programmersArrayTB, setProgrammersArrayTB] = useState([])
    const [designersArrayTB, setDesignersArrayTB] = useState([])
    const [testersArrayTB, setTestersArrayTB] = useState([])
    const [vacantEmployees, setVacantEmployees] = useState([])
    const [assignmentStats, setAssignmentStats] = useState([])

    useEffect(() => {

        //to fetch employees data
        axios.get(`${baseUrl}/employee_Api/getEmployees/`)
            .then((res) => {
                if (res.status === 200) {

                    let data = res.data
                    setEmployeesData(data)

                } else {
                    console.log('Employee data is empty !!')
                    setEmployeesData([])
                }
            })
            .catch((error) => {
                console.log("Catch error Employee Data: ", error)
            })

        //to fetch assignments data
        axios.get(`${baseUrl}/assignment_Api/getAssignments/`)
            .then((res) => {

                if (res.status === 200) {

                    let data = res.data
                    setAssignmentsData(data)

                } else {
                    console.log('Assignment data is empty !!')
                    setEmployeesData([])
                }

            })
            .catch((error) => {
                console.log("Catch error Assignment Data: ", error)
            })

    }, [])

    useEffect(() => {

        setRoleBasedEmployeesArray(roleFilter('HR'))
        showTopThree()
        showVacantRoles()
        showAssignmentStats()

    }, [employeesData, assignmentsData])

    const roleFilter = (roleName) => {

        const roleBasedData = employeesData.filter(res => res.employee_role === roleName)
        return roleBasedData
    }

    const statusFilter = (status) => {

        const statusBasedData = assignmentsData.filter(res => res.assignment_status === status)
        return statusBasedData
    }

    const showRoleBasedEmployees = (roleName) => {
        setSelectedButtonName(roleName)
        setRoleBasedEmployeesArray(roleFilter(roleName))
    }

    const showTopThree = () => {

        let top3Designers = roleFilter('Designer').sort((a, b) => b.employee_rating - a.employee_rating).slice(0, 3)
        let top3Programmers = roleFilter('Programmer').sort((a, b) => b.employee_rating - a.employee_rating).slice(0, 3)
        let top3Testers = roleFilter('Tester').sort((a, b) => b.employee_rating - a.employee_rating).slice(0, 3)

        setDesignersArrayTB(top3Designers)
        setProgrammersArrayTB(top3Programmers)
        setTestersArrayTB(top3Testers)
    }

    const showBottomThree = () => {

        let bottom3Designers = roleFilter('Designer').sort((a, b) => a.employee_rating - b.employee_rating).slice(0, 3)
        let bottom3Programmers = roleFilter('Programmer').sort((a, b) => a.employee_rating - b.employee_rating).slice(0, 3)
        let bottom3Testers = roleFilter('Tester').sort((a, b) => a.employee_rating - b.employee_rating).slice(0, 3)

        setDesignersArrayTB(bottom3Designers)
        setProgrammersArrayTB(bottom3Programmers)
        setTestersArrayTB(bottom3Testers)
    }

    const showVacantRoles = () => {

        let vacantDesigners = roleFilter('Designer').filter(res => res.wip === 0).length
        let vacantProgrammers = roleFilter('Programmer').filter(res => res.wip === 0).length
        let vacantTesters = roleFilter('Tester').filter(res => res.wip === 0).length
        setVacantEmployees(["Designers " + vacantDesigners, "Programmers " + vacantProgrammers, "Testers " + vacantTesters])
    }

    const showAssignmentStats = () => {

        let WIPAssignments = statusFilter('WIP').length
        let notStartedAssignments = statusFilter('Not Started').length
        let completedAssignments = statusFilter('Completed').length
        setAssignmentStats(["WIP " + WIPAssignments, "Not Started " + notStartedAssignments, "Completed " + completedAssignments])
    }

    return (
        <div className='grid sm:grid-rows-12 gap-2 sm:ml-4 sm:mr-4 h-[90%]'>

            {/* Status Bar */}
            <div className='row-span-2 grid sm:grid-cols-2 justify-center justify-items-center items-center border border-slate-300 rounded-lg bg-sky-50'>
                <StatusBar barTitle='Employees' statusDataArray={employeesData} statusOf_keyName='employee_role' indexesArray={rolesArray} />
                <StatusBar barTitle='Assignments' statusDataArray={assignmentsData} statusOf_keyName='assignment_status' indexesArray={assignmentStatusArray} />
            </div>

            <div className='row-span-10 grid sm:grid-cols-6 gap-4 border border-slate-300 rounded-lg bg-sky-50 py-6 pr-4 pl-4'>

                {/* Dashboard left */}
                <div className='col-span-2 grid sm:grid-cols-11'>
                    <div className='col-span-4 grid sm:grid-flow-row gap-1 items-start self-start pr-3'>
                        {
                            rolesArray.map((role, index) => (
                                <ButtonPrimary
                                    key={index}
                                    buttonLable={role}
                                    name={role}
                                    color='sky'
                                    selectedButtonName={selectedButtonName}
                                    onClick={() => showRoleBasedEmployees(role)}
                                />
                            ))
                        }
                    </div>

                    <div className='col-span-7 '>
                        <div className='grid sm:grid-flow-row gap-1 items-start self-start max-h-96 rounded-lg border-2 border-sky-100 overflow-x-auto'>
                            {
                                roleBasedEmployeesArray.length > 0 ?
                                    roleBasedEmployeesArray.map((employee, index) => (
                                        <EmployeeDetailsPlate
                                            key={index}
                                            employeeId={employee.id}
                                            employeeName={employee.employee_name}
                                            rating={employee.employee_rating}
                                            contactNo={employee.employee_contact}
                                            email={employee.employee_email}
                                        />
                                    ))
                                    :
                                    <div className='grid gap-2 justify-items-center text-center text-xs md:text-md lg:text-lg font-semibold overflow-hidden'>
                                        <span className='text-red-600 animate-pulse'>No {selectedButtonName} employee available !! </span>
                                        <ButtonPrimary buttonLable='Register now' onClick={() => navigate('/employeeForm')} />
                                    </div>
                            }
                        </div>
                        <div className='grid justify-start items-start text-xs md:text-sm lg:text-md font-semibold w-full mt-2 text-slate-700'> Total {selectedButtonName} Employees: {roleBasedEmployeesArray.length} </div>
                    </div>
                </div>

                {/* Dashboard right */}
                <div className='col-span-4 sm:grid grid-rows-2'>
                    <OverviewPlate
                        OverviewTitle='Performers'
                        buttonLabel1='Top 3'
                        buttonLabel2='Bottom 3'
                        overViewListTitlesArray={rolesArray.slice(2,)}
                        buttonsRequired={true}
                        releaseButtonRequired={false}
                        ratingRequired={true}
                        listA={designersArrayTB}
                        listB={programmersArrayTB}
                        listC={testersArrayTB}
                        onbuttonClickA={() => showTopThree()}
                        onbuttonClickB={() => showBottomThree()}
                    />

                    <OverviewPlate
                        OverviewTitle='Company Overview'
                        overViewListTitlesArray={['Vacant employees (role based)', 'All assignments data', 'Hire more...']}
                        buttonsRequired={false}
                        releaseButtonRequired={false}
                        ratingRequired={false}
                        listA={vacantEmployees}
                        listB={assignmentStats}
                        listC={[]}
                    />
                </div>
            </div>
        </div>
    )
}

export default HrDashboard