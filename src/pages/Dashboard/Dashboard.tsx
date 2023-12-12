import { useDashboard } from "../../Store/dashboard";
// import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import { CiCalendar } from "react-icons/ci";
import { PiUsers } from "react-icons/pi";
import { PiTaxiThin } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { IoCashOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import React from "react";



const Dashboard = ():React.ReactNode => {
    const {isFrench } = useDashboard()
    
    return (
        <div className={screen}>
            <nav className={navMenu }>
                {/* {!isOpen && <IoIosArrowForward className={menuIcon} onClick={()=>setIsOpen(true)}/>}
                {isOpen && <IoIosArrowBack className={menuIcon} onClick={()=>setIsOpen(false)} />} */}
                <div className={ menuContent}>
                    <h1 className={navTitle}>Navigation menu Taxi</h1>
                    <NavLink to='/' className={({ isActive }) => isActive ? navItemActive : navItem}>
                        {
                            ({isActive})=>(<><div className={isActive ? activeIcon:icon}><CiCalendar /></div>{isFrench? 'Calendrier' : 'Calendar'}</>)
                        }
                    </NavLink>
                    <NavLink to='customers' className={({ isActive }) =>isActive ? navItemActive : navItem}>
                        {
                            ({isActive})=>(<><div className={isActive ? activeIcon:icon}><PiUsers /></div>{isFrench? 'Clients' : 'Customers'}</>)
                        }
                        
                    </NavLink>
                    <NavLink to='orders' className={({ isActive }) =>isActive ? navItemActive : navItem}>
                        
                        {
                            ({isActive})=>(<>
                                <div className={isActive ? activeIcon:icon}><CiEdit /></div>
                                {isFrench? 'Nouvelle Commande' : 'New Order'} 
                                <div className='absolute -top-[2px] left-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full'>2</div>
                            </>)
                        }
                    </NavLink>
                    <NavLink to='drivers' className={({ isActive }) =>isActive ? navItemActive : navItem}>
                        
                        {
                            ({isActive})=>(<><div className={isActive ? activeIcon:icon}><PiTaxiThin /></div>{isFrench? 'Chauffeurs' : 'Drivers'}</>)
                        }
                    </NavLink>
                    <NavLink to='prices' className={({ isActive }) =>isActive ? navItemActive : navItem}>
                        
                        {
                            ({isActive})=>(<><div className={isActive ? activeIcon:icon}><IoCashOutline /></div>{isFrench? 'Fares' : 'Tarification'}</>)
                        }
                    </NavLink>
                    <NavLink to='settings' className={({ isActive }) =>isActive ? navItemActive : navItem}>
                        
                        {
                            ({isActive})=>(<><div className={isActive ? activeIcon:icon}><CiSettings /></div>{isFrench? 'Paramètres' : 'Setting(only for Admin)'}</>)
                        }
                    </NavLink>

                </div>
            </nav>
            <div className='flex w-full'>
                <Outlet />  
            </div>
        </div>
    );
};

export default Dashboard;


const icon =' p-1 bg-white rounded-lg shadow-lg mr-2 text-3xl'
const activeIcon =' p-1 rounded-lg bg-purple-500 text-white text-3xl  mr-2'
const navTitle= ''
// const menuIcon = 'absolute top-4 text-2xl right-2 cursor-pointer hover:text-purple-500'
const menuContent = 'flex flex-col '
const navItem = ' relative rounded items-center py-2 flex px-4 font-bold cursor-pointer mb-2 hover:text-purple-500'
const navItemActive = ' relative rounded items-center flex py-2 bg-white text-purple-500 rounded-xl shadow-xl px-4 font-bold cursor-pointer mb-2 hover:text-purple-500'
const navMenu = 'px-4 py-10 flex flex-col static top-0 bottom-0 left-0 ease-linear duration-500 '
const screen = 'relative flex w-screen bg-gray-50 min-h-screen '