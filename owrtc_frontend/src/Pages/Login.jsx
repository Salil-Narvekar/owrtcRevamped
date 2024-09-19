import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import LoginHeader from '../Components/LoginComponents/LoginHeader'
import InputField from '../Components/InputField'
import ButtonPrimary from '../Components/ButtonPrimary'
import Loader from '../Components/Loader'
import axios from 'axios';
import baseURL from '../ApiBaseUrl/baseUrl'

const Login = () => {

  const navigate = useNavigate()
  const location = useLocation()
  const baseUrl = baseURL

  useEffect(() => {

    const authToken = localStorage.getItem('auth_token')

    if (location.pathname === '/login' && authToken) {
      navigate('/dashboard')
    }

  }, [])

  const [validFlag, setValidFlag] = useState(null)
  const [invalidCredentials, setInvalidCredentials] = useState(false)
  const [loader, setLoader] = useState(false)

  const [credentials, setCredentials] = useState({
    employee_email: '',
    employee_password: ''
  })

  const loginUser = () => {
    
    if (!credentials.employee_email || !credentials.employee_password) {
      setValidFlag(false)

    } else {

      setLoader(true)

      setTimeout(() => {

        axios.get(`${baseUrl}/employee_Api/getEmployees/`)
          .then((res) => {

            let employeesData = res.data
            const validCredentials = employeesData.find((data) => {
              return data.employee_email === credentials.employee_email && data.employee_password === credentials.employee_password && (data.employee_role === 'HR' || data.employee_role === 'Project Manager')
            })

            if (validCredentials) {

              const validCredentialsJSON = JSON.stringify(validCredentials);
              localStorage.setItem('loggedIn_UserDetails', validCredentialsJSON);
              let authToken = '8878' // Make it from backend
              localStorage.setItem('auth_token', authToken)

              navigate('/dashboard')
              setLoader(false)

            } else {
              setLoader(false)
              setInvalidCredentials(true)
            }

          })
          .catch((error) => {
            console.log('Catch error: ', error)
          })

      }, 1500)
    }
  }

  return (

    <div className='grid gap-16 justify-center'>

      <div className="grid gap-20 justify-center">

        <LoginHeader />

        <div className='border rounded-2xl grid gap-5 justify-center content-center bg-neutral-50 py-12 drop-shadow-lg'>

          <div className='h-16 w-64'>
            <InputField
              label="email"
              name="employee_email"
              id="employee_email"
              type="email"
              placeholder="abc123@gmail.com"
              onChange={(e) => {
                setInvalidCredentials(false);
                setCredentials({
                  ...credentials,
                  employee_email: e.target.value
                })
              }}
              valid={!credentials.employee_email && validFlag === false ? false : true}
              validationMessage='email required'
            />
          </div>

          <div className='h-16 w-64 mb-4'>
            <InputField
              label="password"
              name="employee_password"
              id="employee_password"
              type="password"
              placeholder="xxxxxx"
              onChange={(e) => {
                setInvalidCredentials(false);
                setCredentials({
                  ...credentials,
                  employee_password: e.target.value
                })
              }}
              valid={!credentials.employee_password && validFlag === false ? false : true}
              validationMessage='enter password'
            />
          </div>

          {
            !loader ?
              <ButtonPrimary buttonLable='Login' name='login' color='sky' onClick={() => loginUser()} />
              :
              <Loader />
          }

          <div className='h-2 w-64 grid justify-center'>
            {
              invalidCredentials && !loader &&
              <span className='text-red-600 text-md font-semibold animate-pulse'> Invalid credentials, Try again !! </span>
            }
          </div>

        </div>
      </div>

      <div className='grid grid-rows-3 gap-1 justify-items-center bg-gray-200 border border-gray-300 rounded-lg y-4 pl-2 pr-2'>
        <small className='font-semibold'> - NOTE - </small>
        <small> As the features, functionality & dashboards contents are based upon Role based login, </small>
        <small> For <b>{"HR (Admin) "}</b> Login use credentials: <b>Username - salil123@gmail.com | Password - 11 </b> </small>
        <small> For <b>{"Project Manager "}</b> Login use credentials: <b>Username - mahesh123@gmail.com | Password - 22 </b> </small>
      </div>

    </div>
  )
}

export default Login