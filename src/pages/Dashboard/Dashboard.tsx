import { useDashboard } from "../../Store/dashboard";
import { NavLink, Outlet } from "react-router-dom";
import { PiUsers } from "react-icons/pi";
import { PiTaxiThin } from "react-icons/pi";
import { CiEdit } from "react-icons/ci";
import { IoCashOutline } from "react-icons/io5";
import { CiSettings } from "react-icons/ci";
import React, { useState } from "react";
import { IoMdClose, IoIosArrowForward } from "react-icons/io";
import { GoSearch } from "react-icons/go";



const Dashboard = ():React.ReactNode => {
    const {isFrench } = useDashboard()
    const [openMenu, setOpenMenu] = useState(false)
    
    return (
        <div className={screen}>
            <nav className={openMenu?navMenu : navMenuClosed}>
                {!openMenu && <IoIosArrowForward className={menuIcon} onClick={()=>setOpenMenu(true)}/>}
                {openMenu && <IoMdClose className={menuIcon} onClick={()=>setOpenMenu(false)} />}
                <div className={ menuContent}>
                <h1 className={openMenu?navTitle: navTitle + ' opacity-0 '}>Navigation menu Taxi</h1>
                    <NavLink to='/' className={({ isActive }) => isActive ?( openMenu ? navItemActive:navItemActiveClosed ):( openMenu? navItem: navItemClosed)}>
                        { ({isActive})=>(<><div className={isActive ? activeIcon:icon}><GoSearch /></div><span className={openMenu? 'duration-[2000ms]':' opacity-0 duration-200'}>{isFrench? 'Calendrier' : 'Calendar'}</span></>) }
                    </NavLink>
                    <NavLink to='customers' className={({ isActive }) =>isActive ?( openMenu ? navItemActive:navItemActiveClosed ):( openMenu? navItem: navItemClosed)}>
                        { ({isActive})=>(<><div className={isActive ? activeIcon:icon}><PiUsers /></div><span className={openMenu? 'duration-[2000ms]':' opacity-0 duration-200'}>{isFrench? 'Clients' : 'Customers'}</span></>)} 
                    </NavLink>
                    <NavLink to='orders' className={({ isActive }) =>isActive ?( openMenu ? navItemActive:navItemActiveClosed ):( openMenu? navItem: navItemClosed)}>     
                        {({isActive})=>(<><div className={isActive ? activeIcon:icon}><CiEdit /></div><span className={openMenu? 'duration-[2000ms] ':' opacity-0 duration-200'}>{isFrench? 'Nouvelle Commande' : 'New Order'}</span> </>)}
                    </NavLink>
                    <NavLink to='drivers' className={({ isActive }) =>isActive ?( openMenu ? navItemActive:navItemActiveClosed ):( openMenu? navItem: navItemClosed)}>
                        {({isActive})=>(<><div className={isActive ? activeIcon:icon}><PiTaxiThin /></div><span className={openMenu? 'duration-[2000ms]':' opacity-0 duration-200'}>{isFrench? 'Chauffeurs' : 'Drivers'}</span></>)}
                    </NavLink>
                    <NavLink to='prices' className={({ isActive }) =>isActive ?( openMenu ? navItemActive:navItemActiveClosed ):( openMenu? navItem: navItemClosed)}>
                        {({isActive})=>(<><div className={isActive ? activeIcon:icon}><IoCashOutline /></div><span className={openMenu? 'duration-[2000ms]':' opacity-0 duration-200'}>{isFrench? 'Fares' : 'Tarification'}</span></>)}
                    </NavLink>
                    <NavLink to='settings' className={({ isActive }) =>isActive ?( openMenu ? navItemActive:navItemActiveClosed ):( openMenu? navItem: navItemClosed)}> 
                        {({isActive})=>(<><div className={isActive ? activeIcon:icon}><CiSettings /></div><span className={openMenu? 'duration-[2000ms]':' opacity-0 duration-200'}>{isFrench? 'Paramètres' : 'Setting(only for Admin)'}</span></>)}
                    </NavLink>

                </div>
            </nav>
            <Outlet />  
        </div>
    );
};

export default Dashboard;


const icon =' p-1 bg-white rounded-lg shadow-lg mr-2 text-3xl'
const activeIcon =' p-1 rounded-lg bg-purple-500 text-white text-3xl  mr-2'
const navTitle= 'duration-1000 truncate '
const menuContent = 'flex flex-col '

const navItem = ' relative rounded duration-500 items-center py-2 flex px-4 font-bold cursor-pointer mb-2 hover:text-purple-500'
const navItemClosed = ' relative duration-500 rounded items-center p-1 flex font-bold cursor-pointer mb-[16px] hover:text-purple-500'
const navItemActive = ' relative duration-500 rounded items-center flex py-2 bg-white text-purple-500 rounded-xl shadow-xl px-4 font-bold cursor-pointer mb-2 hover:text-purple-500'
const navItemActiveClosed = ' relative duration-500  rounded items-center flex p-1 bg-white text-purple-500 rounded-xl shadow-xl font-bold cursor-pointer mb-4 hover:text-purple-500'

const navMenu = 'px-4 py-10 flex flex-col fixed top-0 left-0 bottom-0 z-10 bg-white bg-opacity-75 overflow-hidden ease-linear duration-500 w-[200px] min-h-screen h-full shadow-lg '
const navMenuClosed = 'px-1 py-10 flex flex-col fixed top-0 left-0 bottom-0 z-10 bg-white bg-opacity-75 overflow-hidden ease-linear duration-500 w-[55px] min-h-screen h-full shadow-lg '

const menuIcon = 'absolute top-4 text-2xl right-2 cursor-pointer hover:text-purple-500'
const screen =  'flex justify-center min-w-screen w-full bg-gray-50 min-h-screen '