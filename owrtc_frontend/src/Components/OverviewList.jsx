import React, { useEffect, useState } from 'react'
import RatingCell from './RatingCell'
import ButtonSmall from './ButtonSmall'
import ReactModal from 'react-modal'
import ButtonPrimary from './ButtonPrimary'
import { FaRegStar } from "react-icons/fa";
import axios from 'axios'
import Loader from './Loader'

const OverviewList = ({ valA, valB, valC, releaseButtonRequired, ratingRequired, employeeId, employeeName, ratingValue, employeeRole, employeeWIPValue, assignmentDetails }) => {

    const [loader, setLoader] = useState(false)
    const [openReleaseModal, setOpenReleaseModal] = useState(false)
    const [selectedStars, setSelectedStars] = useState(0)
    const [ratingValidationMessage, setRatingValidationMessage] = useState('')

    const [updatedTeams, setUpdatedTeam] = useState({})

    useEffect(() => {

        if (assignmentDetails) {
            setUpdatedTeam({
                Designers: assignmentDetails.assignment_team.Designers,
                Programmers: assignmentDetails.assignment_team.Programmers,
                Testers: assignmentDetails.assignment_team.Testers
            })
        }

    }, [assignmentDetails])

    // function with main rating, WIP & team array updation logic
    const rateAndReleaase = () => {

        // console.log(employeeId, employeeName, ratingValue, employeeRole, employeeWIPValue, assignmentDetails)
        setLoader(true)

        if (selectedStars === 0) {

            setLoader(false)
            setRatingValidationMessage('Giving rating is mandatory to release employee !!')

        } else {

            // Employee table updates - WIP value & Rating
            let avgRating = ((selectedStars + ratingValue) / 2).toFixed(1)
            let updatedWIP = employeeWIPValue !== 0 ? employeeWIPValue - 1 : 0

            const newRating = {
                employee_rating: avgRating,
                wip: updatedWIP
            }
            // console.log(newRating)

            axios.put(`/employee_Api/updateEmployee/${employeeId}`, newRating)
                .then((res) => {

                    if (res.status === 201) {

                        console.log('Rating updated successfully !!')
                        setOpenReleaseModal(false)
                        setSelectedStars(0)
                        setRatingValidationMessage('')
                        setLoader(false)

                    } else {
                        console.log('Something went wrong, Rating updation Unsuccessfully !!')
                        setLoader(false)
                        setRatingValidationMessage('')
                    }

                })
                .catch((error) => {
                    console.log(error)
                })



            // Assignment table updates - Assignment's Team (Employee Releasse)
            if (employeeRole === 'Designer') {

                let updatedDesigners = updatedTeams.Designers.splice(updatedTeams.Designers.indexOf(employeeName), 1)
                setUpdatedTeam({
                    ...updatedTeams,
                    Designers: updatedDesigners
                })

            } else if (employeeRole === 'Programmer') {

                let updatedProgrammers = updatedTeams.Programmers.splice(updatedTeams.Programmers.indexOf(employeeName), 1)
                setUpdatedTeam({
                    ...updatedTeams,
                    Programmers: updatedProgrammers
                })

            } else if (employeeRole === 'Tester') {

                let updatedTesters = updatedTeams.Testers.splice(updatedTeams.Testers.indexOf(employeeName), 1)
                setUpdatedTeam({
                    ...updatedTeams,
                    Testers: updatedTesters
                })
            }

            const newTeam = {
                assignment_team: updatedTeams
            }
            // console.log(newTeam)

            axios.put(`/assignment_Api/updateAssignment/${assignmentDetails.id}/`, newTeam)
                .then((res) => {

                    if (res.status === 201) {
                        console.log("Assignment's Team updated successfully !!")
                    } else {
                        console.log('Something went wrong, Team updation Unsuccessfully !!')
                    }

                })
                .catch((error) => {
                    console.log(error)
                })
        }
    }

    return (
        <div className='grid grid-cols-6 justify-items-start items-center w-full'>
            {
                employeeName && employeeName ?

                    <div className='col-span-3 text-xs md:text-sm lg:text-md text-left text-black font-semibold w-full'>{employeeName}</div>
                    :
                    <div className='col-span-3 text-xs md:text-sm lg:text-md text-left text-black font-semibold w-full'>{valA}</div>
            }


            {
                ratingRequired && (ratingValue >= 0) ?

                    <div className='col-span-1 w-full grid justify-items-center'>
                        <RatingCell ratingValue={ratingValue} />
                    </div>
                    :
                    <div className='col-span-6 text-xs md:text-sm lg:text-md text-left text-black font-semibold w-full'>{valB}</div>

            }


            {
                releaseButtonRequired === true && ratingValue ?

                    <div className='col-span-2 w-full grid justify-items-center'>
                        <ButtonSmall buttonLable='Release' name='Release' onClick={() => setOpenReleaseModal(true)} />
                    </div>
                    :
                    <div className='col-span-6 text-xs md:text-sm lg:text-md text-left text-black font-semibold w-full'>{valC}</div>
            }

            {/* Release modal */}
            <ReactModal
                isOpen={openReleaseModal}
                ariaHideApp={false}
                className="flex items-center justify-center h-screen bg-gray-950 bg-opacity-50"
            >
                <div className='grid grid-flow-row gap-2 justify-items-center justify-center content-center bg-neutral-200 sm:h-1/3 sm:w-1/3 border border-slate-300 rounded-xl'>

                    <div className='grid grid-flow-col gap-1 justify-items-center justify-center items-center'>
                        {
                            [...Array(5)].map((_, index) => (
                                <FaRegStar className={`${selectedStars - 1 >= index && 'bg-amber-400'} text-amber-700 rounded-full hover:bg-amber-400`} key={index} onClick={() => { setSelectedStars(index + 1), setRatingValidationMessage('') }} />
                            ))
                        }
                    </div>

                    <div className='text-sky-700 text-xs md:text-sm lg:text-sm xl:text-lg font-semibold'>Rate {employeeName}'s performance </div>
                    <hr className='w-full border border-slate-300' />

                    {
                        !loader ?
                            <div className='grid sm:grid-flow-col gap-2 justify-center justify-items-center items-center'>
                                <ButtonPrimary buttonLable='Rate & release employee' name='Release' color="sky" onClick={() => rateAndReleaase()} />
                                <ButtonPrimary buttonLable='Cancel' name='cancel' color="red" onClick={() => { setOpenReleaseModal(false), setRatingValidationMessage(''), setSelectedStars(0) }} />
                            </div>
                            :
                            <Loader />
                    }

                    <div className='h-2 text-sm font-semibold text-red-700'>
                        {
                            ratingValidationMessage && ratingValidationMessage
                        }
                    </div>

                </div>
            </ReactModal>
        </div >
    )
}

export default OverviewList