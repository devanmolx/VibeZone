import React from 'react'
import { ClipLoader } from "react-spinners";


const Loading = () => {
    return (
        <div className=' left-0 top-0 fixed w-screen h-screen bg-[#1F1826] flex items-center justify-center'>
            <ClipLoader color="#7C55E7" size={50} />
        </div >
    )
}

export default Loading