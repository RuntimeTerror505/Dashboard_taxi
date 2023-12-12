import { useMain } from '../../../../Store/useMain';
import React from 'react';
import { IoIosArrowUp,IoIosArrowDown } from "react-icons/io";
import surfer from './../../../../assets/surfing.png'
import golfer from './../../../../assets/golf.png'
import ski from './../../../../assets/ski.png'
import bike from './../../../../assets/bike.png'

const SportsSelect = ():React.ReactNode => {
    const {list, activeCarId, setSport} = useMain()


    return (
        <div className={container}>

            {list[activeCarId-1].sport.map((item)=>(
                <div className={card} key={item.title}>
                    <div className='flex items-center space-x-2'>
                        {(item.title =='Bikes')
                        ?<div style={{backgroundImage:`url(${bike})` }} className={'   z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                        :(item.title =='Skis')
                        ?<div style={{backgroundImage:`url(${ski})` }} className={'   z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                        :(item.title =='Surf')
                        ?<div style={{backgroundImage:`url(${surfer})` }} className={'   z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                        :<div style={{backgroundImage:`url(${golfer})` }} className={'   z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>}
                        <span className=' text-gray-400' > {item.title}</span>
                    </div>
                    <div className={bagCount}>
                        <div className='text-xl text-center w-7'>{item.quantity}</div>
                        <div className={countBox}>
                            <IoIosArrowUp
                                className={button+ ' text-green-500 active:text-green-300'} 
                                onClick={()=>{
                                    if(item.quantity >= 4) return;
                                    setSport(list[activeCarId-1].sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                                }}
                            />
                            <IoIosArrowDown 
                                className={button+ ' text-red-500 active:text-red-300'} 
                                onClick={()=>{
                                    if(item.title === list[activeCarId-1].sport[0].title && item.quantity <= 0) return;
                                    if(item.quantity <= 0 ) return setSport(list[activeCarId-1].sport.map(rem=>item.title === rem.title ? {...rem, isActive: false} : rem ))
                                        setSport(list[activeCarId-1].sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            />
                        </div>
                    </div>

                </div>
            ))}
            <div className='absolute  -top-4 right-1/2 translate-x-1/2 bg-white px-1 text-blue-500 border-white'>Sport</div>

        </div>
    );
};

export default SportsSelect;


const countBox =' flex flex-col space-y-1'
const button = "   cursor-pointer scale-[160%] duration-300 "

const bagCount ='flex space-x-1 ml-auto items-center'
const card = 'relative flex pr-4  text-sm cursor-pointer w-full h-[45px] border-blue-500'
const container = 'relative flex px-2 w-1/2 flex-col items-center pt-2 divide-y border border-blue-500 rounded h-min'