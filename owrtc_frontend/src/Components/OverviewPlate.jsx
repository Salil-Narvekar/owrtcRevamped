import React, { useState } from 'react'
import ButtonSmall from './ButtonSmall'
import OverviewList from './OverviewList'

const OverviewPlate = ({ OverviewTitle, buttonLabel1, buttonLabel2, overViewListTitlesArray, buttonsRequired, releaseButtonRequired, ratingRequired, listA, listB, listC, onbuttonClickA, onbuttonClickB, assignmentDetails}) => {

    const [selectedButtonName, setSelectedButtonName] = useState(buttonLabel1)

    return (
        <div className='mt-4 md:mt-2 lg:mt-2 xl:mt-0'>

            {/* title bar */}
            <div className='h-[16%] w-full grid grid-flow-col gap-4 justify-items-center justify-center items-center self-center bg-slate-400/50 rounded-lg'>

                <div className='text-sm md:text-sm lg:text-lg xl:text-xl grid items-center font-bold w-full h-full py-1'>{OverviewTitle}</div>

                {
                    buttonsRequired === true &&
                    <div className='grid grid-flow-col gap-2 justify-items-center justify-center items-center w-full h-full py-1'>
                        <ButtonSmall buttonLable={buttonLabel1} name={buttonLabel1} color='sky' onClick={() => { onbuttonClickA(); setSelectedButtonName(buttonLabel1) }} selectedButtonName={selectedButtonName} />
                        <ButtonSmall buttonLable={buttonLabel2} name={buttonLabel2} color='sky' onClick={() => { onbuttonClickB(); setSelectedButtonName(buttonLabel2) }} selectedButtonName={selectedButtonName} />
                    </div>
                }
            </div>

            {/* listing */}
            <div className='h-[84%] grid sm:grid-cols-3 gap-4 justify-center justify-items-center items-start pt-6'>
                {
                    overViewListTitlesArray.map((titles, index) => {

                        let cellColor = index === 0 ? 'text-orange-600' : index === 1 ? 'text-violet-900' : index === 2 && 'text-orange-800'
                        let borderColor = index === 0 ? 'border-orange-600' : index === 1 ? 'border-violet-900' : index === 2 && 'border-orange-800'

                        return (
                            <div
                                className='w-full text-center'
                                key={index}
                            >
                                <span className={`${cellColor} text-xs md:text-sm lg:text-md font-semibold`}>{titles}</span>
                                <hr className={`border ${borderColor} mt-1 mb-3`} />

                                <div className='grid grid-flow-row gap-4 justify-items-start items-start h-full'>
                                    {
                                        index === 0 && Array.isArray(listA) ?

                                            listA.map((res, index) => (

                                                <OverviewList
                                                    key={index}
                                                    valA={res}
                                                    employeeId={res.id}
                                                    employeeName={res.employee_name}
                                                    ratingValue={res.employee_rating}
                                                    employeeRole={res.employee_role}
                                                    employeeWIPValue={res.wip}
                                                    assignmentDetails= {assignmentDetails && assignmentDetails}
                                                    ratingRequired={ratingRequired}
                                                    releaseButtonRequired={releaseButtonRequired}
                                                />
                                            ))

                                            : index === 1 && Array.isArray(listB) ?

                                                listB.map((res, index) => (

                                                    <OverviewList
                                                        key={index}
                                                        valB={res}
                                                        employeeId={res.id}
                                                        employeeName={res.employee_name}
                                                        ratingValue={res.employee_rating}
                                                        employeeRole={res.employee_role}
                                                        employeeWIPValue={res.wip}
                                                        assignmentDetails= {assignmentDetails && assignmentDetails}
                                                        ratingRequired={ratingRequired}
                                                        releaseButtonRequired={releaseButtonRequired}
                                                    />
                                                ))

                                                : index === 2 && Array.isArray(listC) &&

                                                listC.map((res, index) => (

                                                    <OverviewList
                                                        key={index}
                                                        // valC={res && res}
                                                        employeeId={res.id}
                                                        employeeName={res.employee_name}
                                                        ratingValue={res.employee_rating}
                                                        employeeRole={res.employee_role}
                                                        employeeWIPValue={res.wip}
                                                        assignmentDetails= {assignmentDetails && assignmentDetails}
                                                        ratingRequired={ratingRequired}
                                                        releaseButtonRequired={releaseButtonRequired}
                                                    />
                                                ))
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default OverviewPlate