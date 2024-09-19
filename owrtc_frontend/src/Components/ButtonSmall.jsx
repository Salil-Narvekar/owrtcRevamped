import React from 'react'

const ButtonSmall = ({ buttonLable, name, onClick, disabled, size, color, selectedButtonName }) => {

    const colorClass =
        color === 'sky' && selectedButtonName === name ?
            'bg-sky-800'
            : color === 'red' && selectedButtonName === name ?
                'bg-red-900'
                : color === 'green' && selectedButtonName === name ?
                    'bg-green-800'
                    : color === 'sky' || !color ?
                        'bg-sky-600 hover:bg-sky-700'
                        : color === 'red' ?
                            'bg-red-700 hover:bg-red-900'
                            : color === 'green' &&
                            'bg-green-600 hover:bg-green-700';

    return (
        <button
            className={`${colorClass} text-slate-100 text-xs md:text-sm lg:text-sm transition duration-500 ease-in-out hover:scale-95 cursor-pointer rounded-lg font-semibold py-1 pl-2 pr-2 w-full`}
            name={name}
            onClick={onClick}
            disabled={disabled}
            size={size}
        >
            {buttonLable}
        </button>)
}

export default ButtonSmall