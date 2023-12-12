import axios from "axios";
import React,{ useEffect } from "react";
import { NavLink } from "react-router-dom";

const Confirm = ():React.ReactNode => {

    useEffect(()=>{
        axios.patch('http://localhost:3000/order/status',{status: 'confirmed'})
    },[])
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center'>
            <span className='mb-10 text-3xl'>You confirmed your trip! </span>
            <NavLink to='/dashboard'  className='bg-sky-600 text-white px-6 py-3 rounded-full border-r-4 border-b-4 border-sky-800 active:border-0 active:mt-1'>Go to my profile</NavLink>
        </div>
    );
};

export default Confirm;