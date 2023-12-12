import { NavLink } from "react-router-dom";
import React from "react";

const Cancel = ():React.ReactNode => {


    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center'>
            <span className='mb-10 text-3xl'>You canceled your trip(( </span>
            <NavLink to='/'  className='bg-sky-600 text-white px-6 py-3 rounded-full border-r-4 border-b-4 border-sky-800 active:border-0 active:mt-1'>order new</NavLink>
        </div>
    );
};

export default Cancel;