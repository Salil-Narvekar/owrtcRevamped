import { useNavigate, useLocation } from "react-router-dom"
import OwrtcLogo from '../OwrtcLogo'
import ButtonPrimary from '../ButtonPrimary'
import RatingCell from '../RatingCell'

const NavBar = () => {

  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location)

  const loggedUserJSON = localStorage.getItem('loggedIn_UserDetails')
  const loggedUser = JSON.parse(loggedUserJSON)

  return (
    <>
      {
        loggedUserJSON &&
        <div className='sm:h-14 w-full grid grid-cols-2 justify-items-center items-center pl-4 pr-4 mb-2 md:mb-0 lg:mb-0'>
          <div className='sm:grid grid-flow-col gap-2 justify-items-start justify-start items-center w-full'>

            <OwrtcLogo textSize='xl' />

            <div className='font-semibold items-center'>
              <span className='text-md md:text-xl lg:text-xl'>{loggedUser && loggedUser.employee_name}</span>
              <span className='text-xs ml-1'>{loggedUser && loggedUser.employee_role}</span>
            </div>

            <RatingCell ratingValue={loggedUser && loggedUser.employee_rating} />

          </div>

          <div className='grid grid-flow-col gap-2 justify-items-end justify-end items-center w-full'>
            {
              location.pathname === '/dashboard' && loggedUser && loggedUser.employee_role === 'HR' ?

                <ButtonPrimary buttonLable='Register' name='register' color='sky' onClick={() => navigate(`/employeeForm`)} />

                : location.pathname === '/dashboard' && loggedUser && loggedUser.employee_role === 'Project Manager' ?

                  <ButtonPrimary buttonLable='Assign' name='assign' color='sky' onClick={() => navigate(`/assignmentForm`)} />

                  :

                  <ButtonPrimary buttonLable='Home' name='home' color='sky' onClick={() => navigate('/dashboard')} />
            }

            <ButtonPrimary
              buttonLable='Logout'
              name='logout'
              color='red'
              onClick={() => {
                navigate('/login');
                localStorage.removeItem('loggedIn_UserDetails');
                localStorage.removeItem('auth_token');
              }}
            />
          </div>
        </div>
      }
    </>

  )
}

export default NavBar