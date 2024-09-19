import React from 'react'
import ReactLoading from 'react-loading';

const Loader = () => {
    return (
        <div className="flex items-center justify-center">
            <ReactLoading type="spinningBubbles" color='#145679' height={30} width={30} />
        </div>
    )
}

export default Loader