import React from 'react'

const OwrtcLogo = ({textSize}) => {
    const textSizeClass = textSize === '4xl' ? 'text-4xl' : 'text-xs md:text-lg text-xl';

    return (
        <div className={`${textSizeClass} uppercase font-bold font-sans text-sky-600 drop-shadow-lg`}>
            OWRTC
        </div>
    )
}

export default OwrtcLogo