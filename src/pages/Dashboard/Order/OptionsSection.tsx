import  { useState } from "react";
import { Select } from "antd";
import { useMain } from "../../../Store/useMain";

import { MdDoNotDisturbAlt } from "react-icons/md";

const OptionsSection = () => {
    const { orders, setOrder} = useMain()
    const [option, setOption] = useState(1)
    const isFrench = false;
    const years = [1,2,3,4,5,6,7,8,]
    return (
        <div className={optionsSection}>
        <div className='pb-2 flex'>
            <div className={mainTypeBox + ' mb-4 '}>
                <span className={option === 1 ? mainTypeItemActive : mainTypeItem} onClick={() => setOption(1)}>{isFrench ? 'Passengers' : 'Passengers'}</span>
                <span className={option === 2 ? mainTypeItemActive : mainTypeItem} onClick={() => setOption(2)}>{isFrench ? 'Baggage' : 'Baggage'}</span>
                <span className={option === 3 ? mainTypeItemActive : mainTypeItem} onClick={() => setOption(3)}>{isFrench ? 'Car seats' : 'Car seats'}</span>
                <span className={option === 4 ? mainTypeItemActive : mainTypeItem} onClick={() => setOption(4)}>{isFrench ? 'Sport' : 'Sport'}</span>
                <span className={option === 5 ? mainTypeItemActive : mainTypeItem} onClick={() => setOption(5)}>{isFrench ? 'Pets' : 'Pets'}</span>
            </div>
        </div>
        {option === 1 && <div className={optionsContent}>
            <div className={carTypeBox + ' self-start mb-4'}>
                <span className={orders[0].carType === 1 ? carTypeItemActive : carTypeItem} onClick={() => setOrder(1, 'carType')}>{isFrench ? 'Sedan' : 'Sedan'}</span>
                <span className={orders[0].carType === 2 ? carTypeItemActive : carTypeItem} onClick={() => setOrder(2, 'carType')}>{isFrench ? 'SUV' : 'SUV'}</span>
                <span className={orders[0].carType === 3 ? carTypeItemActive : carTypeItem} onClick={() => setOrder(3, 'carType')}>{isFrench ? 'VAN' : 'VAN'}</span>
                <span className={mainTypeItem + ' flex items-center rounded-full bg-gray-200'}><MdDoNotDisturbAlt />{isFrench ? 'Limo' : 'Limo'}</span>
            </div>
            <div className="p-2 flex items-center text-base w-full ">
                <span className={passTitle}>Adults</span>
                <span className={btnQuantity + ' ml-auto'} onClick={() => {
                    if (!orders[0].adults) return;
                    setOrder(orders[0].adults - 1,'adults')
                }}>-</span>
                <span className={passNumber}>{orders[0].adults}</span>

                <span className={btnQuantity} onClick={() => {
                    if ((orders[0].kids.length + orders[0].adults) >= 4) setOrder(3, 'carType')
                    if ((orders[0].kids.length + orders[0].adults) >= 7) return;
                    setOrder(orders[0].adults + 1,'adults')
                }}>+</span>
            </div>
            <div className="p-2 flex items-center text-base w-full ">
                <span className={passTitle}>Kids</span>
                <span className={btnQuantity + ' ml-auto'} onClick={() => {
                    if (!orders[0].kids.length) return;
                    const newArray = [...orders[0].kids]
                    newArray.pop()
                    setOrder(newArray, 'kids')
                }}>-</span>
                <span className={passNumber}>{orders[0].kids.length}</span>
                <span className={btnQuantity} onClick={() => {
                    if (!orders[0].adults) return;
                    if ((orders[0].kids.length + orders[0].adults) >= 4) setOrder(3, 'carType')

                    if ((orders[0].kids.length + orders[0].adults) >= 7) return;
                    const newKid = 0
                    setOrder([...orders[0].kids, newKid], 'kids')
                }}>+</span>
            </div>
            {orders[0].kids.length>0 && <div className="flex w-full border shadow-inner rounded-lg bg-gray-50 flex-wrap px-2 py-1">
                {orders[0].kids.map((_,index) => (
                    <div className='flex items-center bg-white rounded-lg shadow px-1 mb-1 mr-1' key={index} onClick={(e) => e.stopPropagation()}>
                        <span >Kid </span>
                        <div className=' flex items-center  px-1 rounded'>
                            <Select
                                defaultValue='0 years'
                                style={{ fontSize: '10px'}}
                                className='yearsSelect'
                                options={years.map(item => ({ value: item, label: `${item} years ` }))}
                                onChange={(e) => {
                                    setOrder(orders[0].kids.map((child, i) => i === index ? Number(e) : child), 'kids')
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>}

            <div className="p-2 flex items-center text-base w-full ">
                <span className={passTitle}>Babies</span>
                <span className={btnQuantity + ' ml-auto'}>-</span>
                <span className={passNumber}>{orders[0].babies}</span>
                <span className={btnQuantity} onClick={()=>{
                    if(orders[0].babies >= 2 && orders[0].carType !== 3) return;
                    if(orders[0].babies >= 2) return;
                    if(orders[0].babies >= 1 && orders[0].adults >5) return;

                    setOrder(orders[0].babies + 1, 'babies')
                }}>+</span>
            </div>
        </div>}
        {option === 2 && <div className={optionsContent}>
            {orders[0].baggage.map((item) => (
                <div className="p-2 flex items-center text-base w-full ">

                    <span className={passTitle}>{item.title}</span>
                    <span className={btnQuantity + ' ml-auto'}onClick={()=>{
                            if(item.quantity <= 0 ) return;
                            setOrder(orders[0].baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ), 'baggage')
                        }}>-</span>
                    <span className={passNumber}>{item.quantity}</span>
                    <span className={btnQuantity} onClick={()=>{
                        if(item.quantity >= 10) return;
                        setOrder(orders[0].baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ), 'baggage')
                    }}>+</span>
                </div>
            ))}
        </div>}
        {option === 3 && <div className={optionsContent}>
            {orders[0].carSeats.map(item => (
                <div className="p-2 flex items-center text-base w-full ">
                    <span className={passTitle}>{item.title}</span>
                    <span className={btnQuantity + ' ml-auto'}>-</span>
                    <span className={passNumber}>{item.quantity}</span>
                    <span className={btnQuantity}>+</span>
                </div>
            ))}
        </div>}
        {option === 4 && <div className={optionsContent}>
            {orders[0].sport.map(item => (
                <div className="p-2 flex items-center text-base w-full ">
                    <span className={passTitle}>{item.title}</span>
                    <span className={btnQuantity + ' ml-auto'}>-</span>
                    <span className={passNumber}>{item.quantity}</span>
                    <span className={btnQuantity}>+</span>
                </div>
            ))}
        </div>}
        {option === 5 && <div className={optionsContent}>
            {orders[0].pets.map(item => (
                <div className="p-2 flex items-center text-base w-full ">
                    <span className={passTitle}>{item.title}</span>
                    <span className={btnQuantity + ' ml-auto'}>-</span>
                    <span className={passNumber}>{item.quantity}</span>
                    <span className={btnQuantity}>+</span>
                </div>
            ))}
        </div>}
    </div>
    );
};

export default OptionsSection;

const passTitle = 'text-sm text-gray-600 mr-5 '
const passNumber = 'px-2'
const btnQuantity = ' w-5 shadow h-5 font-black text-lg text-purple-400 rounded-full flex items-center justify-center font-bold cursor-pointer border-2 border-purple-400'
const optionsContent = 'flex flex-col'
const mainTypeBox = "flex  border-2 border-purple-500 overflow-hidden cursor-pointer"
const mainTypeItem = ' px-2 py-1 font-bold duration-500'
const mainTypeItemActive = ' px-2 py-1 font-bold bg-purple-400 text-white duration-500'

const carTypeBox = "flex space-x-1"
const carTypeItem = ' px-2 cursor-pointer rounded-full shadow-lg py-1 font-bold duration-500'
const carTypeItemActive = ' px-2 py-1 rounded-full shadow-lg  font-bold bg-purple-400 text-white duration-500'

const optionsSection = 'flex flex-col w-[49%] bg-white rounded-xl mb-5 p-4 text-xs shadow-xl'

