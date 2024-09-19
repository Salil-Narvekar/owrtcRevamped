import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { RolesArray } from '../App'
import axios from 'axios';
import baseURL from '../ApiBaseUrl/baseUrl';
import InputField from '../Components/InputField'
import ButtonPrimary from '../Components/ButtonPrimary'
import Loader from '../Components/Loader';
import RadioButton from '../Components/RadioButton';

const AssignmentForm = () => {

  const { assignmentId } = useParams();
  const navigate = useNavigate()
  const rolesArray = useContext(RolesArray);
  const baseUrl = baseURL

  const loggedUserJSON = localStorage.getItem('loggedIn_UserDetails')
  const loggedUser = JSON.parse(loggedUserJSON)

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${year}-${month}-${day}`;
  };

  const [assignmentDetails, setAssignmentDetails] = useState({
    assignment_title: '',
    assignment_type: 'New',
    assignment_status: 'Not Started',
    creation_date: formatDate(Date()),
    starting_date: '',
    deadline_date: '',
    assignment_team: {
      Designers: [],
      Programmers: [],
      Testers: []
    },
    assignment_project_manager: loggedUser.employee_name
  })
  // console.log(assignmentDetails)

  const [employeesData, setEmployeesData] = useState([])
  const [loader, setLoader] = useState(false)
  const [assignTeamLoader, setTeamLoader] = useState(false)
  const [validFlag, setValidFlag] = useState(null)

  const [autoAssignValidationMsg, setAutoAssignValidationMsg] = useState('')
  const [designersCount, setDesignersCount] = useState('')
  const [programmersCount, setProgrammersCount] = useState('')
  const [testersCount, setTestersCount] = useState('')
  // console.log(designersCount, programmersCount, testersCount)

  useEffect(() => {

    axios.get(`${baseUrl}/employee_Api/getEmployees/`)
      .then((res) => {

        if (res.status === 200) {

          let data = res.data
          setEmployeesData(data)

        } else {

          setEmployeesData([])
          console.log('Employee data is empty !!')
          setTeamLoader(false)
        }
      })
      .catch((error) => {
        console.log('Catch error: ', error)
      })

  }, [])

  useEffect(() => {

    if (assignmentId) {

      setLoader(true)

      axios.get(`${baseUrl}/assignment_Api/getAssignments/${assignmentId}/`)
        .then((res) => {
          if (res.status === 200) {

            let data = res.data

            setAssignmentDetails({
              assignment_title: data.assignment_title,
              assignment_type: data.assignment_type,
              assignment_status: data.assignment_status,
              creation_date: data.creation_date,
              starting_date: data.starting_date,
              deadline_date: data.deadline_date,
              assignment_team: data.assignment_team,
              assignment_project_manager: data.assignment_project_manager
            })

            setLoader(false)

          } else {
            console.log(`Assignment with id ${assignmentId} does not exist !!`)
            setLoader(false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

  }, [assignmentId])

  const checkNumber = (number, role) => {

    let num = parseInt(number)

    if (num > 3 || num < 0 || num > 3 || isNaN(num)) {

      role === 'Designer' ? setDesignersCount('') : role === 'Programmer' ? setProgrammersCount('') : role === 'Tester' && setTestersCount('')
      setAutoAssignValidationMsg('Invalid entry, enter a number between 0 to 3 (0 if no employee required)')

    } else {
      role === 'Designer' ? setDesignersCount(num) : role === 'Programmer' ? setProgrammersCount(num) : role === 'Tester' && setTestersCount(num)
      setAutoAssignValidationMsg('')
    }
  }

  const autoAssignTeam = () => {

    setTeamLoader(true)

    if (designersCount === '' || programmersCount === '' || testersCount === '') {
      setTeamLoader(false)
      setAutoAssignValidationMsg('Count for each role required (as per the team requirments)')

    } else {

      // Sorting (in decending rating)- Filtering (filter acc. to WIP)
      let sortEmployeeData = employeesData.sort((a, b) => (b.employee_rating - a.employee_rating)).filter(res => res.wip < 3)

      // Filtering - Slicing (acc. to count number) - Mapping (to display employee name) the sorted array wrt each role 
      let filterDesignerEmployees = sortEmployeeData.filter(res => res.employee_role === 'Designer').slice(0, designersCount).map(res => res.employee_name)
      let filterProgrammerEmployees = sortEmployeeData.filter(res => res.employee_role === 'Programmer').slice(0, programmersCount).map(res => res.employee_name)
      let filterTesterEmployees = sortEmployeeData.filter(res => res.employee_role === 'Tester').slice(0, testersCount).map(res => res.employee_name)

      setTimeout(() => {

        setAssignmentDetails({
          ...assignmentDetails,
          assignment_team: {
            Designers: filterDesignerEmployees,
            Programmers: filterProgrammerEmployees,
            Testers: filterTesterEmployees,
          }
        })

        setTeamLoader(false)
        setAutoAssignValidationMsg('')

      }, 500)
    }
  }

  const updateWIP = (id, WIP) => {
    // console.log(id, WIP)

    let updatedWipValue = WIP + 1

    const updatedWIP = {
      wip: updatedWipValue
    }

    axios.put(`/employee_Api/updateEmployee/${id}`, updatedWIP)
      .then((res) => {

        if (res.status === 201) {
          console.log('WIP updated successfully')
        } else {
          console.log('WIP updation failed')
        }

      })
      .catch((error) => {
        console.log('Catch error: ', error)
      })
  }

  // function to filter the employee name & mapped the details - id & WIP to a function updating WIP  
  const fetchEmployeeWIPandID = (designers, programmers, testers) => {

    // console.log(designers, programmers, testers)
    let designersDetails = designers.map(res => employeesData.find(employee => employee.employee_name === res)).map(details => updateWIP(details.id, details.wip))
    let programmersDetails = programmers.map(res => employeesData.find(employee => employee.employee_name === res)).map(details => updateWIP(details.id, details.wip))
    let testersDetails = testers.map(res => employeesData.find(employee => employee.employee_name === res)).map(details => updateWIP(details.id, details.wip))
  }

  const assign = (action) => {

    setLoader(true)

    if (
      !assignmentDetails.assignment_title ||
      !assignmentDetails.assignment_type ||
      !assignmentDetails.assignment_status ||
      !assignmentDetails.creation_date ||
      !assignmentDetails.starting_date ||
      !assignmentDetails.deadline_date ||
      (designersCount === '' && !assignmentId) || (programmersCount === '' && !assignmentId) || (testersCount === '' && !assignmentId)
    ) {

      setValidFlag(false)
      setLoader(false)

      designersCount === '' || programmersCount === '' || testersCount === '' ? setAutoAssignValidationMsg('Count for each role required (as per the team requirments)') : setAutoAssignValidationMsg('')

    } else {

      if (action === 'add') {

        axios.post(`${baseUrl}/assignment_Api/assignAssignment/`, assignmentDetails)
          .then((res) => {

            if (res.status === 201) {

              fetchEmployeeWIPandID(assignmentDetails.assignment_team.Designers, assignmentDetails.assignment_team.Programmers, assignmentDetails.assignment_team.Testers)
              console.log('Assignment assigned successfully with details: ', res.data)
              setLoader(false)
              setValidFlag(null)
              setAutoAssignValidationMsg('')
              navigate("/dashboard");

            } else {
              setLoader(false)
              console.log('Assignment not assigned, something went wrong !! ')
            }

          })
          .catch((error) => {
            console.log('Catch error: ', error)
          })

      } else if (action === 'update') {

        axios.put(`/assignment_Api/updateAssignment/${assignmentId}/`, assignmentDetails)
          .then((res) => {

            if (res.status === 201) {

              console.log('Assignment updated successfully with details: ', res.data)
              setLoader(false)
              setValidFlag(null)
              setAutoAssignValidationMsg('')
              navigate("/dashboard");

            } else {
              setLoader(true)
              console.log('Assignment not updated, something went wrong !! ')
            }

          })
          .catch((error) => {
            console.log(error)
          })

      }
    }
  }

  return (
    <div className='grid gap-12 justify-items-center items-start border border-slate-300 rounded-lg bg-sky-50 text-gray-500 py-10 pl-10 pr-10 sm:ml-4 sm:mr-4'>
      <div className='grid sm:grid-cols-3 gap-8 col-span-3 w-full'>
        <InputField
          label="Assignment title"
          name='assignment_title'
          id='assignment_title'
          type='text'
          placeholder='Enter assignment title'
          onChange={(e) => setAssignmentDetails({
            ...assignmentDetails,
            assignment_title: e.target.value
          })}
          value={assignmentDetails.assignment_title}
          valid={!assignmentDetails.assignment_title && validFlag === false ? false : true}
          validationMessage='assignment title required'
        />

        <div className='text-sm md:text-md lg:text-lg text-left text-gray-700 font-bold'>
          <div>Assignment Type: </div>

          <div className='grid grid-flow-col gap-8 justify-items-start justify-start items-center'>
            <RadioButton
              label='New'
              name='assignment_type'
              value='New'
              checked={assignmentDetails.assignment_type === 'New' ? true : false}
              onChange={(e) => setAssignmentDetails({
                ...assignmentDetails,
                assignment_type: e.target.value
              })}
            />

            <RadioButton
              label='Changes'
              name='assignment_type'
              value='Changes'
              checked={assignmentDetails.assignment_type === 'Changes' ? true : false}
              onChange={(e) => setAssignmentDetails({
                ...assignmentDetails,
                assignment_type: e.target.value
              })}
            />

          </div>
        </div>

        <div className='text-sm md:text-md lg:text-lg text-left text-gray-700 font-bold'>
          <div>Assignment Status: <span className='text-red-500 text-sm'>{!assignmentId && '(will be set sccording to the Starting date)'}</span> </div>

          {
            assignmentId ?
              <div className='grid grid-flow-col gap-8 justify-items-start justify-start items-center'>
                <RadioButton
                  label='Not Started'
                  name='assignment_status'
                  value='Not Started'
                  checked={assignmentDetails.assignment_status === 'Not Started' ? true : false}
                  onChange={(e) => setAssignmentDetails({
                    ...assignmentDetails,
                    assignment_status: e.target.value
                  })}
                  disabled={!assignmentId ? true : false}
                />

                <RadioButton
                  label='WIP'
                  name='assignment_status'
                  value='WIP'
                  checked={assignmentDetails.assignment_status === 'WIP' ? true : false}
                  onChange={(e) => setAssignmentDetails({
                    ...assignmentDetails,
                    assignment_status: e.target.value
                  })}
                  disabled={!assignmentId && true}
                />

                <RadioButton
                  label='Completed'
                  name='assignment_status'
                  value='Completed'
                  checked={assignmentDetails.assignment_status === 'Completed' ? true : false}
                  onChange={(e) => setAssignmentDetails({
                    ...assignmentDetails,
                    assignment_status: e.target.value
                  })}
                  disabled={!assignmentId && true}
                />

              </div>
              :
              <div className='text-sky-600'>{assignmentDetails.assignment_status}</div>
          }

        </div>

        <InputField
          label="Creation date"
          name='creation_date'
          id='creation_date'
          type='date'
          placeholder='Enter assignment creation date'
          onChange={(e) => setAssignmentDetails({
            ...assignmentDetails,
            creation_date: e.target.value,
            starting_date: '',
            deadline_date: ''
          })}
          value={assignmentDetails.creation_date}
          disabled={true}
          valid={!assignmentDetails.creation_date && validFlag === false ? false : true}
          validationMessage='creation date required'
        />

        <InputField
          label="Starting date"
          name='starting_date'
          id='starting_date'
          type='date'
          placeholder='Enter assignment starting date'
          onChange={(e) => setAssignmentDetails({
            ...assignmentDetails,
            starting_date: e.target.value,
            assignment_status: e.target.value === assignmentDetails.creation_date ? 'WIP' : 'Not Started',
            deadline_date: ''
          })}
          value={assignmentDetails.starting_date}
          min={assignmentDetails.creation_date}
          valid={!assignmentDetails.starting_date && validFlag === false ? false : true}
          validationMessage='starting date required'
        />

        <InputField
          label="Deadline date"
          name='deadline_date'
          id='deadline_date'
          type='date'
          placeholder='Enter assignment deadline date'
          onChange={(e) => setAssignmentDetails({
            ...assignmentDetails,
            deadline_date: e.target.value
          })}
          value={assignmentDetails.deadline_date}
          min={assignmentDetails.starting_date}
          valid={!assignmentDetails.deadline_date && validFlag === false ? false : true}
          validationMessage='deadline date required'
        />
      </div>

      {/* Auto assign team section */}
      {
        !assignmentId &&
        <div className='col-span-3 row-span-3 sm:grid grid-cols-3 grid-flow-row gap-4 justify-items-center border border-slate-300 rounded-lg font-semibold w-full h-full py-2 pr-2 pl-2'>

          <span className='col-span-3 text-sm md:text-md lg:text-md'>{'Assign Team (max 3 employees per role) :'}</span>

          {
            rolesArray.slice(2,).map((role, index) => (
              <div className='grid grid-flow-row gap-2 justify-items-start justify-center items-start' key={index}>
                <div className='grid justify-items-center items-center text-xs md:text-sm lg:text-md text-left text-gray-700 font-bold'>{role}:</div>

                <div className='grid grid-cols-12 gap-1'>
                  <input
                    className='col-span-2 text-slate-500 text-sm font-semibold border border-slate-300 rounded duration-500 py-1 pl-2 h-10'
                    name='totalNumber'
                    id='totalNumber'
                    type='tell'
                    placeholder='No.'
                    min={1}
                    max={3}
                    maxLength={1}
                    onChange={(e) => checkNumber(e.target.value, role)}
                    value={role === 'Designer' ? designersCount : role === 'Programmer' ? programmersCount : role === 'Tester' && testersCount}
                  />

                  <textarea
                    className='col-span-10 text-sky-600 text-sm font-bold border border-slate-300 rounded duration-500 py-1 pl-2 min-h-full max-h-full min-w-full overflow-x-auto h-16'
                    placeholder='auto assigned team will get display here'
                    disabled={true}
                    value={role === 'Designer' ? assignmentDetails.assignment_team.Designers.join('\n') : role === 'Programmer' ? assignmentDetails.assignment_team.Programmers.join('\n') : role === 'Tester' && assignmentDetails.assignment_team.Testers.join('\n')}
                  />
                </div>
              </div>
            ))
          }

          <div className='col-span-3'>
            {
              !assignTeamLoader ?

                <ButtonPrimary buttonLable='Auto Assign Team Members' name='autoAssign' color='sky' id='autoAssign' onClick={() => autoAssignTeam()} />
                :
                <Loader />
            }
          </div>

          <div className='col-span-3 text-sm font-bold animate-pulse text-red-600'>{autoAssignValidationMsg && autoAssignValidationMsg}</div>
        </div>
      }

      <div className='col-span-3 grid gap-2 justify-center text-center text-md md:text-lg lg:text-lg font-bold text-slate-600 h-full w-full'>

        <div>
          Project Manager: <span className='font-bold text-sky-700'> {assignmentDetails.assignment_project_manager} </span>
        </div>

        {
          !loader ?

            !assignmentId ?
              <ButtonPrimary buttonLable='Assign assignment' name='assignAssignment' color='sky' onClick={() => assign('add')} />
              :
              <ButtonPrimary buttonLable='Update assignment' name='updateAssignment' color='sky' onClick={() => assign('update')} />
            :
            <Loader />
        }
      </div>

    </div>
  )
}

export default AssignmentForm