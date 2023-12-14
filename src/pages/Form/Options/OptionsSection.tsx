import BagsSelect from "./BagsSelect/BagsSelect";
import SportSelect from "./SportSelect/SportSelect";
import CarSeatSelect from "./CarSeats/CarSeatsSelect";
import PetsSelect from "./PetsSelect/PetsSelect";
import PassengersSelect from "./PassengersSelect/PassengersSelect";
import { useStore } from "../../../Store";

import { IoCarSportOutline } from "react-icons/io5";
import { LiaShuttleVanSolid } from "react-icons/lia";
import { PiJeepLight } from "react-icons/pi";
import { AiOutlineStop } from "react-icons/ai";
import { useMain } from "../../../Store/useMain";
import React, { useEffect, useState } from "react";


const OptionsSection = ():React.ReactNode => {
    const { store } = useStore()
    const {list, activeCarId, setCarType, isFrench,setSteps} = useMain()
    const [carList, setCarList] = useState(isFrench? store.carListF: store.carList)

    useEffect(()=>{
        setCarList(isFrench? store.carListF: store.carList)
    },[isFrench])
    return (
        <section className={section}>
            <div className={list[activeCarId-1].carType ? type : type + ' border-red-500'}>
                    {carList.map(item => (
                        <div      
                            key={item}
                            className={
                                    item === 'Limo' 
                                    ? typeItem + ' bg-gray-200  text-gray-500 cursor'
                                    :(list[activeCarId-1].carType === 'Sedan' && item === 'Berline') 
                                    || (list[activeCarId-1].carType === 'Berline' && item === 'Sedan') 
                                    || (list[activeCarId-1].carType === 'SUV' && item === 'VUS') 
                                    || (list[activeCarId-1].carType === 'VUS' && item === 'SUV') 
                                    || list[activeCarId-1].carType ===  item 
                                    ? typeItem+' bg-green-400 text-black'
                                    :typeItem+ ' text-blue-500' 
                                } onClick={()=>{
                                if(item === 'Limo') return;
                                setCarType(item)
                            }}>
                            { (item === 'VAN') 
                                ? <LiaShuttleVanSolid className='w-[20px] text-sm'/>
                                :(item === 'SUV' ||item === 'VUS')
                                ?<PiJeepLight className='w-[20px] text-sm'/>
                                :item === 'Limo'
                                ?<AiOutlineStop className='w-[20px] text-sm text-red-500'/>
                                :<IoCarSportOutline className='w-[20px] text-sm'/> }
                                <div className='truncate font-bold'>{item}</div>
                        </div>
                    ))}
            </div>
            
            <div className={content}>
                <div className={contentItem}><PassengersSelect /><BagsSelect /></div>
                <div className={contentItem}><CarSeatSelect /></div>
                <div className={contentItem}><SportSelect /><PetsSelect/></div>
            </div>
            <div className='w-full flex justify-between max-w-[400px] mx-auto pt-10'>
                <div className="bg-red-500 p-2 px-3 rounded text-white cursor-pointer border border-black active:bg-red-400" onClick={()=>setSteps(2)}>{isFrench? 'Précédent': 'Back'}</div>
                <div className="bg-green-400 p-2 px-3 rounded text-white cursor-pointer border border-black active:bg-green-300" onClick={()=>{
                    (list[activeCarId-1].adults === 0  && list[activeCarId-1].type!=2)
                    ? alert('need adults')
                    : setSteps(4)
                }}>{isFrench? 'Suivant': 'Next'}</div>
            </div>
        </section>
    );
};

export default OptionsSection;


const typeItem = 'flex items-center px-2 py-1 cursor-pointer text-[10px] px-0 w-1/4'
const type = 'flex  self-center border border-black rounded s divide-x overflow-hidden w-full'

const contentItem = '  flex relative w-full mb-3 space-x-1 items-start' 

const content = 'flex flex-wrap w-full h-min rounded mt-6'
const section = 'flex w-full flex-col  flex-col max-w-[576px] py-8 bg-white p-1 rounded-b -translate-x-2'