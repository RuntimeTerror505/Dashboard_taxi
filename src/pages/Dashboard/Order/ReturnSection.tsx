import { ChangeEvent, useEffect, useState } from 'react';
import { useStore } from '../../../Store';
import { useMain } from '../../../Store/useMain';
import { PiCalendarCheckLight } from 'react-icons/pi';
import GoogleAddressInput from '../../../UI/components/GoogleAddressInput';
import { SlLocationPin } from 'react-icons/sl';
import { MdFlightTakeoff, MdLocalHotel } from 'react-icons/md';
import { FaBus, FaRegCircleCheck } from 'react-icons/fa6';
import { MdFlightLand } from 'react-icons/md';
import { Input, Select } from 'antd';
import TimePicker from '../../../UI/components/TimePicker';
import DatePicker from '../../../UI/components/DatePicker';
import useOnclickOutside from 'react-cool-onclickoutside';
import dayjs from 'dayjs';
import train from '../../../assets/train.png'
import boat from '../../../assets/boat.png'
import { FaRegQuestionCircle } from 'react-icons/fa';

interface IObj { [key: number]: string }

const ReturnSection = () => {
    const { store } = useStore()
    const {list, setOrder} = useMain()
    const [isDate] = useState(true)

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
    const [stopR, setStopR] = useState(0)
    const [returnStops, setReturnStops] = useState<{ [key: number]: string }>(list[0].stopsR)
    const [fullDateR, setFullDateR] = useState(dayjs())
    const [isDateOpenR, setIsDateOpenR] = useState(false)
    const [stopTrigger, setStopTrigger] = useState(false)

    const isFrench = false;
    useEffect(() => {
        setOrder(returnStops,'stopsR')
    }, [returnStops])
    const refR = useOnclickOutside(() => setIsDateOpenR(false));

    useEffect(() => {
        if (!stopTrigger) {
            const values = Object.values(list[0].stops).filter(value => value).reverse()
            const data: IObj = {}
            values.map((item, index) => {
                const number = index + 1;
                data[number] = item;
                if (item) { setReturnStops(data) }
            })
            setOrder(list[0].to,'toR')
            setOrder(list[0].from,'fromR')
            setOrder(values.length,'stopsR')
        }
    }, [list[0].stops, list[0].from, list[0].to])
    const getLength = (data: { [key: string]: string }) => Object.values(data).filter(item => item.length).length

    const sort = (data: { [key: string]: string }) => {
        const newObj: { [key: string]: string } = {}
        Object.values(data).filter(i => i.length).map((item, index) => newObj[index + 1] = item)
        return newObj;
    }
    return (
        <div className={(list[0].type < 3 && list[0].isReturnTrip) ? trip : 'hidden'}>
        <div className='flex mb-5'>
            <div className='text-red-600 mr-2 '>return</div>
        </div>
        <div className={list[0].timeTypeR === 1 ? timeToggle + ' bg-gray-600 ' : timeToggle + ' '}>
            <div className={list[0].timeTypeR === 0 ? selectTextActive : selectText} onClick={() => setOrder(0,'timeTypeR')}>{isFrench ? 'Choisir' : 'Select'}</div>
            <div className={list[0].timeTypeR === 1 ? amTextActive : amText} onClick={() => setOrder(1,'timeTypeR')}>am</div>
            <div className="absolute border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
            <div className={list[0].timeTypeR === 2 ? pmTextActive : pmText} onClick={() => setOrder(2,'timeTypeR')}>PM</div>
        </div>
        <div className='flex justify-between mb-2'>
            <div className={isDate ? dateBox : dateBox + ' border-red-500'} onClick={() => setIsDateOpenR(true)} ref={refR}>
                <span className='icon text-xl'><PiCalendarCheckLight /></span>
                {list[0].dateR ? <div className='flex items-center'>
                    {fullDateR.format('dddd') === 'Monday' ? isFrench ? 'Lundi' : 'Monday'
                    : fullDateR.format('dddd') === 'Tuesday' ? isFrench ? 'Mardi' : 'Tuesday'
                    : fullDateR.format('dddd') === 'Wednesday' ? isFrench ? 'Merceredi' : 'Wednesday'
                    : fullDateR.format('dddd') === 'Thursday' ? isFrench ? 'Jeudi' : 'Thursday'
                    : fullDateR.format('dddd') === 'Friday' ? isFrench ? 'Venderdi' : 'Friday'
                    : fullDateR.format('dddd') === 'Saturday' ? isFrench ? 'Samedi' : 'Saturday'
                    : isFrench ? 'Dimanche' : 'Sunday'},
                    {'  ' + fullDateR.format('MMM')}
                    {'.  ' + fullDateR.format('D')}{fullDateR.format('DD') === '01' || fullDateR.format('DD') === '21' || fullDateR.format('DD') === '31'
                        ? 'st'
                        : fullDateR.format('DD') === '02' || fullDateR.format('DD') === '22' || fullDateR.format('DD') === '32'
                        ? 'nd'
                        : fullDateR.format('DD') === '03' || fullDateR.format('DD') === '23' || fullDateR.format('DD') === '33'
                        ? 'rd'
                        : 'th'
                    }
                    {' ' + fullDateR.format('YYYY')}
                </div>
                    : <div className='flex items-center'>{isFrench ? 'Date Requise' : 'Required date '}</div>}



                {isDateOpenR && <div className={dateTimeSubmenu}>
                    <DatePicker value={list[0].dateR || ''} time={list[0].timeR} onChange={(value)=>setOrder(value,'dateR')} getFullDate={setFullDateR} />
                    <div className="flex justify-between pl-8">
                        <div className={setDateBtn} onClick={(e) => {
                            e.stopPropagation();
                            setIsDateOpenR(false)
                        }}>accept</div>
                    </div>
                </div>}
            </div>
            <TimePicker isAm={list[0].timeTypeR} time={list[0].timeR} onChange={(value)=>setOrder(value,'timeR')} date={list[0].dateR} />
        </div>

        <div className="flex flex-col space-y-2 ">
            <div className={list[0].iconR > 0 ? iconsType : 'hidden'}>
                <span className={iconCard}>
                    {list[0].iconR === 1
                        ? <MdFlightLand className={iconItem + 'text-xl '} />
                        : list[0].iconR === 2
                            ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                            : list[0].iconR === 3
                                ? <FaBus className={iconItem} />
                                : list[0].iconR === 4
                                    ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                                    : <MdLocalHotel className={iconItem + ' text-lg'} />
                    }
                </span>

                <div className={flightCard}>
                    {list[0].iconR === 1 &&
                        <Select
                            className='favorite w-1/2 max-h-[30px]'
                            style={{ borderRadius: 5 }}
                            options={store.flights.map(item => (
                                { value: item, label: item }
                            ))}
                            onChange={(e) => {
                                setOrder({ ...list[0].flightR, title: e },'flightR')
                            }}
                            placeholder='Airlines'
                        />}

                    {list[0].iconR === 1
                        ? <MdFlightLand className='text-xl mx-1 e' />
                        : list[0].iconR === 2
                            ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                            : list[0].iconR === 3
                                ? <FaBus className=' mx-1 sm:text-sm' />
                                : list[0].iconR === 4
                                    ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                                    : list[0].iconR === 5
                                        ? <MdLocalHotel className='mx-1 ' />
                                        : <MdFlightTakeoff className='text-xl mx-1 ' />
                    }
                    {list[0].iconR === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {prefixes[list[0].flightR.title]}
                    </div>}
                    <Input
                        value={list[0].flightR.number}
                        maxLength={4}
                        placeholder={list[0].iconR === 1 ? '####' : list[0].iconR === 2 ? 'Train#' : list[0].iconR === 3 ? "Bus#" : list[0].iconR === 4 ? 'Boat#' : 'Room#'}
                        style={{ width: 65, paddingLeft: 0, paddingRight: 0, borderRadius: 0, height: 30 }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setOrder({ ...list[0].flightR, number: e.target.value.replace(/\D/g, '') },'flightR')
                        }}
                    />
                    {list[0].flightR.number.length < 3 && list[0].flightR.number.length > 0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                </div>
            </div>
            <div className={locationCard}>
                <div className={list[0].fromR ? locationBox : locationBox + ' border-red-500'}>
                    <span className='icon text-green-500 '><SlLocationPin /></span>
                    <GoogleAddressInput
                        style='w-full'
                        defaultLocation={list[0].to || ''}
                        onChange={(value) => { setStopTrigger(true); setOrder(value,'fromR') }}
                        placeholder={isFrench ? store.locationListF[0] : store.locationList[0]}
                    />
                </div>

                {list[0].iconR === 1 &&
                    <div className="border border-purple-500 flex items-center w-1/3 rounded-lg py-1">
                        <Select
                            className='favorite truncate'
                            style={{ borderRadius: 5 }}
                            options={store.departureSections.map(item => (
                                { value: item, label: item }
                            ))}
                            onChange={(value)=>setOrder(value,'departureR')}
                            placeholder='Departure'
                        />
                    </div>}
            </div>
            <div className={stopsContent}>
                <div className={stopStepper}>
                    <span className={stopR > 0 ? stepperItem : 'hidden'}>{getLength(returnStops) > 0 ? <FaRegCircleCheck /> : <FaRegQuestionCircle />}</span>
                    <span className={stopR > 1 ? stepperItem : ' hidden'}>{getLength(returnStops) > 1 ? <><FaRegCircleCheck /><span className={stepLine}></span></> : <FaRegQuestionCircle />}</span>
                    <span className={stopR > 2 ? stepperItem : ' hidden'}>{getLength(returnStops) > 2 ? <><FaRegCircleCheck /><span className={stepLine}></span></> : <FaRegQuestionCircle />}</span>
                    <span className={stopR > 3 ? stepperItem : ' hidden'}>{getLength(returnStops) > 3 ? <><FaRegCircleCheck /><span className={stepLine}></span></> : <FaRegQuestionCircle />}</span>
                </div>

                <div className={stopContainer}>
                    <div className={stopR === 0 ? addStopButton : 'hidden'} onClick={() => setStopR(1)}>+ stop</div>
                    <div className={stopR > 0 ? locationBox : 'hidden'}>
                        <span className='icon text-orange-400'><SlLocationPin /></span>
                        <GoogleAddressInput
                            style='w-full'
                            defaultLocation={returnStops[1] || ''}
                            onChange={(e) => { setStopTrigger(true); setReturnStops({ ...returnStops, 1: e }) }}
                            placeholder={isFrench ? store.locationListF[2] : store.locationList[2]}
                        />
                        <div className={nameClose} onClick={() => {
                            setReturnStops(sort({ ...list[0].stopsR, 1: '' }))
                            setOrder({ ...list[0].stopsR, 1: '' },'stopsR')
                            setStopR(stopR - 1)
                        }}>+</div>
                    </div>

                    <div className={(stopR === 1 && getLength(returnStops) > 0) ? addStopButton : 'hidden'} onClick={() => setStopR(2)}>+ stop</div>
                    <div className={(stopR > 1 && getLength(returnStops) > 0) ? locationBox : 'hidden'}>
                        <span className='icon text-orange-400'><SlLocationPin /></span>
                        <GoogleAddressInput
                            style='w-full'
                            defaultLocation={returnStops[2] || ''}
                            onChange={(e) => { setStopTrigger(true); setReturnStops({ ...returnStops, 2: e }) }}
                            placeholder={isFrench ? store.locationListF[3] : store.locationList[3]}
                        />
                        <div className={nameClose} onClick={() => {
                            setReturnStops(sort({ ...list[0].stopsR, 2: '' }))
                            setOrder({ ...list[0].stopsR, 2: '' },'stopsR')
                            setStopR(stopR - 1)
                        }}>+</div>
                    </div>

                    <div className={(stopR === 2 && getLength(returnStops) > 1) ? addStopButton : 'hidden'} onClick={() => setStopR(3)}>+ stop</div>
                    <div className={(stopR > 2 && getLength(returnStops) > 1) ? locationBox : 'hidden'}>
                        <span className='icon text-orange-400'><SlLocationPin /></span>
                        <GoogleAddressInput
                            style='w-full'
                            defaultLocation={returnStops[3] || ''}
                            onChange={(e) => { setStopTrigger(true); setReturnStops({ ...returnStops, 3: e }) }}
                            placeholder={isFrench ? store.locationListF[4] : store.locationList[4]}
                        />
                        <div className={nameClose} onClick={() => {
                            setReturnStops(sort({ ...list[0].stopsR, 3: '' }))
                            setOrder({ ...list[0].stopsR, 3: '' },'stopsR')
                            setStopR(stopR - 1)
                        }}>+</div>
                    </div>

                    <div className={(stopR === 3 && getLength(returnStops) > 2) ? addStopButton : 'hidden'} onClick={() => setStopR(4)}>+ stop</div>
                    <div className={(stopR > 3 && getLength(returnStops) > 2) ? locationBox : 'hidden'}>
                        <span className='icon text-orange-400'><SlLocationPin /></span>
                        <GoogleAddressInput
                            style='w-full'
                            defaultLocation={returnStops[4] || ''}
                            onChange={(e) => { setStopTrigger(true); setReturnStops({ ...returnStops, 4: e }) }}
                            placeholder={isFrench ? store.locationListF[5] : store.locationList[5]}
                        />
                        <div className={nameClose} onClick={() => {
                            setReturnStops(sort({ ...list[0].stopsR, 4: '' }))
                            setOrder({ ...list[0].stopsR, 4: '' },'stopsR')
                            setStopR(stopR - 1)
                        }}>+</div>
                    </div>
                </div>
            </div>

            <div className={locationCard}>
                <div className={list[0].toR ? locationBox : locationBox + ' border-red-500'}>
                    <span className='icon text-green-500 '><SlLocationPin /></span>
                    <GoogleAddressInput
                        style='w-full'
                        defaultLocation={list[0].from || ''}
                        onChange={(e) => { setStopTrigger(true); setOrder(e,'toR') }}
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
                            onChange={(value) => setOrder(value,'departure2R') }
                            placeholder='Departure'
                        />
                    </div>}
            </div>

            <div className={list[0].icon2R > 0 ? iconsType : 'hidden'}>
                <span className={iconCard}>
                    {list[0].icon2R === 1
                        ? <MdFlightLand className={iconItem + 'text-xl '} />
                        : list[0].icon2R === 2
                        ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        : list[0].icon2R === 3
                        ? <FaBus className={iconItem} />
                        : list[0].icon2R === 4
                        ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        : <MdLocalHotel className={iconItem + ' text-lg'} />
                    }
                </span>

                <div className={flightCard}>
                    {list[0].icon2R === 1 &&
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

                    {list[0].icon2R === 1
                        ? <MdFlightLand className='text-xl mx-1 e' />
                        : list[0].icon2R === 2
                        ? <div style={{ backgroundImage: `url(${train})` }} className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        : list[0].icon2R === 3
                        ? <FaBus className=' mx-1 sm:text-sm' />
                        : list[0].icon2R === 4
                        ? <div style={{ backgroundImage: `url(${boat})` }} className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        : list[0].icon2R === 5
                        ? <MdLocalHotel className='mx-1 ' />
                        : <MdFlightTakeoff className='text-xl mx-1 ' />
                    }
                    {list[0].icon2R === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {prefixes[list[0].flight2.title]}
                    </div>}
                    <Input
                        value={list[0].flight2.number}
                        maxLength={4}
                        placeholder={list[0].icon2R === 1 ? '####' : list[0].icon2R === 2 ? 'Train#' : list[0].icon2R === 3 ? "Bus#" : list[0].icon2R === 4 ? 'Boat#' : 'Room#'}
                        style={{ width: 65, paddingLeft: 0, paddingRight: 0, borderRadius: 0, height: 30 }}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setOrder({ ...list[0].flight2, number: e.target.value.replace(/\D/g, '') },'flightr2')
                        }}
                    />
                    {list[0].flight2.number.length < 3 && list[0].flight2.number.length > 0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                </div>
            </div>

        </div>
    </div>
    );
};

export default ReturnSection;

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

const trip = 'flex flex-col w-[49%] bg-white rounded mb-5 p-4 text-xs border'

