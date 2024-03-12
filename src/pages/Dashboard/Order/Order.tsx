import React, { useEffect } from "react";
import { Select } from "antd";
import { useMain } from "../../../Store/useMain";
import { useStore } from '../../../Store/index';
import TextArea from "antd/es/input/TextArea";
import PersonalInfoSection from "./PersonalInfoSection";
import TripSection from "./TripSection";
import ReturnSection from "./ReturnSection";
import BoostSection from "./BoostSection";
import OptionsSection from "./OptionsSection";


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

    //___________________________________________________FUNCTIONS___________________________________________________________________

    function sendOrder() {
        alert('order sent')
    }


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

            <div className='flex justify-between'>
                <OptionsSection />

                <div className={optionsSection}>
                    <div className='pb-2'>
                        <div className='text-blue-600 w-1/3'>Payment method</div>
                    </div>
                    <div className='pb-2 flex space-x-2'>
                        <span className='flex border h-min pl-3 w-[100px] rounded-lg'>
                            <Select placeholder='Trip type' style={{ width: 200, height: 30, borderRadius: 10 }} value={orders[0].tripType} onChange={(value)=>setOrder(value,'tripType')} options={store.tripList.map(item => ({ value: item, label: item }))} /></span>
                        <span className='flex border h-min pl-3 w-[100px] rounded-lg'>
                            <Select placeholder='Payment method' style={{ width: 200, height: 30, borderRadius: 10 }} value={orders[0].paymentMethod} onChange={(value)=>setOrder(value,'maymentMethod')} options={store.paymentList.map(item => ({ value: item, label: item }))} /></span>
                    </div>
                    <span className={textArea}>
                        <TextArea style={{ borderRadius: '10px' }} rows={2} placeholder='Additional information' onChange={(e) => {
                            setOrder(e.target.value, 'additionalText')
                        }} /></span>

                    <div className="flex space-x-2">
                        <div className={btnGreen} onClick={sendOrder}>confirm</div>
                        <div className={btnPurple}>orders</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Orders;

const mainHeader = ' w-full text-center uppercase pt-10 mb-2'

const textArea = 'flex border h-min w-full rounded-lg mb-4'



const mainType = 'flex flex-col w-full  mb-2 text-xs items-start mb-6 mt-4'
const mainTypeBox = "flex  border-2 border-purple-500 overflow-hidden cursor-pointer"
const mainTypeItem = ' px-2 py-1 font-bold duration-500'
const mainTypeItemActive = ' px-2 py-1 font-bold bg-purple-400 text-white duration-500'


const btnGreen = ' border-2 px-2 py-1 rounded-full border-green-500 font-bold cursor-pointer hover:bg-green-300 self-start'
const btnPurple = ' border-2 px-2 py-1 rounded-full border-purple-500 font-bold cursor-pointer hover:bg-purple-400'

const optionsSection = 'flex flex-col w-[49%] bg-white rounded-xl mb-5 p-4 text-xs shadow-xl'

const container = 'flex flex-col w-full mx-[40px] min-h-screen px-6 '



