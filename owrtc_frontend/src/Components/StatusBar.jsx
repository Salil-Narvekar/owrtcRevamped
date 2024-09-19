import React, { useState } from 'react'

const StatusBar = ({ barTitle, statusDataArray, statusOf_keyName, indexesArray }) => {

    const [hoverIndex, setHoverIndexTrue] = useState(null)

    const dataArray = statusDataArray
    const keyname = statusOf_keyName
    const mappedArray = dataArray.map(res => res[keyname])

    const countRole = (toCount, array) => {
        let count = array.filter(res => res === toCount)
        return count.length
    }

    // const roleCountsArray = [10,10,10,10,90]
    const roleCountsArray = indexesArray.map(res => countRole(res, mappedArray));
    // console.log(roleCountsArray)

    const total = roleCountsArray.reduce((acc, value) => acc + value, 0);
    // console.log(total)

    const cellColor1 = 'bg-gray-500 hover:bg-gray-600 rounded-s-lg'
    const cellColor2 = 'bg-green-600 hover:bg-green-700'
    const cellColor3 = 'bg-amber-600 hover:bg-amber-700'
    const cellColor4 = 'bg-purple-600 hover:bg-purple-700'
    const cellColor5 = 'bg-rose-400 hover:bg-rose-700'
    const cellColor6 = 'bg-orange-400 hover:bg-rose-700'
    const cellColor7 = 'bg-indigo-400 hover:bg-rose-700'
    const endRounded = 'rounded-e-lg'
    const translatedIndexText = 'duration-500 translate-y-1 font-semibold'

    return (
        <div className='grid grid-flow-rows gap-1 justify-center justify-items-center items-center font-semibold w-full'>

            <span className='text-md'>{dataArray.length + " " + barTitle}</span>

            <div className='grid grid-flow-col text-justify-items-start items-center drop-shadow-lg divide-x-2 rounded-lg bg-slate-200 w-[300px]'>
                {
                    roleCountsArray.map((res, index) => (

                        <div
                            key={index}
                            style={{ width: (res / total) * 300 + 'px' }}
                            className={`h-3 min-w-full duration-500
                                ${index === 0 && cellColor1} 
                                ${index === 1 && cellColor2}
                                ${index === 2 && cellColor3}
                                ${index === 3 && cellColor4}
                                ${index === 4 && cellColor5} 
                                ${index === 5 && cellColor6} 
                                ${index === 6 && cellColor7} 
                                ${index + 1 === roleCountsArray.length && endRounded} 
                            `}

                            onMouseEnter={() => setHoverIndexTrue(index)}
                            onMouseLeave={() => setHoverIndexTrue(null)}
                        ></div>
                    ))
                }
            </div>

            <div className='grid grid-flow-col gap-3 justify-items-start items-center text-xs mb-2 md:mb-0 lg:mb-0'>
                {
                    indexesArray.map((role, index) =>
                        <span className={`${hoverIndex === index && translatedIndexText}`} key={index}>{role}</span>
                    )
                }
            </div>
        </div>
    )
}

export default StatusBar