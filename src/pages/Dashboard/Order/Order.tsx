import React, { useEffect } from "react";
import { useMain } from "../../../Store/useMain";
import { useStore } from '../../../Store/index';
import PersonalInfoSection from "./PersonalInfoSection";
import TripSection from "./TripSection";
import ReturnSection from "./ReturnSection";
import BoostSection from "./BoostSection";
import OptionsSection from "./options/OptionsSection";
import PaymentSection from "./PaymentSection";


const Orders = (): React.ReactNode => {
    const { orders, id, setOrder, addNewCar, setId, removeCar } = useMain()
    const { store } = useStore()
    const isFrench = false;

    useEffect(() => {
        //if montreal airport is pick up location  we need require departure and flight.
        //if if montreal airport is pick up location we need just show departure and flight.
        //if just airport we need show flight number

        setOrder(0, 'icon')
        setOrder(0, 'icon2')
        setOrder({ title: '', prefix: '', number: '' },'flight')
        setOrder({ title: '', prefix: '', number: '' },'flight2')
        //we try to find word airport|bus|room|train and set Icon
        store.airportArray.map(item => { if (orders[id].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(1,'icon') })
        store.busArray.map(item => { if (orders[id].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(3,'icon') })
        store.trainArray.map(item => { if (orders[id].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(2,'icon') })
        store.boatArray.map(item => { if (orders[id].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(4,'icon') })
        store.hotelArray.map(item => { if (orders[id].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(5,'icon') })
        store.airportArray.map(item => { if (orders[id].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(1,'icon2') })
        store.busArray.map(item => { if (orders[id].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(3,'icon2') })
        store.trainArray.map(item => { if (orders[id].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(2,'icon2') })
        store.boatArray.map(item => { if (orders[id].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(4,'icon2') })
        store.hotelArray.map(item => { if (orders[id].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(5,'icon2') })

    }, [orders[id].from, orders[id].to])
    return (
        <div className={container}>
            <header className={header}>
                <h1 className={mainHeader}>{orders[id].isEdit? "Edit order" : 'Create new order' }</h1>
                <nav className={orders[id].isEdit? 'hidden' : carSelect}>
                    {orders.map((item,index) => <div onClick={()=>setId(index)} className={index===id? carSelectItemActive: carSelectItem}>CAR {item.id}</div>)}
                    <div 
                        className={orders.length<5 ?carSelectItem: 'hidden'}
                        onClick={()=>{
                            addNewCar()
                            setId(orders.length)
                        }}
                    >+</div>
                </nav>
                <span className={carID}>id {orders[id].id}</span>
            </header>
            <div className={mainType}>
                <div className={mainTypeBox}>
                    <span className={orders[id].type === 1 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(1, 'type')}>{isFrench ? 'Transport' : 'Transport'}</span>
                    <span className={orders[id].type === 2 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(2, 'type')}>{isFrench ? 'Livraison' : 'Delivery'}</span>
                    <span className={orders[id].type === 3 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(3, 'type')}>{isFrench ? 'Survoltage' : 'Boost'}</span>
                    <span className={orders[id].type === 4 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(4, 'type')}>{isFrench ? 'Débarrage de portes' : 'Unlocking doors'}</span>
                </div>
                <button 
                    className={orders.length===1 ? 'hidden' : removeCarButton}
                    onClick={()=>{
                        if(orders.at(-1)?.id === id+1) setId(id-1)
                        removeCar(id)
                    }}
                >remove car</button>
            </div>
            <PersonalInfoSection />
            
            <div className='flex justify-between'>
                <TripSection />
                <ReturnSection />
                <BoostSection />
            </div>

            <OptionsSection />
            <PaymentSection />
        </div>
    );
};

export default Orders;


const removeCarButton = ' px-4 py-1 bg-red-500 text-white rounded border-b-2 border-l-2 border-red-600 hover:bg-red-400 hover:border-red-500'
const carSelect = 'flex space-x-2'
const carSelectItem = 'border px-4 py-2 border-gray-700 rounded-lg flex items-center cursor-pointer '
const carSelectItemActive = 'border px-4 py-2 border-blue-700 bg-blue-500 text-white rounded-lg flex items-center cursor-pointer '
const carID = ' px-4 py-1 bg-gray-300 rounded-xl ml-auto'
const header = 'flex py-6 pt-8 items-center border-b'

const mainHeader = '  text-center uppercase m-0 w-[200px]'

const mainType = 'flex justify-between w-full  mb-2 text-xs items-start mb-6 mt-4'
const mainTypeBox = "flex  border-2 border-blue-500 overflow-hidden cursor-pointer"
const mainTypeItem = ' px-2 py-1 font-bold duration-500'
const mainTypeItemActive = ' px-2 py-1 font-bold bg-blue-400 text-white duration-500'

const container = 'flex flex-col w-full mx-[40px] min-h-screen px-6 '



