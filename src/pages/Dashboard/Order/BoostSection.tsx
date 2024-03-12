import { ChangeEvent, useEffect, useState } from 'react';
import { useMain } from '../../../Store/useMain';
import GoogleAddressInput from '../../../UI/components/GoogleAddressInput';
import { Input, Select } from 'antd';
import dayjs from 'dayjs';
import { PiCalendarCheckLight } from 'react-icons/pi';
import DatePicker from '../../../UI/components/DatePicker';
import TimePicker from '../../../UI/components/TimePicker';
import { MdFlightLand, MdFlightTakeoff, MdLocalHotel } from 'react-icons/md';
import { FaBus } from 'react-icons/fa6';

import train from '../../../assets/train.png'
import boat from '../../../assets/boat.png'
import { SlLocationPin } from 'react-icons/sl';
import { useStore } from '../../../Store';
import useOnclickOutside from 'react-cool-onclickoutside';

const BoostSection = () => {
    const { store } = useStore()
    const {orders, id, setOrder} = useMain()
    const ref = useOnclickOutside(() => setIsDateOpen(false));

    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    
    const prefixes: { [key: string]: string } = {
        'AIR CANADA': "AC",
        'Air Transat': "AT",
        'PAL airlines': "PA",
        'Air Inuit': "AI",
        'Porter': "PO",
        'UNITED': "UN",
        'CANADIAN NORTH': "CN",
        'American Airlines': "AA",
        'Emirates': "EM",
        'arajet': "AR",
        'DELTA': "DE",
        'flair': "FL",
        'AIR ALGERIE': "AL",
        'TUNISAIR': "TU",
        'SWISS': "SW",
        'Austrian': "AU",
        'Air Saint-Pierre': "SP",
        'AIRFRANCE': "AF",
        'KLM': "KLM",
        'Lufthansa': "LU",
        'Royal Air MAroc(RAM)': "MA",
        'BRITISH AIRWAYS': "BA",
        'AeroMexico': "AM",
        'CopaAirlines': "CO",
        'Lynx': "LY",
        'SUNWING': "SNW",
        'QATAR': "QT",
        'RAM': "RAM",
        'Another': "",
        "": '',
    }

    useEffect(() => {
        if (orders[id].dateNow) setOrder(dayjs().format('MM/DD/YYYY'),'date')
    }, [orders[id].dateNow])
    const isFrench = false;

    return (
        <div className={(orders[0].type >2) ? trip : 'hidden'}>
        <div className='flex mb-2'>
            <div className='text-red-600 mr-2'>one way</div>
            <div className={ mainTypeBox} onClick={() => {
                if (orders[0].dateNow) setOrder(0,'timeType')
                setOrder(!orders[0].dateNow, 'dateNow')
            }}>
                <span className={orders[0].dateNow ? mainTypeItemActive : mainTypeItem}>{isFrench ? 'Maintenant' : 'Now'}</span>
                <span className={orders[0].dateNow ? mainTypeItem : mainTypeItemActive}>{isFrench ? 'Après' : 'Later'}</span>
            </div>
        </div>

        <div className='relative flex justify-between mb-2'>
            <div className={orders[0].dateNow ? "absolute bg-white opacity-50  top-0 bottom-0 left-0 w-full z-30" : 'hidden'}></div>
            <div className={(orders[0].date || orders[0].dateNow) ? dateBox : dateBox + ' border-red-500'} onClick={() => setIsDateOpen(true)} ref={ref}>
                <span className='icon text-xl'><PiCalendarCheckLight /></span>
                {orders[0].date ? <div className='flex items-center'>
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
                    <DatePicker value={orders[0].date || ''} time={orders[0].time} onChange={(value)=>setOrder(value, 'date')} getFullDate={setFullDate} />
                    <div className="flex justify-between pl-8">
                        <div className={setDateBtn} onClick={(e) => {
                            e.stopPropagation();
                            setIsDateOpen(false)
                        }}>accept</div>
                    </div>
                </div>}
            </div>
            <TimePicker time={orders[0].dateNow ? dayjs().add(30, 'minutes').format('HH:mm') : orders[0].time} onChange={(value)=>setOrder(value, 'time')} date={orders[0].date} />
        </div>

        <div className="flex flex-col space-y-2 ">
            <div className={orders[0].icon > 0 ? iconsType : 'hidden'}>
                <span className={iconCard}>
                    {orders[0].icon === 1
                        ? <MdFlightLand className={iconItem + 'text-xl '} />
                        : orders[0].icon === 2
                        ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        : orders[0].icon === 3
                        ? <FaBus className={iconItem} />
                        : orders[0].icon === 4
                        ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        : <MdLocalHotel className={iconItem + ' text-lg'} />
                    }
                </span>

                <div className={flightCard}>
                    {orders[0].icon === 1 &&
                        <Select
                            className='favorite w-1/2 max-h-[30px]'
                            style={{ borderRadius: 5 }}
                            options={store.flights.map(item => (
                                { value: item, label: item }
                            ))}
                            onChange={(e) => {
                                setOrder({ ...orders[0].flight, title: e }, 'setFlight')
                            }}
                            placeholder='Airlines'
                        />}

                    {orders[0].icon === 1
                        ? <MdFlightLand className='text-xl mx-1 e' />
                        : orders[0].icon === 2
                        ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        : orders[0].icon === 3
                        ? <FaBus className=' mx-1 sm:text-sm' />
                        : orders[0].icon === 4
                        ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        : orders[0].icon === 5
                        ? <MdLocalHotel className='mx-1 ' />
                        : <MdFlightTakeoff className='text-xl mx-1 ' />
                    }
                    {orders[0].icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {prefixes[orders[0].flight.title]}
                    </div>}
                    <Input
                        value={orders[0].flight.number}
                        maxLength={4}
                        placeholder={orders[0].icon === 1 ? '####' : orders[0].icon === 2 ? 'Train#' : orders[0].icon === 3 ? "Bus#" : orders[0].icon === 4 ? 'Boat#' : 'Room#'}
                        style={{ width: 65, paddingLeft: 0, paddingRight: 0, borderRadius: 0, height: 30 }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setOrder({ ...orders[0].flight, number: e.target.value.replace(/\D/g, '') },'flight')
                        }}
                    />
                    {orders[0].flight.number.length < 3 && orders[0].flight.number.length > 0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                </div>
            </div>
            <div className={locationCard}>
                <div className={locationBox}>
                    <span className='icon text-green-500 '><SlLocationPin /></span>
                    <GoogleAddressInput
                        style='w-full'
                        defaultLocation={orders[0].from || ''}
                        onChange={(value)=>setOrder(value, 'from')}
                        placeholder={isFrench ? store.locationListF[0] : store.locationList[0]}
                    />
                </div>
                {orders[0].icon === 1 &&
                    <div className="border border-purple-500 flex items-center w-1/3 rounded-lg py-1">
                        <Select
                            className='favorite truncate'
                            style={{ borderRadius: 5 }}
                            options={store.departureSections.map(item => (
                                { value: item, label: item }
                            ))}
                            onChange={(value)=>setOrder(value,'departure')}
                            placeholder='Departure'
                        />
                    </div>}
            </div>
            
            <div className={orders[0].icon2 > 0 ? iconsType : 'hidden'}>
                <span className={iconCard}>
                    {orders[0].icon2 === 1
                        ? <MdFlightTakeoff className={iconItem + 'text-xl '} />
                        : orders[0].icon2 === 2
                        ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        : orders[0].icon2 === 3
                        ? <FaBus className={iconItem} />
                        : orders[0].icon2 === 4
                        ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        : <MdLocalHotel className={iconItem + ' text-lg'} />
                    }
                </span>

                <div className={flightCard}>
                    {orders[0].icon2 === 1 &&
                        <Select
                            className='favorite w-1/2 max-h-[30px]'
                            style={{ borderRadius: 5 }}
                            options={store.flights.map(item => (
                                { value: item, label: item }
                            ))}
                            onChange={(e) => {
                                setOrder({ ...orders[0].flight2, title: e },'flight2')
                            }}
                            placeholder='Airlines'
                        />}

                    {orders[0].icon2 === 1
                        ? <MdFlightTakeoff className='text-xl mx-1 e' />
                        : orders[0].icon2 === 2
                        ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        : orders[0].icon2 === 3
                        ? <FaBus className=' mx-1 sm:text-sm' />
                        : orders[0].icon2 === 4
                        ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        : <MdLocalHotel className='mx-1 ' />
                    }
                    {orders[0].icon2 === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {prefixes[orders[0].flight2.title]}
                    </div>}
                    <Input
                        value={orders[0].flight2.number}
                        maxLength={4}
                        placeholder={orders[0].icon2 === 1 ? '####' : orders[0].icon2 === 2 ? 'Train#' : orders[0].icon2 === 3 ? "Bus#" : orders[0].icon2 === 4 ? 'Boat#' : 'Room#'}
                        style={{ width: 65, paddingLeft: 0, paddingRight: 0, borderRadius: 0, height: 30 }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setOrder({ ...orders[0].flight2, number: e.target.value.replace(/\D/g, '') }, 'flight')
                        }}
                    />
                    {orders[0].flight2.number.length < 3 && orders[0].flight2.number.length > 0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                </div>
            </div>

        </div>

    </div>
    );
};

