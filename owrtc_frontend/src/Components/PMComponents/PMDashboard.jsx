import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RolesArray, AssignmentStatusArray } from '../../App'
import ButtonPrimary from '../ButtonPrimary'
import StatusBar from '../StatusBar'
import OverviewPlate from '../OverviewPlate'
import AssignmentPlate from './AssignmentPlate'
import axios from 'axios'
import baseURL from '../../ApiBaseUrl/baseUrl'

const PMDashboard = () => {

  const baseUrl = baseURL
  const navigate = useNavigate()

  const rolesArray = useContext(RolesArray)
  const assignmentStatusArray = useContext(AssignmentStatusArray)

  const [assignmentsData, setAssignmentsData] = useState([])
  const [employeesData, setEmployeesData] = useState([])
  const [statusBasedAssignments, setStatusBasedAssignments] = useState([])
  const [selectedButtonName, setSelectedButtonName] = useState('WIP')

  const [overViewTitle, setOverViewTitle] = useState('')
  const [assignmentDetails, setAssignmentDetails] = useState({})
  const [designersTeam, setDesignersTeam] = useState([])
  const [programmersTeam, setProgrammersTeam] = useState([])
  const [testersTeam, setTestersTeam] = useState([])

  useEffect(() => {

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
        console.log("Catch error: ", error)
      })

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

  }, [])

  useEffect(() => {
    setStatusBasedAssignments(statusFilter('WIP'))
  }, [assignmentsData])

  const statusFilter = (status) => {
    const statusBasedData = assignmentsData.filter(res => res.assignment_status === status)
    return statusBasedData
  }

  const showStatusBasedAssignment = (status) => {

    setStatusBasedAssignments(statusFilter(status))
    setSelectedButtonName(status)
  }

  const showTeam = (assignmentDetails, team, assignmentTitle) => {

    // console.log('Show Team', team)
    let teamDesigners = team.Designers.map(res => employeesData.find(employee => employee.employee_name === res))
    let teamProgrammers = team.Programmers.map(res => employeesData.find(employee => employee.employee_name === res))
    let teamTesters = team.Testers.map(res => employeesData.find(employee => employee.employee_name === res))

    setDesignersTeam(teamDesigners)
    setProgrammersTeam(teamProgrammers)
    setTestersTeam(teamTesters)

    setOverViewTitle(assignmentTitle)
    setAssignmentDetails(assignmentDetails)
  }

  return (
    <div className='grid sm:grid-rows-12 gap-2 sm:ml-4 sm:mr-4 h-[90%]'>

      {/* Status Bar */}
      <div className='row-span-2 grid sm:grid-cols-2 justify-center justify-items-center items-center border border-slate-300 rounded-lg bg-sky-50'>
        <StatusBar barTitle='Assignments' statusDataArray={assignmentsData} statusOf_keyName='assignment_status' indexesArray={assignmentStatusArray} />
      </div>

      <div className='row-span-10 grid sm:grid-cols-6 gap-4 border border-slate-300 rounded-lg bg-sky-50 py-6 pr-4 pl-4'>

        {/* Dashboard left */}
        <div className='col-span-2 grid sm:grid-rows-10 justify-items-center'>
          <div className='row-span-1 grid grid-flow-col gap-1.5 justify-center items-start'>
            {
              assignmentStatusArray.map((status, index) => (
                <ButtonPrimary
                  key={index}
                  buttonLable={status}
                  name={status}
                  color='sky'
                  selectedButtonName={selectedButtonName}
                  onClick={() => showStatusBasedAssignment(status)}
                />
              ))
            }
          </div>

          <div className='row-span-9 grid grid-rows-10 justify-items-center w-full'>
            <div className='row-span-1 grid justify-center items-center text-xs md:text-sm lg:text-md font-semibold text-slate-700 w-full'> Total {selectedButtonName} Assignments: {statusBasedAssignments.length} </div>
            <div className='row-span-9 grid sm:grid-flow-row gap-1 justify-items-streatch items-start self-start max-h-96 rounded-lg border-2 border-sky-100 w-full overflow-x-auto'>
              {
                statusBasedAssignments.length > 0 ?
                  statusBasedAssignments.map((assignment, index) => (
                    <AssignmentPlate
                      key={index}
                      assignmentId={assignment.id}
                      assignmentTitle={assignment.assignment_title}
                      assignmentType={assignment.assignment_type}
                      creationDate={assignment.creation_date}
                      startingDate={assignment.starting_date}
                      deadlineDate={assignment.deadline_date}
                      onShowTeamClick={() => showTeam(assignment, assignment.assignment_team, assignment.assignment_title)}
                    />
                  ))
                  :
                  <div className='grid gap-2 justify-items-center text-center text-xs md:text-md lg:text-lg font-semibold overflow-hidden'>
                    <span className='text-red-600 animate-pulse'>No {selectedButtonName} Assignment available !! </span>
                    
                    {
                      selectedButtonName !== 'Completed' &&
                      <ButtonPrimary buttonLable='Assign now' onClick={() => navigate('/assignmentForm')} />
                    }
                  </div>
              }
            </div>
          </div>
        </div>

        {/* Dashboard right */}
        <div className='col-span-4'>
          <OverviewPlate
            OverviewTitle={overViewTitle ? overViewTitle : "Click on 'Show Team' button to display team below"}
            overViewListTitlesArray={rolesArray.slice(2,)}
            buttonsRequired={false}
            releaseButtonRequired={true}
            ratingRequired={true}
            listA={designersTeam}
            listB={programmersTeam}
            listC={testersTeam}
            assignmentDetails={assignmentDetails}
          />
        </div>
      </div>
    </div>
  )
}

export default PMDashboard