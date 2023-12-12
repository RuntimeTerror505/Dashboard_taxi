import { IPet, useMain } from '../../../../Store/useMain';
import {  useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import rabbit from './../../../../assets/rabbit2.png'
import cat from './../../../../assets/cat.png'
import mira from './../../../../assets/serviceDog3.png'
import dog from './../../../../assets/dog.png'
import other from './../../../../assets/pet2.png'

const PetsSelect = () => {
    const {list, activeCarId, setPets} = useMain()
    const [pet,setPet] = useState(list[activeCarId-1].pets[4].title)

    function setOther(item:IPet, e:string){
        setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, title: e} : rem ))
    }

    return (
        <div className={container}>

        {list[activeCarId-1].pets.map((item, index)=>(
            <div className={card} key={item.title}>
                <div className='flex items-center space-x-2'>
                    {(item.title =='Dog')
                    ?<div style={{backgroundImage:`url(${dog})` }} className={'   z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                    :(item.title =='Cat')
                    ?<div style={{backgroundImage:`url(${cat})` }} className={'   z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                    :(item.title =='Rabbit')
                    ?<div style={{backgroundImage:`url(${rabbit})` }} className={'   z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                    :(item.title =='Service dog (Mira)')
                    ? <div style={{backgroundImage:`url(${mira})` }} className={'   z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                    :<div style={{backgroundImage:`url(${other})` }} className={'   z-10 bg-white  text-xs w-6 bg-center h-7 bg-contain bg-no-repeat'} ></div>
                    }
                    
                </div>
                
                <div className='flex flex-col ml-1 w-full'>
                    {item.isOther 
                        ? <input 
                                className=' text-gray-400 w-full  border outline-none' 
                                value={pet} 
                                onChange={(e)=>setPet(e.target.value)}
                                onBlur={(e)=>setOther(item, e.target.value)}
                            />
                        :<span className=' text-gray-400' > {item.title}</span>}
                        {index !==3 && <div className='flex items-center'>
                            <input type="checkbox" 
                                className=' -translate-y-[1px] mr-2 mt-1 ml-1'
                                checked={item.cage} 
                                onChange={()=>{
                                    setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, cage:!rem.cage} : rem ))
                                }}
                            />
                            <span className='text-xs'>(cage)</span>
                        </div>}
                </div>
                <div className={bagCount}>
                        <div className='text-xl text-center w-7'>{item.quantity}</div>
                        <div className={countBox}>
                            <IoIosArrowUp
                                className={button+ ' text-green-500 active:text-green-300'} 
                                onClick={()=>{
                                    if(item.quantity >= 4) return;
                                    setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                                }}
                            />
                            <IoIosArrowDown 
                                className={button+ ' text-red-500 active:text-red-300'} 
                                onClick={()=>{
                                    if(item.quantity === 0) return;
                                    setPets(list[activeCarId-1].pets.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                }}
                            />
                        </div>
                    </div>
                
            </div>
        ))}
        <div className='absolute border-none  -top-4 right-1/2 translate-x-1/2 bg-white px-1  text-blue-500'>Pets</div>

    </div>
    );
};


export default PetsSelect;

const countBox =' flex flex-col space-y-1'
const button = "   cursor-pointer scale-[160%] duration-300 "

const bagCount ='flex  items-center'
const card = 'relative flex  border-blue-500 cursor-pointer text-sm w-full  h-[45px] '
const container = 'relative px-2 flex w-1/2 flex-col divide-y items-center  pt-2  border rounded border-blue-500 h-min'