export default BoostSection;

const iconCard = 'flex items-center justify-center w-8 h-8 bg-purple-500 shadow-xl text-white rounded-lg'
const iconItem = ' '
const iconsType = 'flex items-center justify-between w-full sm:space-x-0 xl:space-x-4  lg:space-x-4 2xl:space-x-4'
const flightCard = 'flex relative items-center border w-4/5  rounded-lg border-purple-500 py-1'

const locationBox = ' relative flex items-center border rounded-lg shadow-inner w-full mb-2'
const locationCard = 'flex relative items-center w-full  space-x-2'
const dateBox = 'flex relative border pr-3 rounded-lg py-1 cursor-pointer'
const setDateBtn = ' border bg-purple-500 hover:bg-purple-400 active:bg-purple-600 shadow-lg cursor-pointer rounded-xl px-3 py-2 flex text-white items-center'
const dateTimeSubmenu = 'absolute  flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow-xl rounded-xl sm:-left-[10px]'

const mainTypeBox = "flex mb-4  border-2 border-purple-500 overflow-hidden cursor-pointer"
const mainTypeItem = ' px-2 py-1 font-bold duration-500'
const mainTypeItemActive = ' px-2 py-1 font-bold bg-purple-400 text-white duration-500'

const trip = 'flex flex-col w-[49%] bg-white rounded mb-5 p-4 text-xs border'










