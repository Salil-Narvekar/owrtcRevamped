import React from 'react'
import { useNavigate } from "react-router-dom";
import ButtonSmall from '../ButtonSmall';
import RatingCell from '../RatingCell';

const EmployeeDetailsPlate = ({employeeId, employeeName, rating, contactNo, email }) => {
    const navigate = useNavigate();

    return (
        <div className='grid grid-rows-3 justify-items-start border border-slate-300 rounded-lg font-bold h-full max-h-24 py-2 pl-2 pr-2'>

            <div className='grid grid-cols-3 gap-1 justify-items-start'>
                <span className='col-span-2 text-xs md:text-sm lg:text-md xl:text-lg text-cyan-600'>{employeeName}</span>
                <RatingCell  ratingValue={rating} />
            </div>

            <div className='text-xs md:text-sm lg:text-md text-left'>
                <span>{contactNo}</span>
                <span className='text-slate-500 ml-2'>{email}</span>
            </div>

            <div className='grid grid-flow-col justify-start items-center gap-1'>

                <ButtonSmall
                    buttonLable="Video"
                    name="videoCall"
                    color='green'
                    onClick={() => navigate(`/videoCall/${employeeId}`)}
                />

                <ButtonSmall
                    buttonLable="Track"
                    name="track"
                    color='green'
                    onClick={() => navigate(`/tractLocation/${employeeId}`)}
                />

                <ButtonSmall
                    buttonLable="Edit"
                    name="edit"
                    color='green'
                    onClick={() => navigate(`/employeeForm/${employeeId}`)}
                />
            </div>
        </div>
    )
}

export default EmployeeDetailsPlate