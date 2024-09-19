import React from 'react'
const ButtonPrimary = ({ buttonLable, name, onClick, disabled, size, color, selectedButtonName }) => {

  const colorClass =
    color === 'sky' && selectedButtonName === name ?
      'bg-sky-800 scale-105'
      : color === 'red' && selectedButtonName === name ?
        'bg-red-800 scale-105'
        : color === 'green' && selectedButtonName === name ?
          'bg-green-800 scale-105'
          : color === 'sky' || !color ?
            'bg-sky-600 hover:bg-sky-700'
            : color === 'red' ?
              'bg-red-700 hover:bg-red-800'
              : color === 'green' &&
              'bg-green-600 hover:bg-green-700'

  return (
    <button
      className={`${colorClass} text-slate-100 text-xs md:text-sm lg:text-sm transition duration-700 ease-in-out hover:scale-105 cursor-pointer rounded-lg font-semibold py-2 pl-4 pr-4`}
      name={name}
      onClick={onClick}
      disabled={disabled}
      size={size}
    >
      {buttonLable}
    </button>
  )
}

export default ButtonPrimary