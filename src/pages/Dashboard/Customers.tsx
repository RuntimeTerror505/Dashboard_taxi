import React,{ useEffect } from "react";
import { useDashboard } from "../../Store/dashboard";

const Customers = ():React.ReactNode => {
    const {users,  getUsers } = useDashboard()
    useEffect(()=>{
        getUsers()
    },[])

    return (
        users.length>0? 
        <div>
            {users.map((item)=>(
                <div>{item.email}</div>
            ))}
        </div>
        :<div className='w-full min-h-screen items-center justify-center'><span>Loading</span></div>
    );
};

export default Customers;