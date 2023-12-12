import { useMain } from '../../../../Store/useMain';
import React from 'react';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import bags from '../../../../assets/bags.png'

const BagsSelect = ():React.ReactNode => {
    const {list, activeCarId, setBaggage} = useMain()

    return (
        <div className={container} >
            {list[activeCarId-1].baggage.map((item)=>(
                <div className={card} key={item.title}>
                    <div className='flex items-center'>
                        <span className=' text-gray-400 ml-2'>{item.title}</span>
                    </div>
                    <div className={bagCount}>
                        <div className='text-xl text-center w-7'>{item.quantity}</div>
                        <div className={countBox}>
                            <IoIosArrowUp
                                className={button+ ' text-green-500 active:text-green-300'} 
                                onClick={()=>{
                                    if(item.quantity >= 10) return;
                                    setBaggage(list[activeCarId-1].baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                                }}
                            />
                            <IoIosArrowDown 
                                className={button+ ' text-red-500 active:text-red-300'} 
                                onClick={()=>{
                                        if(item.quantity <= 0 ) return;
                                        setBaggage(list[activeCarId-1].baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                    }}
                                
                            />
                        </div>
                        
                    </div>
                </div>
            ))}
            <div className='absolute -top-5 right-1/2 translate-x-1/2 border-none px-[2px] flex bg-white'>
                <div style={{backgroundImage:`url(${bags})` }} className={' z-10 bg-white  text-blue-500 w-7 bg-center h-8 bg-contain bg-no-repeat'} ></div>
            </div>
            
        </div>
    );
};
export default BagsSelect;

const countBox =' flex flex-col space-y-1'
const button = "   cursor-pointer scale-[160%]  duration-300 "
const bagCount ='flex space-x-1 ml-auto items-center'
const card = 'relative flex pr-3 py-2 cursor-pointer border-blue-500 text-sm w-full h-[45px] '
const container = 'relative rounded px-2 flex w-1/2 pt-2 divide-y flex-col items-center border border-blue-500'
