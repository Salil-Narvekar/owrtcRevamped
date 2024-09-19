import React from 'react'

const RatingCell = ({ratingValue}) => {
  return (
    <div className='text-xs font-semibold grid justify-items-center items-center w-6 h-5 rounded-md bg-yellow-500 '>
      <span>{ratingValue}</span>
    </div>
  )
}

export default RatingCell