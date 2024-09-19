import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

const Protected = ({ component }) => {

    const navigate = useNavigate()
    const [authenticUser, setAuthenticUser] = useState(false)

    useEffect(() => {

        const authToken = localStorage.getItem('auth_token')
        
        if(authToken){
            setAuthenticUser(true)
        } else {
            navigate('/login')
        }

    }, [])

    return (
        <>
            {authenticUser && component}
        </>
    )
}

export default Protected