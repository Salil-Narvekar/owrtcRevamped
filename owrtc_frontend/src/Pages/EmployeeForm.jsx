import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { RolesArray } from '../App'
import axios from 'axios'
import Select from 'react-dropdown-select'
import InputField from '../Components/InputField'
import ButtonPrimary from '../Components/ButtonPrimary'
import Loader from '../Components/Loader'
import baseURL from '../ApiBaseUrl/baseUrl'

const EmployeeForm = () => {

  const navigate = useNavigate()
  const baseUrl = baseURL
  const rolesArray = useContext(RolesArray);
  const { employeeId } = useParams();

  const loggedUserJSON = localStorage.getItem('loggedIn_UserDetails')
  const loggedUser = JSON.parse(loggedUserJSON)

  const [employeeDetails, setEmployeeDetails] = useState({
    employee_name: '',
    employee_role: '',
    employee_email: '',
    employee_contact: '',
    employee_password: '',
    registered_by_hr: loggedUser.employee_name
  });
  // console.log("employeeDetails", employeeDetails);

  const [validFlag, setValidFlag] = useState(null)
  const [loader, setLoader] = useState(false)
  const [registrationDateTime, setRegistrationDateTime] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('')
  const confirmPassColor = confirmPasswordMessage === 'Passwords matched' ? 'text-green-600' : 'text-red-700'

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  useEffect(() => {

    if (employeeId) {
      setLoader(true)

      axios.get(`/employee_Api/getEmployees/${employeeId}`)
        .then((res) => {
          if (res.status === 200) {

            let data = res.data
            setEmployeeDetails({
              employee_name: data.employee_name,
              employee_role: data.employee_role,
              employee_email: data.employee_email,
              employee_contact: data.employee_contact,
              employee_password: data.employee_password,
              registered_by_hr: data.registered_by_hr
            })

            setConfirmPassword(data.employee_password)
            let registered_date = formatDate(data.employee_registered_on)
            setRegistrationDateTime(registered_date)
            setLoader(false)

          } else {
            console.log(`Employee with id ${employeeId} does not exist !!`)
            setLoader(false)
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

  }, [employeeId])

  const rolesList = rolesArray.map((value, index) => (
    {
      roleId: index,
      roleName: value
    }
  ))

  const setRole = (value) => {
    // console.log("SelectBox Value", value[0].roleName)
    setEmployeeDetails({
      ...employeeDetails,
      employee_role: value[0].roleName
    });
  };

  const confirmPasswordCheck = (cpass) => {

    setConfirmPassword(cpass)

    if (employeeDetails.employee_password && cpass === employeeDetails.employee_password) {
      setConfirmPasswordMessage('Passwords matched')
    } else {
      setConfirmPasswordMessage('Password mismatched')
    }
  }

  const register = (action) => {

    if (!employeeDetails.employee_name || !employeeDetails.employee_email || !employeeDetails.employee_contact || !employeeDetails.employee_role || !employeeDetails.employee_password || !confirmPassword) {
      setValidFlag(false)
      setLoader(false)

    } else {

      if (action === 'add') {

        setLoader(true)

        axios.post(`${baseUrl}/employee_Api/registerEmployee/`, employeeDetails)
          .then((res) => {

            if (res.status === 201) {

              console.log('Employee registered successfully with details: ', res.data)
              setLoader(false)
              setValidFlag(null)
              navigate("/dashboard");

            } else {
              console.log('Employee not registered, something went wrong !! ')
              setLoader(false)
            }

          })
          .catch((error) => {
            console.log('Catch error: ', error)
            setLoader(false)
          })

      } else if (action === 'update') {

        setLoader(true)

        axios.put(`/employee_Api/updateEmployee/${employeeId}`, employeeDetails)
          .then((res) => {

            if (res.status === 201) {

              console.log('Employee updated successfully with details: ', res.data)
              setLoader(false)
              setValidFlag(null)
              navigate("/dashboard");

            } else {
              console.log('Employee updation unsuccessfull, somthing went wrong !! ')
              setLoader(false)
            }

          })
          .catch((error) => {
            console.log('Catch error: ', error)
            setLoader(false)
          })
      }
    }
  }

  return (
    <div className='grid gap-12 justify-items-center items-start border border-slate-300 rounded-lg bg-sky-50 text-gray-500 py-10 pl-10 pr-10 sm:ml-4 sm:mr-4'>
      <div className='grid sm:grid-cols-3 gap-8 col-span-3 w-full'>
        <InputField
          label="Employee's Name"
          name='employee_name'
          id='employee_name'
          type='text'
          placeholder='Enter employee name'
          onChange={(e) => setEmployeeDetails({
            ...employeeDetails,
            employee_name: e.target.value
          })}
          value={employeeDetails.employee_name}
          valid={!employeeDetails.employee_name && validFlag === false ? false : true}
          validationMessage='employee name required'
        />

        <InputField
          label="Employee's Email"
          name='employee_email'
          id='employee_email'
          type='email'
          placeholder='abc123@gmail.com'
          onChange={(e) => setEmployeeDetails({
            ...employeeDetails,
            employee_email: e.target.value
          })}
          value={employeeDetails.employee_email}
          valid={!employeeDetails.employee_email && validFlag === false ? false : true}
          validationMessage='email required'
        />

        <InputField
          label="Employee's Contact No."
          name='employee_contact'
          id='employee_contact'
          type='tel'
          maxLength={10}
          placeholder='985*****95'
          onChange={(e) => setEmployeeDetails({
            ...employeeDetails,
            employee_contact: e.target.value
          })}
          value={employeeDetails.employee_contact}
          valid={!employeeDetails.employee_contact && validFlag === false ? false : true}
          validationMessage='contact required'
        />

        <div className='w-full h-14'>
          <div className='text-sm md:text-md lg:text-lg text-left text-gray-700 font-bold mb-1'>Select Employee's Role:</div>
          <Select
            className='bg-white sm:h-8 text-sm md:text-md lg:text-md text-slate-500 font-semibold'
            style={{ borderRadius: '4px', minHeight: '100%', width: '100%' }}
            options={rolesList}
            labelField="roleName"
            valueField="roleId"
            placeholder="Select employee's role"
            values={employeeId && [
              {
                roleId: rolesArray.indexOf(employeeDetails.employee_role),
                roleName: employeeDetails.employee_role
              }
            ]}
            onChange={(values) => setRole(values)}
          />
          {
            !employeeDetails.employee_role && validFlag === false &&
            <div className='text-xs text-red-600 font-semibold text-right mt-0.5'> Role selection required </div>
          }
        </div>

        <InputField
          label="Password"
          name='employee_password'
          id='employee_password'
          type='password'
          placeholder='****'
          onChange={(e) => {
            setConfirmPassword('');
            setEmployeeDetails({
              ...employeeDetails,
              employee_password: e.target.value
            })
          }}
          value={employeeDetails.employee_password}
          valid={!employeeDetails.employee_password && validFlag === false ? false : true}
          validationMessage='password required'
        />

        <div className='w-full h-14'>
          <InputField
            label="Confirm Password"
            name='employee_Cpassword'
            id='employee_Cpassword'
            type='password'
            placeholder='****'
            value={confirmPassword ? confirmPassword : ''}
            onChange={(e) => confirmPasswordCheck(e.target.value)}
            valid={!confirmPassword && validFlag === false ? false : true}
            validationMessage='Password confirmation required'
          />
          {
            confirmPasswordMessage && confirmPassword &&
            <span className={`text-xs ${confirmPassColor} font-semibold grid justify-items-end mt-0.5`}>{confirmPasswordMessage}</span>
          }
        </div>
      </div>

      <div className='col-span-3 grid gap-2 justify-center text-md md:text-lg lg:text-lg text-center font-bold text-slate-600 h-full w-full'>
        
        <div>
          <span> Employee {employeeId ? 'registered' : 'registration'} by: </span> <span className='font-bold text-sky-700'> HR - {employeeDetails.registered_by_hr} </span>
          {employeeId && <span className='text-sm md:text-lg lg:text-lg '> | on - <span className='text-red-800'> {registrationDateTime} </span> </span>}
        </div>

        {
          !loader ?

            !employeeId ?
              <ButtonPrimary buttonLable='Register employee' name='registerEmployee' color='sky' onClick={() => register('add')} />
              :
              <ButtonPrimary buttonLable='Update employee' name='updateEmployee' color='sky' onClick={() => register('update')} />
            :
            <Loader />
        }

      </div>
    </div>
  )
}

export default EmployeeForm