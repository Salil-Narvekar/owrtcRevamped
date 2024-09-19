import React from 'react'
import OwrtcLogo from '../OwrtcLogo'

const LoginHeader = () => {
    return (
        <div className='mt-5 grid justify-items-center justify-center items-center'>
            <OwrtcLogo textSize='4xl' />
            <div className='font-semibold text-xs md:text-base lg:text-base capitalize italic text-center'>Welcome To Organization Workflow With Real Time Communication</div>
            <div className='text-xs font-semibold lowercase'>version:1.0.1</div>
        </div>
    )
}

export default LoginHeader