
import React, { useEffect, useState } from "react";
import ReturnTrip from "./ReturnTrip";
import TripContent from "./TripContent";
import { useMain } from "../../../Store/useMain";
import { useStore } from "../../../Store";

const LocationSection = ():React.ReactNode => {
    const [ tabs, setTabs ] = useState(false)
    const {store} = useStore()
    const {isFrench, list,setIsReturnStatus, setIsReturnTrip, activeCarId } = useMain()
    useEffect(()=>{
        if(['Boost', 'Unlocking door'].includes(list[activeCarId-1].type)) {
            setIsReturnTrip(false)
            setIsReturnStatus(false)
        }
    },[])
    return (
        <section className={section}>
            <div className={carContainer}>
                <div className='absolute w-20 h-[27px]  bg-white bottom-0 right-1/2 translate-x-1/2'></div>
                <div 
                    className={tabs ? carCard + ' rounded-br-[50px] rounded-t-[30px] border-r' : carCardActive +' border-b-0 rounded-tr-[20px] border-r-0'} 
                    onClick={()=>{ setTabs(false)}}
                >
                    {isFrench? store.tripTitlesF[0] : store.tripTitles[0]}
                </div>
                <div 
                    className={!tabs ? carCard + ' rounded-bl-[50px]  rounded-t-[30px] border-l ': carCardActive +' border-b-0 rounded-tl-[20px] border-l-0'} 
                    onClick={()=>{
                        if(['Boost', 'Unlocking door'].includes(list[activeCarId-1].type)) return;
                        if(list[activeCarId-1].isReturnStatus) setTabs(true)
                    }}
                >
                    <div className={!list[activeCarId-1].isReturnTrip? "bg-green-400 py-1 px-3 rounded text-white border border-black active:bg-green-300 ": 'bg-red-500 border border-black active:bg-red-400  py-1 px-3 rounded text-white'} onClick={(e)=>{
                        e.stopPropagation()
                        if(list[activeCarId-1].isReturnStatus && list[activeCarId-1].isReturnTrip) {
                            setIsReturnStatus(false)
                            setTabs(false)
                            return setIsReturnTrip(false)
                        }
                        if(list[activeCarId-1].isReturnStatus && !list[activeCarId-1].isReturnTrip) {
                            setTabs(true);
                            return setIsReturnTrip(true)
                        }
                        if(!list[activeCarId-1].isReturnStatus) {
                            setIsReturnStatus(true)
                            setTabs(true)
                        }
                        
                    }}> 
                        {!list[activeCarId-1].isReturnStatus ? `${!isFrench? 'Need return': 'Besion Retour'}` : list[activeCarId-1].isReturnTrip
                            ?!isFrench   ? 'Disable ': 'Désactiver'
                            :!isFrench    ? 'Activate': 'Activer'
                        }
                    </div>
                </div>
            </div>
            <div className='flex bg-white'>
                <div className={!tabs ? 'flex w-full  flex-coll ' : 'hidden w-full '} >
                <TripContent />
                </div>
                <div className={tabs ? 'flex w-full flex-col' : 'hidden w-full '} >
                <ReturnTrip />
                </div>
            </div>
        </section>
    );
};

export default LocationSection;


const carCard = 'flex w-1/2 text-gray-600 z-10 cursor-pointer justify-center  rounded-t-xl border bg-gray-50 py-2 '
const carCardActive = 'flex w-1/2 text-black z-10 cursor-pointer justify-center rounded-t-xl border py-2 bg-white'
const carContainer = 'relative flex w-full  border-t-0  rounded-t-lg ' 

const section = 'flex flex-col w-full justify-between py-8 px-1 max-w-[576px] flex-col '