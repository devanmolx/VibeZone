import React from 'react'
import { ClipLoader } from "react-spinners";


const Loading = () => {
    return (
        <div className=' absolute left-0 top-0 w-screen h-screen bg-[#1F1826] flex items-center justify-center'>
            <ClipLoader color="#7C55E7" size={50} />
        </div >
    )
}

export default Loading