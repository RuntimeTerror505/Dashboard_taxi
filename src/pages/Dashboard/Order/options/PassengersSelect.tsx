import { useEffect, useState } from "react";
import { Select } from "antd";
import { useMain } from "../../../../Store/useMain";

import { MdDoNotDisturbAlt } from "react-icons/md";

const PassengersSelect = () => {
    const { orders,id, setOrder} = useMain()
    const isFrench = false;
    const years = [1,2,3,4,5,6,7,8,]
    const [maxPass, setMaxPass ] = useState(orders[id].adults + orders[id].kids.length+ orders[id].babies)

    useEffect(()=>{
        setMaxPass(orders[id].adults + orders[id].kids.length+ orders[id].babies)
    },[orders[id].adults, orders[id].kids, orders[id].babies])


    useEffect(()=>{
        const max = orders[id].adults + orders[id].kids.length+ orders[id].babies
        const newArray = [...orders[id].kids]
        newArray.pop()
        if(max>Number(orders[id].totalPass)) {
            orders[id].babies >0
            ? setOrder(orders[id].babies-1, 'babies')
            : orders[id].kids.length>0
            ? setOrder(newArray, 'kids')
            : setOrder(orders[id].adults-1, 'adults')
        }

        if(Number(orders[id].totalPass)>4) setOrder(3, 'carType')

    },[orders[id].totalPass])

    return (

        <div className={optionsContent}>

            <div className={carTypeBox}>
                Car type: 
                <span className={orders[0].carType === 1 ? carTypeItemActive : carTypeItem} onClick={() => setOrder(1, 'carType')}>{isFrench ? 'Sedan' : 'Sedan'}</span>
                <span className={orders[0].carType === 2 ? carTypeItemActive : carTypeItem} onClick={() => setOrder(2, 'carType')}>{isFrench ? 'SUV' : 'SUV'}</span>
                <span className={orders[0].carType === 3 ? carTypeItemActive : carTypeItem} onClick={() => setOrder(3, 'carType')}>{isFrench ? 'VAN' : 'VAN'}</span>
                <span className={mainTypeItem + ' flex items-center text-gray-400'}><MdDoNotDisturbAlt />{isFrench ? 'Limo' : 'Limo'}</span>
            </div>

            <div className={itemRow}>
                
                <span className={passTitle}>Total Passengers:</span>
                <span className={btnQuantity + ' ml-auto'} onClick={() => {
                    if (!Number(orders[0].totalPass)) return;
                    setOrder(Number(orders[0].totalPass) - 1,'totalPass')
                }}>-</span>
                <span className={passNumber}>{orders[0].totalPass}</span>
                <span className={btnQuantity} onClick={() => {
                    if (Number(orders[0].totalPass) >= 7) return
                    setOrder(Number(orders[0].totalPass) + 1,'totalPass')
                }}>+</span>
            </div>

            <div className={itemRow}>

                <span className={passTitle}>Adults</span>
                <span className={btnQuantity + ' ml-auto'} onClick={() => {
                    if (!orders[0].adults) return;
                    setOrder(orders[0].adults - 1,'adults')
                }}>-</span>
                <span className={passNumber}>{orders[0].adults}</span>

                <span className={btnQuantity} onClick={() => {
                    if(maxPass >= +orders[id].totalPass) return;
                    if((orders[id].kids.length + orders[id].adults + orders[id].babies) >=4) setOrder(3, 'carType')
                    if((orders[id].kids.length + orders[id].adults + orders[id].babies)  >= 7) return;
                    setOrder(orders[0].adults + 1,'adults')
                }}>+</span>
            </div>
            <div className={itemRow}>
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

            <div className={itemRow}>
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
        </div>
    );
};

export default PassengersSelect;


const itemRow = 'p-2 flex items-center text-base w-full '
const passTitle = 'text-sm text-gray-600 mr-5 '
const passNumber = 'px-2'
const btnQuantity = ' w-5 shadow h-5 font-black text-lg text-purple-400 rounded-full flex items-center justify-center font-bold cursor-pointer border-2 border-purple-400'
const optionsContent = 'flex flex-col'
const mainTypeItem = ' px-2 py-1 font-bold duration-500'

const carTypeBox = "flex  mb-2 items-center"
const carTypeItem = ' mx-4 border-white border-b-2 cursor-pointer  font-bold duration-500'
const carTypeItemActive = ' mx-4 font-bold border-b-2 border-purple-400 duration-500'