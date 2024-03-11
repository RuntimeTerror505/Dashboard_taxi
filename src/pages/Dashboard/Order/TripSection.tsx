import { ChangeEvent, useEffect, useState } from 'react';
import { useMain } from '../../../Store/useMain';
import GoogleAddressInput from '../../../UI/components/GoogleAddressInput';
import { Input, Select } from 'antd';
import dayjs from 'dayjs';
import { PiCalendarCheckLight } from 'react-icons/pi';
import DatePicker from '../../../UI/components/DatePicker';
import TimePicker from '../../../UI/components/TimePicker';
import { MdFlightLand, MdFlightTakeoff, MdLocalHotel } from 'react-icons/md';
import { FaBus, FaRegCircleCheck } from 'react-icons/fa6';

import train from '../../../assets/train.png'
import boat from '../../../assets/boat.png'
import { SlLocationPin } from 'react-icons/sl';
import { useStore } from '../../../Store';
import useOnclickOutside from 'react-cool-onclickoutside';
import { FaRegQuestionCircle } from 'react-icons/fa';

const TripSection = () => {
    const { store } = useStore()
    const {list, setOrder} = useMain()
    const [isFrom] = useState(true)
    const ref = useOnclickOutside(() => setIsDateOpen(false));

    const [fullDate, setFullDate] = useState(dayjs())
    const [localStops, setLocalStops] = useState<{ [key: number]: string }>(list[0].stops)
    const [isDateOpen, setIsDateOpen] = useState(false)
    const [stop, setStop] = useState(0)
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
        setStop(Object.values(list[0].stops).filter(i => i.length > 0).length)
    }, [])
    useEffect(() => {
        setOrder(localStops, 'stops')
    }, [localStops])

    const getLength = (data: { [key: string]: string }) => Object.values(data).filter(item => item.length).length
    const sort = (data: { [key: string]: string }) => {
        const newObj: { [key: string]: string } = {}
        Object.values(data).filter(i => i.length).map((item, index) => newObj[index + 1] = item)
        return newObj;
    }
    useEffect(() => {
        if (list[0].dateNow) setOrder(dayjs().format('dd-MM-YYYY'),'date')
    }, [list[0].dateNow])
    const isFrench = false;

    return (
        <div className={(list[0].type < 3) ? trip : 'hidden'}>
        <div className='flex mb-2'>
            <div className='text-red-600 mr-2'>one way</div>
            <div className={list[0].dateNow ? mainTypeBox + ' mb-[30px] ' : mainTypeBox} onClick={() => {
                if (list[0].dateNow) setOrder(0,'timeType')
                setOrder(!list[0].dateNow, 'dateNow')
            }}>
                <span className={list[0].dateNow ? mainTypeItemActive : mainTypeItem}>{isFrench ? 'Maintenant' : 'Now'}</span>
                <span className={list[0].dateNow ? mainTypeItem : mainTypeItemActive}>{isFrench ? 'Après' : 'Later'}</span>
            </div>
            <div className={btnGreen + ' ml-auto'} onClick={() => setOrder(!list[0].isReturnTrip, 'isReturnTrip')}>
                return trip
            </div>
        </div>
        {!list[0].dateNow && <div className={list[0].timeType === 1 ? timeToggle + ' bg-gray-600 ' : timeToggle}>
            <div className={list[0].timeType === 0 ? selectTextActive : selectText} onClick={() => setOrder(0,'timeType')}>{isFrench ? 'Choisir' : 'Select'}</div>
            <div className={list[0].timeType === 1 ? amTextActive : amText} onClick={() => setOrder(1,'timeType')}>am</div>
            <div className="absolute border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
            <div className={list[0].timeType === 2 ? pmTextActive : pmText} onClick={() => setOrder(2,'timeType')}>PM</div>
        </div>}
        <div className='relative flex justify-between mb-2'>
            <div className={list[0].dateNow ? "absolute bg-white opacity-50  top-0 bottom-0 left-0 w-full z-30" : 'hidden'}></div>
            <div className={(list[0].date || list[0].dateNow) ? dateBox : dateBox + ' border-red-500'} onClick={() => setIsDateOpen(true)} ref={ref}>
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
                    <DatePicker value={list[0].date || ''} time={list[0].time} onChange={(value)=>setOrder(value, 'date')} getFullDate={setFullDate} />
                    <div className="flex justify-between pl-8">
                        <div className={setDateBtn} onClick={(e) => {
                            e.stopPropagation();
                            setIsDateOpen(false)
                        }}>accept</div>
                    </div>
                </div>}
            </div>
            <TimePicker isAm={list[0].timeType} time={list[0].dateNow ? dayjs().add(30, 'minutes').format('HH:mm') : list[0].time} onChange={(value)=>setOrder(value, 'time')} date={list[0].date} />
        </div>

        <div className="flex flex-col space-y-2 ">
            <div className={list[0].icon > 0 ? iconsType : 'hidden'}>
                <span className={iconCard}>
                    {list[0].icon === 1
                        ? <MdFlightLand className={iconItem + 'text-xl '} />
                        : list[0].icon === 2
                        ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        : list[0].icon === 3
                        ? <FaBus className={iconItem} />
                        : list[0].icon === 4
                        ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        : <MdLocalHotel className={iconItem + ' text-lg'} />
                    }
                </span>

                <div className={flightCard}>
                    {list[0].icon === 1 &&
                        <Select
                            className='favorite w-1/2 max-h-[30px]'
                            style={{ borderRadius: 5 }}
                            options={store.flights.map(item => (
                                { value: item, label: item }
                            ))}
                            onChange={(e) => {
                                setOrder({ ...list[0].flight, title: e }, 'setFlight')
                            }}
                            placeholder='Airlines'
                        />}

                    {list[0].icon === 1
                        ? <MdFlightLand className='text-xl mx-1 e' />
                        : list[0].icon === 2
                        ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        : list[0].icon === 3
                        ? <FaBus className=' mx-1 sm:text-sm' />
                        : list[0].icon === 4
                        ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        : list[0].icon === 5
                        ? <MdLocalHotel className='mx-1 ' />
                        : <MdFlightTakeoff className='text-xl mx-1 ' />
                    }
                    {list[0].icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {prefixes[list[0].flight.title]}
                    </div>}
                    <Input
                        value={list[0].flight.number}
                        maxLength={4}
                        placeholder={list[0].icon === 1 ? '####' : list[0].icon === 2 ? 'Train#' : list[0].icon === 3 ? "Bus#" : list[0].icon === 4 ? 'Boat#' : 'Room#'}
                        style={{ width: 65, paddingLeft: 0, paddingRight: 0, borderRadius: 0, height: 30 }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setOrder({ ...list[0].flight, number: e.target.value.replace(/\D/g, '') },'flight')
                        }}
                    />
                    {list[0].flight.number.length < 3 && list[0].flight.number.length > 0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                </div>
            </div>
            <div className={locationCard}>
                <div className={locationBox}>
                    <span className='icon text-green-500 '><SlLocationPin /></span>
                    <GoogleAddressInput
                        style='w-full'
                        defaultLocation={list[0].from || ''}
                        onChange={(value)=>setOrder(value, 'from')}
                        placeholder={isFrench ? store.locationListF[0] : store.locationList[0]}
                    />
                </div>
                {list[0].icon === 1 &&
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
            <div className={stopsContent}>
                <div className={stopStepper}>
                    <span className={stop > 0 ? stepperItem : 'hidden'}>{getLength(localStops) > 0 ? <FaRegCircleCheck /> : <FaRegQuestionCircle />}</span>
                    <span className={stop > 1 ? stepperItem : ' hidden'}>{getLength(localStops) > 1 ? <><FaRegCircleCheck /><span className={stepLine}></span></> : <FaRegQuestionCircle />}</span>
                    <span className={stop > 2 ? stepperItem : ' hidden'}>{getLength(localStops) > 2 ? <><FaRegCircleCheck /><span className={stepLine}></span></> : <FaRegQuestionCircle />}</span>
                    <span className={stop > 3 ? stepperItem : ' hidden'}>{getLength(localStops) > 3 ? <><FaRegCircleCheck /><span className={stepLine}></span></> : <FaRegQuestionCircle />}</span>
                </div>

                <div className={stopContainer}>
                    <div className={stop === 0 ? addStopButton : 'hidden'} onClick={() => setStop(1)}>+ stop</div>
                    <div className={stop > 0 ? locationBox : 'hidden'}>
                        <span className='icon text-orange-400'><SlLocationPin /></span>
                        <GoogleAddressInput
                            style='w-full'
                            defaultLocation={localStops[1] || ''}
                            onChange={(e) => setLocalStops({ ...localStops, 1: e })}
                            placeholder={isFrench ? store.locationListF[2] : store.locationList[2]}
                        />
                        <div className={nameClose} onClick={() => {
                            setLocalStops(sort({ ...list[0].stops, 1: '' }))
                            setOrder({ ...list[0].stops, 1: '' },'stops')
                            setStop(stop - 1)
                        }}>+</div>
                    </div>

                    <div className={(stop === 1 && getLength(localStops) > 0) ? addStopButton : 'hidden'} onClick={() => setStop(2)}>+ stop</div>
                    <div className={(stop > 1 && getLength(localStops) > 0) ? locationBox : 'hidden'}>
                        <span className='icon text-orange-400'><SlLocationPin /></span>
                        <GoogleAddressInput
                            style='w-full'
                            defaultLocation={localStops[2] || ''}
                            onChange={(e) => setLocalStops({ ...localStops, 2: e })}
                            placeholder={isFrench ? store.locationListF[3] : store.locationList[3]}
                        />
                        <div className={nameClose} onClick={() => {
                            setLocalStops(sort({ ...list[0].stops, 2: '' }))
                            setOrder({ ...list[0].stops, 2: '' },'stops')
                            setStop(stop - 1)
                        }}>+</div>
                    </div>

                    <div className={(stop === 2 && getLength(localStops) > 1) ? addStopButton : 'hidden'} onClick={() => setStop(3)}>+ stop</div>
                    <div className={(stop > 2 && getLength(localStops) > 1) ? locationBox : 'hidden'}>
                        <span className='icon text-orange-400'><SlLocationPin /></span>
                        <GoogleAddressInput
                            style='w-full'
                            defaultLocation={localStops[3] || ''}
                            onChange={(e) => setLocalStops({ ...localStops, 3: e })}
                            placeholder={isFrench ? store.locationListF[4] : store.locationList[4]}
                        />
                        <div className={nameClose} onClick={() => {
                            setLocalStops(sort({ ...list[0].stops, 3: '' }))
                            setOrder({ ...list[0].stops, 3: '' },'stops')
                            setStop(stop - 1)
                        }}>+</div>
                    </div>

                    <div className={(stop === 3 && getLength(localStops) > 2) ? addStopButton : 'hidden'} onClick={() => setStop(4)}>+ stop</div>
                    <div className={(stop > 3 && getLength(localStops) > 2) ? locationBox : 'hidden'}>
                        <span className='icon text-orange-400'><SlLocationPin /></span>
                        <GoogleAddressInput
                            style='w-full'
                            defaultLocation={localStops[4] || ''}
                            onChange={(e) => setLocalStops({ ...localStops, 4: e })}
                            placeholder={isFrench ? store.locationListF[5] : store.locationList[5]}
                        />
                        <div className={nameClose} onClick={() => {
                            setLocalStops(sort({ ...list[0].stops, 4: '' }))
                            setOrder({ ...list[0].stops, 4: '' },'stops')
                            setStop(stop - 1)
                        }}>+</div>
                    </div>
                </div>
            </div>
            <div className={locationCard}>
                <div className={isFrom ? locationBox : locationBox + ' border-red-500'}>
                    <span className='icon text-green-500 '><SlLocationPin /></span>
                    <GoogleAddressInput
                        style='w-full'
                        defaultLocation={list[0].to || ''}
                        onChange={(value)=> setOrder(value,'to')}
                        placeholder={isFrench ? store.locationListF[0] : store.locationList[0]}
                    />
                </div>
                {list[0].icon2 === 1 &&
                    <div className="border border-purple-500 flex items-center w-1/3 rounded-lg py-1">
                        <Select
                            className='favorite truncate'
                            style={{ borderRadius: 5 }}
                            options={store.departureSections.map(item => (
                                { value: item, label: item }
                            ))}
                            onChange={(value)=>setOrder(value,'departure2')}
                            placeholder='Departure'
                        />
                    </div>}
            </div>

            <div className={list[0].icon2 > 0 ? iconsType : 'hidden'}>
                <span className={iconCard}>
                    {list[0].icon2 === 1
                        ? <MdFlightTakeoff className={iconItem + 'text-xl '} />
                        : list[0].icon2 === 2
                            ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                            : list[0].icon2 === 3
                                ? <FaBus className={iconItem} />
                                : list[0].icon2 === 4
                                    ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                                    : <MdLocalHotel className={iconItem + ' text-lg'} />
                    }
                </span>

                <div className={flightCard}>
                    {list[0].icon2 === 1 &&
                        <Select
                            className='favorite w-1/2 max-h-[30px]'
                            style={{ borderRadius: 5 }}
                            options={store.flights.map(item => (
                                { value: item, label: item }
                            ))}
                            onChange={(e) => {
                                setOrder({ ...list[0].flight2, title: e },'flight2')
                            }}
                            placeholder='Airlines'
                        />}

                    {list[0].icon2 === 1
                        ? <MdFlightTakeoff className='text-xl mx-1 e' />
                        : list[0].icon2 === 2
                        ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        : list[0].icon2 === 3
                        ? <FaBus className=' mx-1 sm:text-sm' />
                        : list[0].icon2 === 4
                        ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        : <MdLocalHotel className='mx-1 ' />
                    }
                    {list[0].icon2 === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {prefixes[list[0].flight2.title]}
                    </div>}
                    <Input
                        value={list[0].flight2.number}
                        maxLength={4}
                        placeholder={list[0].icon2 === 1 ? '####' : list[0].icon2 === 2 ? 'Train#' : list[0].icon2 === 3 ? "Bus#" : list[0].icon2 === 4 ? 'Boat#' : 'Room#'}
                        style={{ width: 65, paddingLeft: 0, paddingRight: 0, borderRadius: 0, height: 30 }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setOrder({ ...list[0].flight2, number: e.target.value.replace(/\D/g, '') }, 'flight')
                        }}
                    />
                    {list[0].flight2.number.length < 3 && list[0].flight2.number.length > 0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                </div>
            </div>

        </div>

    </div>
    );
};

