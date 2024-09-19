import React from 'react'

const InputField = ({ label, name, id, type, placeholder, min, value, onBlur, onChange, onInput, maxLength, ref, checked, disabled, valid, validationMessage }) => {
    return (
        <div className='w-full sm:h-16'>
            <div className='text-sm md:text-md lg:text-lg text-left text-gray-700 font-bold mb-1'>{label}:</div>

            <input
                className='text-slate-500 font-semibold border border-slate-300 rounded duration-500 py-1 pl-2 min-w-full'
                name={name}
                id={id}
                type={type}
                placeholder={placeholder}
                min={min}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                onInput={onInput}
                ref={ref}
                maxLength={maxLength}
                checked={checked}
                disabled={disabled}
            />

            {
                valid === false &&
                <div className='text-xs text-red-600 font-semibold text-right mt-0.5'>
                    {validationMessage}
                </div>
            }
        </div>
    )
}

export default InputField