import React, { useEffect, useState } from "react";
import { Select } from "antd";
import { useMain } from "../../../Store/useMain";
import { useStore } from '../../../Store/index';

import { PiCalendarCheckLight } from "react-icons/pi";
import useOnclickOutside from "react-cool-onclickoutside";
import dayjs from "dayjs";
import DatePicker from "../../../UI/components/DatePicker";
import TimePicker from '../../../UI/components/TimePicker';
import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import { SlLocationPin } from "react-icons/sl";
import TextArea from "antd/es/input/TextArea";
import { MdDoNotDisturbAlt } from "react-icons/md";
import PersonalInfoSection from "./PersonalInfoSection";
import TripSection from "./TripSection";
import ReturnSection from "./ReturnSection";


const Orders = (): React.ReactNode => {
    const {
        list,
        setOrder,
        setDate,
        setTime,
        setDateNow,
        setTimeType,
        setFrom,
        setFlight,
        setDeparture,

        setIcon,
        setIcon2,
        setFlight2,
        setCarType,
        setTripType,
        setPaymentMethod,

        setAdditionalText,

        setAdults,
        setBaggage,
        setKids,
        setBabies,
    } = useMain()


    const { store } = useStore()

    const isFrench = false;



    const [option, setOption] = useState(1)
    const [isDateOpen, setIsDateOpen] = useState(false)
    const [isDate] = useState(true)
    const [fullDate, setFullDate] = useState(dayjs())
    const [isFrom] = useState(true)
    // const [isTo, setIsTo] = useState(true)
    

    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const years = [1,2,3,4,5,6,7,8,]
    useEffect(() => {
        //if montreal airport is pick up location  we need require departure and flight.
        //if if montreal airport is pick up location we need just show departure and flight.
        //if just airport we need show flight number

        setIcon(0)
        setIcon2(0)
        setFlight({ title: '', prefix: '', number: '' })
        setFlight2({ title: '', prefix: '', number: '' })
        //we try to find word airport|bus|room|train and set Icon
        store.airportArray.map(item => { if (list[0].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(1) })
        store.busArray.map(item => { if (list[0].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(3) })
        store.trainArray.map(item => { if (list[0].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(2) })
        store.boatArray.map(item => { if (list[0].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(4) })
        store.hotelArray.map(item => { if (list[0].from.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(5) })
        store.airportArray.map(item => { if (list[0].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(1) })
        store.busArray.map(item => { if (list[0].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(3) })
        store.trainArray.map(item => { if (list[0].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(2) })
        store.boatArray.map(item => { if (list[0].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(4) })
        store.hotelArray.map(item => { if (list[0].to.split(' ').filter((word) => word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(5) })

    }, [list[0].from, list[0].to])

    //___________________________________________________FUNCTIONS___________________________________________________________________

    function sendOrder() {
        alert('order sent')
    }


    return (
        <div className={container}>
            <h1 className={mainHeader}>Create new order</h1>
            <div className={mainType}>
                <div className={mainTypeBox}>
                    <span className={list[0].type === 1 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(1, 'type')}>{isFrench ? 'Transport' : 'Transport'}</span>
                    <span className={list[0].type === 2 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(2, 'type')}>{isFrench ? 'Livraison' : 'Delivery'}</span>
                    <span className={list[0].type === 3 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(3, 'type')}>{isFrench ? 'Survoltage' : 'Boost'}</span>
                    <span className={list[0].type === 4 ? mainTypeItemActive : mainTypeItem} onClick={() => setOrder(4, 'type')}>{isFrench ? 'Débarrage de portes' : 'Unlocking doors'}</span>
                </div>
            </div>
            <PersonalInfoSection />
            
            <div className='flex justify-between'>
                <TripSection />
                <ReturnSection />

                <div className={(list[0].type > 2) ? trip : 'hidden'}>
                    <div className='flex mb-2'>
                        <div className='text-red-600 mr-2'>helper</div>
                        <div className={mainTypeBox} onClick={() => {
                            if (list[0].dateNow) setTimeType(0)
                            setDateNow(!list[0].dateNow)
                        }}>
                            <span className={list[0].dateNow ? mainTypeItemActive : mainTypeItem}>{isFrench ? 'Maintenant' : 'Now'}</span>
                            <span className={list[0].dateNow ? mainTypeItem : mainTypeItemActive}>{isFrench ? 'Après' : 'Later'}</span>
                        </div>
                    </div>
                    {!list[0].dateNow && <div className={list[0].timeType === 1 ? timeToggle + ' bg-gray-600 ' : timeToggle + ' '}>
                        <div className={list[0].timeType === 0 ? selectTextActive : selectText} onClick={() => setTimeType(0)}>{isFrench ? 'Choisir' : 'Select'}</div>
                        <div className={list[0].timeType === 1 ? amTextActive : amText} onClick={() => setTimeType(1)}>am</div>
                        <div className="absolute border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
                        <div className={list[0].timeType === 2 ? pmTextActive : pmText} onClick={() => setTimeType(2)}>PM</div>
                    </div>}
                    <div className='flex justify-between mb-2'>
                        <div className={isDate ? dateBox : dateBox + ' border-red-500'} onClick={() => setIsDateOpen(true)} ref={ref}>
                            <span className='icon text-xl'><PiCalendarCheckLight /></span>
                            {list[0].date ? <div className='flex items-center'>
                                {fullDate.format('dddd') === 'Monday' ? isFrench ? 'Lundi' : 'Monday'
                                    : fullDate.format('dddd') === 'Tuesday' ? isFrench ? 'Mardi' : 'Tuesday'
                                        : fullDate.format('dddd') === 'Wednesday' ? isFrench ? 'Merceredi' : 'Wednesday'
                                            : fullDate.format('dddd') === 'Thursday' ? isFrench ? 'Jeudi' : 'Thursday'
                                                : fullDate.format('dddd') === 'Friday' ? isFrench ? 'Venderdi' : 'Friday'
                                                    : fullDate.format('dddd') === 'Saturday' ? isFrench ? 'Samedi' : 'Saturday'
                                                        : isFrench ? 'Dimanche' : 'Sunday'},
                                {'  ' + fullDate.format('MMM')}
                                {'.  ' + fullDate.format('D')}{fullDate.format('DD') === '01' || fullDate.format('DD') === '21' || fullDate.format('DD') === '31'
                                    ? 'st'
                                    : fullDate.format('DD') === '02' || fullDate.format('DD') === '22' || fullDate.format('DD') === '32'
                                        ? 'nd'
                                        : fullDate.format('DD') === '03' || fullDate.format('DD') === '23' || fullDate.format('DD') === '33'
                                            ? 'rd'
                                            : 'th'
                                }
                                {' ' + fullDate.format('YYYY')}
                            </div>
                                : <div className='flex items-center'>{isFrench ? 'Date Requise' : 'Required date '}</div>}



                            {isDateOpen && <div className={dateTimeSubmenu}>
                                <DatePicker value={list[0].date || ''} time={list[0].time} onChange={setDate} getFullDate={setFullDate} />
                                <div className="flex justify-between pl-8">
                                    <div className={setDateBtn} onClick={(e) => {
                                        e.stopPropagation();
                                        setIsDateOpen(false)
                                    }}>accept</div>
                                </div>
                            </div>}
                        </div>
                        <TimePicker isAm={list[0].timeType} time={list[0].dateNow ? dayjs().add(30, 'minutes').format('HH:mm') : list[0].time} onChange={setTime} date={list[0].date} />
                    </div>

                    <div className="flex flex-col space-y-2 ">
                        <div className={locationCard}>
                            <div className={isFrom ? locationBox : locationBox + ' border-red-500'}>
                                <span className='icon text-green-500 '><SlLocationPin /></span>
                                <GoogleAddressInput
                                    style='w-full'
                                    defaultLocation={list[0].from || ''}
                                    onChange={setFrom}
                                    placeholder={isFrench ? store.locationListF[0] : store.locationList[0]}
                                />
                            </div>
                            {list[0].icon === 1 &&
                                <div className="border flex items-center w-1/3 rounded py-1">
                                    <Select
                                        className='favorite truncate'
                                        style={{ borderRadius: 5 }}
                                        options={store.departureSections.map(item => (
                                            { value: item, label: item }
                                        ))}
                                        onChange={setDeparture}
                                        placeholder='Departure'
                                    />
                                </div>}
                        </div>
                    </div>

                    <div className="flex pt-4">
                        footer
                    </div>
                </div>

            </div>
            <div className='flex justify-between'>
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
                            <span className={list[0].carType === 1 ? carTypeItemActive : carTypeItem} onClick={() => setCarType(1)}>{isFrench ? 'Sedan' : 'Sedan'}</span>
                            <span className={list[0].carType === 2 ? carTypeItemActive : carTypeItem} onClick={() => setCarType(2)}>{isFrench ? 'SUV' : 'SUV'}</span>
                            <span className={list[0].carType === 3 ? carTypeItemActive : carTypeItem} onClick={() => setCarType(3)}>{isFrench ? 'VAN' : 'VAN'}</span>
                            <span className={mainTypeItem + ' flex items-center rounded-full bg-gray-200'}><MdDoNotDisturbAlt />{isFrench ? 'Limo' : 'Limo'}</span>
                        </div>
                        <div className="p-2 flex items-center text-base w-full ">
                            <span className={passTitle}>Adults</span>
                            <span className={btnQuantity + ' ml-auto'} onClick={() => {
                                if (!list[0].adults) return;
                                setAdults(list[0].adults - 1)
                            }}>-</span>
                            <span className={passNumber}>{list[0].adults}</span>

                            <span className={btnQuantity} onClick={() => {
                                if ((list[0].kids.length + list[0].adults) >= 4) setCarType(3)
                                if ((list[0].kids.length + list[0].adults) >= 7) return;
                                setAdults(list[0].adults + 1)
                            }}>+</span>
                        </div>
                        <div className="p-2 flex items-center text-base w-full ">
                            <span className={passTitle}>Kids</span>
                            <span className={btnQuantity + ' ml-auto'} onClick={() => {
                                if (!list[0].kids.length) return;
                                const newArray = [...list[0].kids]
                                newArray.pop()
                                setKids(newArray)
                            }}>-</span>
                            <span className={passNumber}>{list[0].kids.length}</span>
                            <span className={btnQuantity} onClick={() => {
                                if (!list[0].adults) return;
                                if ((list[0].kids.length + list[0].adults) >= 4) setCarType(3)

                                if ((list[0].kids.length + list[0].adults) >= 7) return;
                                const newKid = 0
                                setKids([...list[0].kids, newKid])
                            }}>+</span>
                        </div>
                        {list[0].kids.length>0 && <div className="flex w-full border shadow-inner rounded-lg bg-gray-50 flex-wrap px-2 py-1">
                            {list[0].kids.map((_,index) => (
                                <div className='flex items-center bg-white rounded-lg shadow px-1 mb-1 mr-1' key={index} onClick={(e) => e.stopPropagation()}>
                                    <span >Kid </span>
                                    <div className=' flex items-center  px-1 rounded'>
                                        <Select
                                            defaultValue='0 years'
                                            style={{ fontSize: '10px'}}
                                            className='yearsSelect'
                                            options={years.map(item => ({ value: item, label: `${item} years ` }))}
                                            onChange={(e) => {
                                                setKids(list[0].kids.map((child, i) => i === index ? Number(e) : child))
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>}

                        <div className="p-2 flex items-center text-base w-full ">
                            <span className={passTitle}>Babies</span>
                            <span className={btnQuantity + ' ml-auto'}>-</span>
                            <span className={passNumber}>{list[0].babies}</span>
                            <span className={btnQuantity} onClick={()=>{
                                if(list[0].babies >= 2 && list[0].carType !== 3) return;
                                if(list[0].babies >= 2) return;
                                if(list[0].babies >= 1 && list[0].adults >5) return;

                                setBabies(list[0].babies + 1)
                            }}>+</span>
                        </div>
                    </div>}
                    {option === 2 && <div className={optionsContent}>
                        {list[0].baggage.map((item) => (
                            <div className="p-2 flex items-center text-base w-full ">

                                <span className={passTitle}>{item.title}</span>
                                <span className={btnQuantity + ' ml-auto'}onClick={()=>{
                                        if(item.quantity <= 0 ) return;
                                        setBaggage(list[0].baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ))
                                    }}>-</span>
                                <span className={passNumber}>{item.quantity}</span>
                                <span className={btnQuantity} onClick={()=>{
                                    if(item.quantity >= 10) return;
                                    setBaggage(list[0].baggage.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ))
                                }}>+</span>
                            </div>
                        ))}
                    </div>}
                    {option === 3 && <div className={optionsContent}>
                        {list[0].carSeats.map(item => (
                            <div className="p-2 flex items-center text-base w-full ">
                                <span className={passTitle}>{item.title}</span>
                                <span className={btnQuantity + ' ml-auto'}>-</span>
                                <span className={passNumber}>{item.quantity}</span>
                                <span className={btnQuantity}>+</span>
                            </div>
                        ))}
                    </div>}
                    {option === 4 && <div className={optionsContent}>
                        {list[0].sport.map(item => (
                            <div className="p-2 flex items-center text-base w-full ">
                                <span className={passTitle}>{item.title}</span>
                                <span className={btnQuantity + ' ml-auto'}>-</span>
                                <span className={passNumber}>{item.quantity}</span>
                                <span className={btnQuantity}>+</span>
                            </div>
                        ))}
                    </div>}
                    {option === 5 && <div className={optionsContent}>
                        {list[0].pets.map(item => (
                            <div className="p-2 flex items-center text-base w-full ">
                                <span className={passTitle}>{item.title}</span>
                                <span className={btnQuantity + ' ml-auto'}>-</span>
                                <span className={passNumber}>{item.quantity}</span>
                                <span className={btnQuantity}>+</span>
                            </div>
                        ))}
                    </div>}
                </div>

                {/* ___________________________________________________PAYMENT_________________________________________________________________*/}
                <div className={optionsSection}>
                    <div className='pb-2'>
                        <div className='text-blue-600 w-1/3'>Payment method</div>
                    </div>
                    <div className='pb-2 flex space-x-2'>
                        <span className='flex border h-min pl-3 w-[100px] rounded-lg'>
                            <Select placeholder='Trip type' style={{ width: 200, height: 30, borderRadius: 10 }} value={list[0].tripType} onChange={setTripType} options={store.tripList.map(item => ({ value: item, label: item }))} /></span>
                        <span className='flex border h-min pl-3 w-[100px] rounded-lg'>
                            <Select placeholder='Payment method' style={{ width: 200, height: 30, borderRadius: 10 }} value={list[0].paymentMethod} onChange={setPaymentMethod} options={store.paymentList.map(item => ({ value: item, label: item }))} /></span>
                    </div>
                    <span className={textArea}>
                        <TextArea style={{ borderRadius: '10px' }} rows={2} placeholder='Additional information' onChange={(e) => {
                            setAdditionalText(e.target.value)
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

const passTitle = 'text-sm text-gray-600 mr-5 '
const passNumber = 'px-2'
const btnQuantity = ' w-5 shadow h-5 font-black text-lg text-purple-400 rounded-full flex items-center justify-center font-bold cursor-pointer border-2 border-purple-400'
const optionsContent = 'flex flex-col'

const locationBox = ' relative flex items-center border rounded-lg shadow-inner w-full mb-2'
const locationCard = 'flex relative items-center w-full  space-x-2'

const pmText = 'px-2 pl-4 rounded-tl triangle flex bg-white items-center py-1 '
const pmTextActive = 'px-2 pl-4 text-white bg-gray-600  rounded-tl triangle flex items-center py-1 '

const amText = 'pl-2  flex items-center py-1 pr-[2px] '
const amTextActive = 'pl-2  flex items-center py-1 pr-[2px] bg-gray-600 text-white '
const timeToggle = 'relative font-bold self-end mb-1 flex  items-center text-xs  cursor-pointer  rounded overflow-hidden border border-black '
const selectText = 'px-2 text-[#0C0B09] bg-gray-200 flex items-center py-1 border-r border-black '
const selectTextActive = 'px-2  bg-gray-600 text-white flex items-center py-1 border-r border-black '


const dateBox = 'flex relative border pr-3 rounded-lg py-1 cursor-pointer'
const setDateBtn = ' border bg-purple-500 hover:bg-purple-400 active:bg-purple-600 shadow-lg cursor-pointer rounded-xl px-3 py-2 flex text-white items-center'
const dateTimeSubmenu = 'absolute  flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow-xl rounded-xl sm:-left-[10px]'

const mainType = 'flex flex-col w-full  mb-2 text-xs items-start mb-6 mt-4'
const mainTypeBox = "flex  border-2 border-purple-500 overflow-hidden cursor-pointer"
const mainTypeItem = ' px-2 py-1 font-bold duration-500'
const mainTypeItemActive = ' px-2 py-1 font-bold bg-purple-400 text-white duration-500'

const carTypeBox = "flex space-x-1"
const carTypeItem = ' px-2 cursor-pointer rounded-full shadow-lg py-1 font-bold duration-500'
const carTypeItemActive = ' px-2 py-1 rounded-full shadow-lg  font-bold bg-purple-400 text-white duration-500'

const btnGreen = ' border-2 px-2 py-1 rounded-full border-green-500 font-bold cursor-pointer hover:bg-green-300 self-start'
const btnPurple = ' border-2 px-2 py-1 rounded-full border-purple-500 font-bold cursor-pointer hover:bg-purple-400'

const optionsSection = 'flex flex-col w-[49%] bg-white rounded-xl mb-5 p-4 text-xs shadow-xl'
const trip = 'flex flex-col w-[49%] bg-white rounded-xl mb-5 p-4 text-xs shadow-xl'

const container = 'flex flex-col w-full mx-[40px] min-h-screen px-6 '



