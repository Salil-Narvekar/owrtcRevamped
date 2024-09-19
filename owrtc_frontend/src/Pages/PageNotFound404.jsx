import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from '../Components/ButtonPrimary';

const PageNotFound404 = () => {

    const navigate = useNavigate();
    const loggedUserJSON = localStorage.getItem('loggedIn_UserDetails')
    const loggedUser = JSON.parse(loggedUserJSON)
    
    const goToDashboard = () => {
        if (loggedUser) {
            navigate('/')

        } else {
            navigate('/login')
        }
    }

    return (
        <div className="flex flex-col gap-3 justify-center items-center h-screen text-slate-600 font-semibold">
            <span className='text-8xl animate-pulse'>404 </span>
            <span className='text-6xl animate-pulse'>Page Not Found !!</span>
            <span className='text-lg'>No Page found for the entered URL</span>

            <ButtonPrimary
                buttonLable={loggedUser ? 'Go back to Dashboard' : 'Go to Login'}
                name='home'
                color='sky'
                onClick={() => {
                    goToDashboard();
                }}
            />

        </div>
    )
}

export default PageNotFound404