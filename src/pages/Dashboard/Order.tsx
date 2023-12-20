import React, { ChangeEvent, useEffect, useState } from "react";
import { Input, Select } from "antd";
import { BsPeople } from "react-icons/bs";
import { useMain } from "../../Store/useMain";
import { useStore } from '../../Store/index';
import MailInput from "../../UI/components/MailInput";
import PhoneNumberInput from "../../UI/components/PhoneInput";
import { PiCalendarCheckLight } from "react-icons/pi";
import useOnclickOutside from "react-cool-onclickoutside";
import dayjs from "dayjs";
import DatePicker from "../../UI/components/DatePicker";
import TimePicker from '../../UI/components/TimePicker';
import GoogleAddressInput from "../../UI/components/GoogleAddressInput";
import { SlLocationPin } from "react-icons/sl";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaBus, FaRegQuestionCircle } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";
import { MdFlightLand, MdFlightTakeoff, MdLocalHotel } from "react-icons/md";
import train from './../../assets/train.jpeg'
import boat from './../../assets/ship.png'
import { MdDoNotDisturbAlt } from "react-icons/md";

interface IObj { [key: number]: string }

const Orders = (): React.ReactNode => {
    const {
        list,
        setTitle,
        setTimeTypeR,
        setName,
        setTitle2,
        setName2,
        setTitle3,
        setName3,
        setEmail,
        setEmail2,
        setEmail3,
        setPhone,
        setPhone2,
        setPhone3,
        setDate,
        setTime,
        setDateNow,
        setTimeType,
        setFrom,
        setFlight,
        setDeparture,
        setDeparture2,
        setIcon,
        setIcon2,
        setFlight2,
        setType,
        setCarType,
        setTripType,
        setPaymentMethod,
        setIsReturnTrip,
        setTo,
        setToR,
        setFromR,
        setAdditionalText,
        setStops,
        setStopsR,
        setFlightR,
        setDateR,
        setTimeR,
        setDepartureR,
        setDeparture2R,
        setAdults,
        setBaggage,
        // setCarSeats,
        setKids,
        setBabies,
    } = useMain()
    const [names, setNames] = useState({ 1: false, 2: false })
    const [emails, setEmails] = useState({ 1: false, 2: false })
    const [phones, setPhones] = useState({ 1: false, 2: false })
    const { store } = useStore()
    const [stopTrigger, setStopTrigger] = useState(false)

    const isFrench = false;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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

    const options1 = isFrench ? store.titleListF.map(item => ({ value: item, label: item })) : store.titleList.map(item => ({ value: item, label: item }))
    const [localStops, setLocalStops] = useState<{ [key: number]: string }>(list[0].stops)
    const [returnStops, setReturnStops] = useState<{ [key: number]: string }>(list[0].stopsR)

    const [isPhone, setIsPhone] = useState(true)
    const [option, setOption] = useState(1)
    const [isDateOpen, setIsDateOpen] = useState(false)
    const [isDateOpenR, setIsDateOpenR] = useState(false)
    const [isDate] = useState(true)
    const [fullDate, setFullDate] = useState(dayjs())
    const [fullDateR, setFullDateR] = useState(dayjs())
    const [isFrom] = useState(true)
    // const [isTo, setIsTo] = useState(true)
    const [stop, setStop] = useState(0)
    const [stopR, setStopR] = useState(0)

    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const refR = useOnclickOutside(() => setIsDateOpenR(false));
    const years = [1,2,3,4,5,6,7,8,]
    // const noPhone = 'false'

    //___________________________CONDITIONS___________________________________________________________

    useEffect(() => {
        setStops(localStops)
    }, [localStops])
    useEffect(() => {
        setStopsR(returnStops)
    }, [returnStops])

    useEffect(() => {
        if (list[0].dateNow) setDate(dayjs().format('dd-MM-YYYY'))
    }, [list[0].dateNow])

    useEffect(() => {
        setStop(Object.values(list[0].stops).filter(i => i.length > 0).length)
    }, [])
    //________________________SET REVERT RETURN STOPS_________________________
    useEffect(() => {
        if (!stopTrigger) {
            const values = Object.values(list[0].stops).filter(value => value).reverse()
            const data: IObj = {}
            values.map((item, index) => {
                const number = index + 1;
                data[number] = item;
                if (item) { setReturnStops(data) }
            })
            setFromR(list[0].to)
            setToR(list[0].from)
            setStopR(values.length)
        }
    }, [list[0].stops, list[0].from, list[0].to])
    console.log(list[0].stops)
    console.log(list[0].stopsR)
    //___________________________ICONS________________________________________________________________    
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
    const getLength = (data: { [key: string]: string }) => Object.values(data).filter(item => item.length).length

    const sort = (data: { [key: string]: string }) => {
        const newObj: { [key: string]: string } = {}
        Object.values(data).filter(i => i.length).map((item, index) => newObj[index + 1] = item)
        return newObj;
    }

    return (
        <div className={container}>
            {/* __________________________________________________personal info___________________________________________________________*/}
            <div className={personalInfo}>
                <div className='pb-2'>
                    <div className='text-blue-600 w-1/3'>Personal info</div>
                </div>
                <div className="flex space-x-2 ">
                    {/* __________________________________________________name________________________________________________             */}
                    <div className=' flex flex-col space-y-4'>
                        <div className={(list[0].title && list[0].name.length > 2) ? nameBox : nameBox + '  border-red-500'}>
                            <span className='icon'><BsPeople /></span>
                            <Select allowClear placeholder={isFrench ? 'Titre' : 'Title'} style={{ width: 110, height: 40 }} onChange={setTitle} options={options1} value={list[0].title || null} />
                            <Input allowClear value={list[0].name} placeholder={isFrench ? store.nameListF[0] : store.nameList[0]} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setName(e.target.value) }} style={{ maxWidth: 180, borderRadius: 5, height: 30, paddingLeft: 0, }} />
                        </div>
                        {(list[0].title && list[0].name.length > 2 && !names[1]) && <div className={addNameBtn} onClick={() => setNames({ 1: true, 2: false })}>+ name</div>}
                        {(list[0].title && list[0].name.length > 2 && names[1]) && <div className={nameBox}>
                            <span className='icon'><BsPeople /></span>
                            <Select allowClear placeholder={isFrench ? 'Titre' : 'Title'} style={{ width: 110, height: 40 }} onChange={setTitle2} options={options1} value={list[0].title2 || null} />
                            <Input allowClear value={list[0].name2} placeholder={isFrench ? store.nameListF[0] : store.nameList[0]} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setName2(e.target.value) }} style={{ maxWidth: 180, borderRadius: 5, height: 30, paddingLeft: 0 }} />
                            <div className={nameClose} onClick={() => {
                                if (list[0].name3.length > 2 || list[0].title3) {
                                    setName2(list[0].name3)
                                    setTitle2(list[0].title3)
                                    setTitle3('')
                                    setName3('')
                                    return setNames({ 1: true, 2: false });
                                }
                                setTitle2('')
                                setName2('')
                                setNames({ 1: false, 2: false })
                            }}>+</div>
                        </div>}
                        {(list[0].title2 && list[0].name2.length > 2 && !names[2]) && <div className={addNameBtn} onClick={() => setNames({ 1: true, 2: true })}>+ name</div>}
                        {(list[0].title2 && list[0].name2.length > 2 && names[2]) && <div className={nameBox}>
                            <span className='icon'><BsPeople /></span>
                            <Select allowClear placeholder={isFrench ? 'Titre' : 'Title'} style={{ width: 110, height: 40 }} onChange={setTitle3} options={options1} value={list[0].title3 || null} />
                            <Input allowClear value={list[0].name3} placeholder={isFrench ? store.nameListF[0] : store.nameList[0]} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setName3(e.target.value) }} style={{ maxWidth: 180, borderRadius: 5, height: 30, paddingLeft: 0 }} />
                            <div className={nameClose} onClick={() => {
                                setTitle3('')
                                setName3('')
                                setNames({ 1: true, 2: false })
                            }}>+</div>
                        </div>}
                    </div>
                    {/* _____________________________________________________________email________________________________________________ */}

                    <div className='flex flex-col space-y-4'>
                        <div className={nameBox + 'border-none'}>
                            <MailInput value={list[0].email} mainMail={true} noMail={pattern.test(list[0].email)} onChange={setEmail} placeholder={isFrench ? store.emailListF[0] : store.emailList[0]} />
                        </div>

                        {(pattern.test(list[0].email) && !emails[1]) && <div className={addNameBtn} onClick={() => setEmails({ 1: true, 2: false })}>+ email</div>}
                        {(pattern.test(list[0].email) && emails[1]) && <div className={nameBox + ' border-none '}>
                            <MailInput value={list[0].email2} mainMail={true} noMail={true} onChange={setEmail2} placeholder={isFrench ? store.emailListF[0] : store.emailList[0]} />
                            <div className={nameClose} onClick={() => {
                                if (pattern.test(list[0].email3)) {
                                    setEmail2(list[0].email3)
                                    setEmail3('@')
                                    return setEmails({ 1: true, 2: false });
                                }
                                setEmail2('@')
                                setEmails({ 1: false, 2: false })
                            }}>+</div>
                        </div>}

                        {(pattern.test(list[0].email2) && !emails[2]) && <div className={addNameBtn} onClick={() => setEmails({ 1: true, 2: true })}>+ email</div>}
                        {(pattern.test(list[0].email2) && emails[2]) && <div className={nameBox + ' border-none '}>
                            <MailInput value={list[0].email3} mainMail={true} noMail={true} onChange={setEmail3} placeholder={isFrench ? store.emailListF[0] : store.emailList[0]} />
                            <div className={nameClose} onClick={() => {
                                setEmail3('@')
                                setEmails({ 1: true, 2: false })
                            }}>+</div>
                        </div>}
                    </div>
                    {/* _____________________________________________________________phone________________________________________________ */}

                    <div className='flex flex-col space-y-4'>
                        <div className={isPhone ? nameBox + ' border ' : nameBox + ' border border-red-500 '} >
                            <PhoneNumberInput setValidation={setIsPhone} type={1} value={list[0].phone} onChange={setPhone} />
                        </div>
                        {(isPhone && !phones[1]) && <div className={addNameBtn} onClick={() => setPhones({ 1: true, 2: false })}>+ phone</div>}
                        {(isPhone && phones[1]) && <div className={nameBox} >
                            <PhoneNumberInput setValidation={setIsPhone} type={2} value={list[0].phone2} onChange={setPhone2} />
                            <div className={nameClose} onClick={() => {
                                if (list[0].phone3.length > 10) {
                                    setPhone3(list[0].phone3)
                                    return setPhones({ 1: true, 2: false });
                                }
                                setPhone3('')
                                setPhones({ 1: true, 2: false })
                            }}>+</div>
                        </div>}

                        {(list[0].phone2.length > 10 && !phones[2]) && <div className={addNameBtn} onClick={() => setPhones({ 1: true, 2: true })}>+ phone</div>}
                        {(list[0].phone2.length > 10 && phones[2]) && <div className={nameBox} >
                            <PhoneNumberInput setValidation={setIsPhone} type={2} value={list[0].phone3} onChange={setPhone3} />
                            <div className={nameClose} onClick={() => {
                                setPhone3('')
                                setPhones({ 1: true, 2: false })

                            }}>+</div>
                        </div>}
                    </div>

                </div>
            </div>
            {/* __________________________________________________mainType________________________________________________________________*/}

            <div className={mainType}>
                <div className={mainTypeBox}>
                    <span className={list[0].type === 1 ? mainTypeItemActive : mainTypeItem} onClick={() => setType(1)}>{isFrench ? 'Transport' : 'Transport'}</span>
                    <span className={list[0].type === 2 ? mainTypeItemActive : mainTypeItem} onClick={() => setType(2)}>{isFrench ? 'Livraison' : 'Delivery'}</span>
                    <span className={list[0].type === 3 ? mainTypeItemActive : mainTypeItem} onClick={() => setType(3)}>{isFrench ? 'Survoltage' : 'Boost'}</span>
                    <span className={list[0].type === 4 ? mainTypeItemActive : mainTypeItem} onClick={() => setType(4)}>{isFrench ? 'Débarrage de portes' : 'Unlocking doors'}</span>
                </div>
            </div>
            {/* __________________________________________________trip info________________________________________________________________*/}
            <div className='flex justify-between'>
                {/* ______________________________________________one-way_________________________________________________________________ */}
                <div className={(list[0].type < 3) ? trip : 'hidden'}>
                    <div className='flex mb-2'>
                        <div className='text-red-600 mr-2'>one way</div>
                        <div className={list[0].dateNow ? mainTypeBox + ' mb-[30px] ' : mainTypeBox} onClick={() => {
                            if (list[0].dateNow) setTimeType(0)
                            setDateNow(!list[0].dateNow)
                        }}>
                            <span className={list[0].dateNow ? mainTypeItemActive : mainTypeItem}>{isFrench ? 'Maintenant' : 'Now'}</span>
                            <span className={list[0].dateNow ? mainTypeItem : mainTypeItemActive}>{isFrench ? 'Après' : 'Later'}</span>
                        </div>
                        <div className={btnGreen + ' ml-auto'} onClick={() => setIsReturnTrip(!list[0].isReturnTrip)}>
                            return trip
                        </div>
                    </div>
                    {/*____________________________________________________time_____________________________________________________________  */}
                    {!list[0].dateNow && <div className={list[0].timeType === 1 ? timeToggle + ' bg-gray-600 ' : timeToggle}>
                        <div className={list[0].timeType === 0 ? selectTextActive : selectText} onClick={() => setTimeType(0)}>{isFrench ? 'Choisir' : 'Select'}</div>
                        <div className={list[0].timeType === 1 ? amTextActive : amText} onClick={() => setTimeType(1)}>am</div>
                        <div className="absolute border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
                        <div className={list[0].timeType === 2 ? pmTextActive : pmText} onClick={() => setTimeType(2)}>PM</div>
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

                    {/* __________________________________________________location_________________________________________________________________ */}
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
                                            setFlight({ ...list[0].flight, title: e })
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
                                        setFlight({ ...list[0].flight, number: e.target.value.replace(/\D/g, '') })
                                    }}
                                />
                                {list[0].flight.number.length < 3 && list[0].flight.number.length > 0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                            </div>
                        </div>
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
                                <div className="border border-purple-500 flex items-center w-1/3 rounded-lg py-1">
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
                                        setStops({ ...list[0].stops, 1: '' })
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
                                        setStops({ ...list[0].stops, 2: '' })
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
                                        setStops({ ...list[0].stops, 3: '' })
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
                                        setStops({ ...list[0].stops, 4: '' })
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
                                    onChange={setTo}
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
                                        onChange={setDeparture2}
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
                                            setFlight2({ ...list[0].flight2, title: e })
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
                                        setFlight2({ ...list[0].flight2, number: e.target.value.replace(/\D/g, '') })
                                    }}
                                />
                                {list[0].flight2.number.length < 3 && list[0].flight2.number.length > 0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                            </div>
                        </div>

                    </div>

                </div>


                {/* ______________________________________________return___________________________________________________________________ */}

                <div className={(list[0].type < 3 && list[0].isReturnTrip) ? trip : 'hidden'}>
                    <div className='flex mb-5'>
                        <div className='text-red-600 mr-2 '>return</div>
                    </div>
                    {/*____________________________________________________time_____________________________________________________________  */}
                    <div className={list[0].timeTypeR === 1 ? timeToggle + ' bg-gray-600 ' : timeToggle + ' '}>
                        <div className={list[0].timeTypeR === 0 ? selectTextActive : selectText} onClick={() => setTimeTypeR(0)}>{isFrench ? 'Choisir' : 'Select'}</div>
                        <div className={list[0].timeTypeR === 1 ? amTextActive : amText} onClick={() => setTimeTypeR(1)}>am</div>
                        <div className="absolute border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
                        <div className={list[0].timeTypeR === 2 ? pmTextActive : pmText} onClick={() => setTimeTypeR(2)}>PM</div>
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
                                <DatePicker value={list[0].dateR || ''} time={list[0].timeR} onChange={setDateR} getFullDate={setFullDateR} />
                                <div className="flex justify-between pl-8">
                                    <div className={setDateBtn} onClick={(e) => {
                                        e.stopPropagation();
                                        setIsDateOpenR(false)
                                    }}>accept</div>
                                </div>
                            </div>}
                        </div>
                        <TimePicker isAm={list[0].timeTypeR} time={list[0].timeR} onChange={setTimeR} date={list[0].dateR} />
                    </div>

                    {/* __________________________________________________location_________________________________________________________________ */}
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
                                            setFlightR({ ...list[0].flightR, title: e })
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
                                        setFlightR({ ...list[0].flightR, number: e.target.value.replace(/\D/g, '') })
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
                                    onChange={(value) => { setStopTrigger(true); setFromR(value) }}
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
                                        onChange={setDepartureR}
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
                                        setStopsR({ ...list[0].stopsR, 1: '' })
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
                                        setStopsR({ ...list[0].stopsR, 2: '' })
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
                                        setStops({ ...list[0].stopsR, 3: '' })
                                        setStop(stopR - 1)
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
                                        setStopsR({ ...list[0].stopsR, 4: '' })
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
                                    onChange={(e) => { setStopTrigger(true); setToR(e) }}
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
                                        onChange={setDeparture2R}
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
                                            setFlight2({ ...list[0].flight2, title: e })
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
                                        setFlight2({ ...list[0].flight2, number: e.target.value.replace(/\D/g, '') })
                                    }}
                                />
                                {list[0].flight2.number.length < 3 && list[0].flight2.number.length > 0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                            </div>
                        </div>

                    </div>
                </div>
                {/* ______________________________________________boost & unlock door___________________________________________________________________ */}
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
                    {/*____________________________________________________time_____________________________________________________________  */}
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

                    {/* __________________________________________________location_________________________________________________________________ */}
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
                {/* ___________________________________________________options_________________________________________________________________*/}
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
                {/* ________________________PASSENGERS___________________________________________ */}
                    {option === 1 && <div className={optionsContent}>
                        <div className={carTypeBox + ' self-start mb-4'}>
                            <span className={list[0].carType === 1 ? carTypeItemActive : carTypeItem} onClick={() => setCarType(1)}>{isFrench ? 'Sedan' : 'Sedan'}</span>
                            <span className={list[0].carType === 2 ? carTypeItemActive : carTypeItem} onClick={() => setCarType(2)}>{isFrench ? 'SUV' : 'SUV'}</span>
                            <span className={list[0].carType === 3 ? carTypeItemActive : carTypeItem} onClick={() => setCarType(3)}>{isFrench ? 'VAN' : 'VAN'}</span>
                            <span className={mainTypeItem + ' flex items-center rounded-full bg-gray-200'}><MdDoNotDisturbAlt />{isFrench ? 'Limo' : 'Limo'}</span>
                        </div>
                        {/* ________________________ADULTS___________________________________________ __*/}
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
                        {/* ________________________KIDS__________________________________________ __*/}
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

                        {/* ________________________BABIES__________________________________________ __*/}
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
                    {/* ________________________BAGGAGE___________________________________________ */}
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


const iconCard = 'flex items-center justify-center w-8 h-8 bg-purple-500 shadow-xl text-white rounded-lg'
const iconItem = ' '
const iconsType = 'flex items-center justify-between w-full sm:space-x-0 xl:space-x-4  lg:space-x-4 2xl:space-x-4'
const flightCard = 'flex relative items-center border w-4/5  rounded-lg border-purple-500 py-1'

const addStopButton = 'text-purple-500 cursor-pointer hover:text-purple-700 pl-4 w-[60px]'

const nameClose = ' absolute -top-2 -right-2 px-[6px] rotate-45 py-[2px] text-center bg-rose-600 text-white rounded-full cursor-pointer z-10'
const addNameBtn = 'text-purple-500 cursor-pointer hover:text-purple-700 pl-4 w-[60px]'

const textArea = 'flex border h-min w-full rounded-lg mb-4'

const passTitle = 'text-sm text-gray-600 mr-5 '
const passNumber = 'px-2'
const btnQuantity = ' w-5 shadow h-5 font-black text-lg text-purple-400 rounded-full flex items-center justify-center font-bold cursor-pointer border-2 border-purple-400'
const optionsContent = 'flex flex-col'

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

const nameBox = 'relative flex items-center rounded-lg border '
const mainType = 'flex flex-col w-full px-4 mb-2 text-xs items-center'
const mainTypeBox = "flex  border-2 border-purple-500 rounded-full overflow-hidden cursor-pointer"
const mainTypeItem = ' px-2 py-1 font-bold duration-500'
const mainTypeItemActive = ' px-2 py-1 font-bold bg-purple-400 text-white duration-500'

const carTypeBox = "flex space-x-1"
const carTypeItem = ' px-2 cursor-pointer rounded-full shadow-lg py-1 font-bold duration-500'
const carTypeItemActive = ' px-2 py-1 rounded-full shadow-lg  font-bold bg-purple-400 text-white duration-500'

const btnGreen = ' border-2 px-2 py-1 rounded-full border-green-500 font-bold cursor-pointer hover:bg-green-300 self-start'
const btnPurple = ' border-2 px-2 py-1 rounded-full border-purple-500 font-bold cursor-pointer hover:bg-purple-400'

const personalInfo = 'flex flex-col w-full bg-white rounded-xl mb-5 p-4 text-xs shadow-xl pb-10'
const optionsSection = 'flex flex-col w-[49%] bg-white rounded-xl mb-5 p-4 text-xs shadow-xl'
const trip = 'flex flex-col w-[49%] bg-white rounded-xl mb-5 p-4 text-xs shadow-xl'

const container = 'flex flex-col w-full mx-[40px] min-h-screen px-6 '



