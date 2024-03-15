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
    const {
        orders,
        setOrder,
    } = useMain()


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
        store.airportArray.map(item => { if (orders[0].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(1,'icon') })
        store.busArray.map(item => { if (orders[0].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(3,'icon') })
        store.trainArray.map(item => { if (orders[0].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(2,'icon') })
        store.boatArray.map(item => { if (orders[0].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(4,'icon') })
        store.hotelArray.map(item => { if (orders[0].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(5,'icon') })
        store.airportArray.map(item => { if (orders[0].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(1,'icon2') })
        store.busArray.map(item => { if (orders[0].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(3,'icon2') })
        store.trainArray.map(item => { if (orders[0].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(2,'icon2') })
        store.boatArray.map(item => { if (orders[0].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(4,'icon2') })
        store.hotelArray.map(item => { if (orders[0].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setOrder(5,'icon2') })

    }, [orders[0].from, orders[0].to])

    return (
        <div className={container}>
            <h1 className={mainHeader}>Create new order</h1>
            <div className={mainType}>
                <div className={mainTypeBox}>
                    <span className={orders[0].type === 1 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(1, 'type')}>{isFrench ? 'Transport' : 'Transport'}</span>
                    <span className={orders[0].type === 2 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(2, 'type')}>{isFrench ? 'Livraison' : 'Delivery'}</span>
                    <span className={orders[0].type === 3 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(3, 'type')}>{isFrench ? 'Survoltage' : 'Boost'}</span>
                    <span className={orders[0].type === 4 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(4, 'type')}>{isFrench ? 'Débarrage de portes' : 'Unlocking doors'}</span>
                </div>
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

const mainHeader = ' w-full text-center uppercase pt-10 mb-2'

const mainType = 'flex flex-col w-full  mb-2 text-xs items-start mb-6 mt-4'
const mainTypeBox = "flex  border-2 border-blue-500 overflow-hidden cursor-pointer"
const mainTypeItem = ' px-2 py-1 font-bold duration-500'
const mainTypeItemActive = ' px-2 py-1 font-bold bg-blue-400 text-white duration-500'

const container = 'flex flex-col w-full mx-[40px] min-h-screen px-6 '