export default TripSection;


const iconCard = 'flex items-center justify-center w-8 h-8 bg-purple-500 shadow-xl text-white rounded-lg'
const iconItem = ' '
const iconsType = 'flex items-center justify-between w-full sm:space-x-0 xl:space-x-4  lg:space-x-4 2xl:space-x-4'
const flightCard = 'flex relative items-center border w-4/5  rounded-lg border-purple-500 py-1'

const addStopButton = 'text-purple-500 cursor-pointer hover:text-purple-700 pl-4 w-[60px]'

const nameClose = ' absolute -top-2 -right-2 px-[6px] rotate-45 py-[2px] text-center bg-rose-600 text-white rounded-full cursor-pointer z-10'

const stepLine = 'absolute border-l border-black h-[75%] -top-[38%]'
const stepperItem = 'relative min-h-[48px] h-1/4 flex items-center justify-center w-full text-purple-500 '
const stopContainer = 'w-[90%] space-y-2'
const stopStepper = 'w-[10%] h-full flex flex-col mt-2'
const stopsContent = ' flex '
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

const mainTypeBox = "flex  border-2 border-purple-500 overflow-hidden cursor-pointer"
const mainTypeItem = ' px-2 py-1 font-bold duration-500'
const mainTypeItemActive = ' px-2 py-1 font-bold bg-purple-400 text-white duration-500'


const btnGreen = ' border-2 px-2 py-1 rounded-full border-green-500 font-bold cursor-pointer hover:bg-green-300 self-start'

const trip = 'flex flex-col w-[49%] bg-white rounded mb-5 p-4 text-xs border'










