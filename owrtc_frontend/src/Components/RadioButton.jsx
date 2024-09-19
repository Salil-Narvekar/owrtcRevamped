import React from 'react'

const RadioButton = ({label, name, value, checked, onChange, disabled}) => {
    return (
        <div>
            <input
                className='h-4 mr-1'
                name={name}
                type='radio'
                value={value}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
            <label>{label}</label>
        </div>
    )
}

export default RadioButton