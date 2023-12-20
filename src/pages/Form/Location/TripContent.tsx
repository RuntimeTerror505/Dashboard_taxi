import { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";
import { Input, Select } from "antd";

import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import useOnclickOutside from "react-cool-onclickoutside";

import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight, PiJeepLight } from "react-icons/pi";
import { FaBus } from "react-icons/fa";
import { MdFlightTakeoff, MdFlightLand, MdDone } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { useStore } from '../../../Store/index';
import { useMain } from "../../../Store/useMain";
import React from "react";
import { LiaShuttleVanSolid } from "react-icons/lia";
import { AiOutlineStop } from "react-icons/ai";
import { IoCarSportOutline } from "react-icons/io5";
import sky from './../../../assets/day.png'
import sun from './../../../assets/sun.png'
import stars from './../../../assets/stars.jpg'
import train from './../../../assets/train.jpeg'
import boat from './../../../assets/ship.png'
import delivery from './../../../assets/delivery.png'
import orderTaxi from './../../../assets/taxiOrder.png'
import carBooster from './../../../assets/carBooster.png'
import lostKey from './../../../assets/lostKeys.png'
import { useValidation } from "../../../Store/useValidation";
import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";


interface IObj {[key:number]: string}
const TripContent = ():React.ReactNode => {
    const {  
        setType,
        isFrench,
        activeCarId,
        list,
        setFrom, 
        setTo, 
        setStops,
        setDate,
        setTime,
        setDeparture,
        setDeparture2,
        setFlight,
        setFlight2,
        setIcon,
        setIcon2,
        resetForm,
        setDateNow,
        setCarType,
        setTimeType,
        setSteps,
        setFilled,
    } = useMain()
    const {setIsSubmit} = useValidation()
    const { store } = useStore()
    
    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState(0)
    const [ localStops, setLocalStops ] = useState<{[key:number]:string}>({})
    const [ day, setDay ] = useState(true)

    const [carList, setCarList] = useState(isFrench? store.carListF: store.carList)


    
    const [typePos, setTypePost] = useState(1)

    const [isDate, setIsDate] = useState(true)
    const [isFrom, setIsFrom] = useState(true)
    const [isTo, setIsTo] = useState(true)
    const [trigger, setTrigger] = useState(false)
    const [changedList, setChangedList] = useState(isFrench? store.typeListF: store.typeList)


    useEffect(()=>{
        setChangedList(isFrench? store.typeListF: store.typeList)
    },[isFrench])

    const prefixes:{[key:string]:string} = {
        'AIR CANADA': "AC",
        'Air Transat': "AT",
        'PAL airlines':"PA",
        'Air Inuit':"AI",
        'Porter':"PO",
        'UNITED': "UN",
        'CANADIAN NORTH':"CN",
        'American Airlines':"AA",
        'Emirates':"EM",
        'arajet':"AR",
        'DELTA':"DE",
        'flair':"FL",
        'AIR ALGERIE':"AL",
        'TUNISAIR':"TU",
        'SWISS':"SW",
        'Austrian':"AU",
        'Air Saint-Pierre':"SP",
        'AIRFRANCE':"AF",
        'KLM':"KLM",
        'Lufthansa':"LU",
        'Royal Air MAroc(RAM)':"MA",
        'BRITISH AIRWAYS':"BA",
        'AeroMexico':"AM",
        'CopaAirlines':"CO",
        'Lynx':"LY",
        'SUNWING':"SNW",
        'QATAR':"QT",
        'RAM':"RAM",
        'Another':"",
        "":'',
    }



    useEffect(()=>{
        setCarList(isFrench? store.carListF: store.carList)
    },[isFrench])
    useEffect(()=>{
        setDate(dayjs().format('MM/DD/YYYY'))
    },[])

    useEffect(()=>{
        //if montreal airport is pick up location  we need require departure and flight.
        //if if montreal airport is pick up location we need just show departure and flight.
        //if just airport we need show flight number

        setIcon(0)
        setIcon2(0)
        setFlight({title:'', prefix:'',number:'' })
        setFlight2({title:'', prefix:'',number:'' })
        //we try to find word airport|bus|room|train and set Icon
        store.airportArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(1)
        })
        store.busArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon(3)
        })
        store.trainArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(2)
        })
        store.boatArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(4)
        })
        store.hotelArray.map(item =>{
            if(list[activeCarId-1].from.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon(5)
        })
        store.airportArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(1)
        })
        store.busArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2(3)

        })
        store.trainArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(2)
        })
        store.boatArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(4)
        })
        store.hotelArray.map(item =>{
            if(list[activeCarId-1].to.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2(5)
        })

    },[list[activeCarId-1].from, list[activeCarId-1].to])

    useEffect(()=>{
        setStops(localStops)
    },[localStops])

    useEffect(()=>{
        setStop(Object.values(list[activeCarId-1].stops).filter(i=>i.length>0).length)
    },[])

    useEffect(()=>{
        if(list[activeCarId-1].type > 2) return setDateNow(true);
    },[list[activeCarId-1].type])
    
    useEffect(()=>{
        setDay(list[activeCarId-1].time.slice(0,2) > '04' && list[activeCarId-1].time.slice(0,2) < '23')
    },[list[activeCarId-1].time,list[activeCarId-1].timeType])

    useEffect(()=>{setLocalStops(list[activeCarId-1].stops)},[activeCarId])

    function goNext() {
        setTrigger(true)
        setIsDate(list[activeCarId-1].date.length>0)
        setIsFrom(list[activeCarId-1].from.length>0)
        setIsTo(list[activeCarId-1].to.length>0)

        if(list[activeCarId-1].date && list[activeCarId-1].from && list[activeCarId-1].to && !list[activeCarId-1].isReturnTrip) return setSteps(3)
        if(!list[activeCarId-1].dateR && list[activeCarId-1].isReturnTrip) return alert('need return date')
        if(!list[activeCarId-1].timeR && list[activeCarId-1].isReturnTrip) return alert('need return time')
        if(!list[activeCarId-1].fromR && list[activeCarId-1].isReturnTrip) return alert('need return pick up location')
        if(!list[activeCarId-1].toR && list[activeCarId-1].isReturnTrip) return alert('need return drop of location')
        if(
            list[activeCarId-1].date 
            && list[activeCarId-1].from 
            && list[activeCarId-1].to 
            && list[activeCarId-1].isReturnTrip
            && list[activeCarId-1].dateR
            && list[activeCarId-1].timeR
            && list[activeCarId-1].fromR 
            && list[activeCarId-1].toR 
        ) return setSteps(3)
    }

    useEffect(()=>{
        if(trigger){
            setIsDate(list[activeCarId-1].date.length>0)
            setIsFrom(list[activeCarId-1].from.length>0)
            setIsTo(list[activeCarId-1].to.length>0)
        }
    },[list[activeCarId-1]])

    
    return (
    <div className={container}>
        <div className={content}>
            <div className={mainType}>
                    {changedList.map((item,index)=>(
                        <div 
                            key={item}
                            className={typeItem}
                            onClick={()=> {
                                setTypePost(index+1)
                                setType(index+1)
                            }}
                        >
                            <span className=' px-[2px] border-b h-6 flex items-center border-black w-full text-[8px] '><span>{item}</span></span>
                            {index===0
                                ? <div style={{backgroundImage:`url(${orderTaxi})`}}  className={typeIconItem}></div>
                                : index===1
                                ? <div style={{backgroundImage:`url(${delivery})`}}  className={typeIconItem}></div>
                                : index===2
                                ? <div style={{backgroundImage:`url(${carBooster})`}}  className={typeIconItem}></div>
                                : <div style={{backgroundImage:`url(${lostKey})`}}  className={typeIconItem}></div>
                            }
                        </div>
                    ))}
                <div 
                    className={trickster+ `${(list[activeCarId-1].type===2)
                                    ? ' translate-x-[100%]'
                                    : (list[activeCarId-1].type===3)
                                    ? ' translate-x-[200%] '
                                    : (list[activeCarId-1].type===4)
                                    ? ' translate-x-[300%] ' 
                                    : ' border-l-green-400 '}`}
                >
                    <span className=' px-[2px] overflow-hidden border-b h-6 flex items-center border-black w-full text-[8px] '>
                        {typePos===1
                            ? isFrench? 'Transport': 'Transport'
                            : typePos===2
                            ? isFrench? 'Livraison': 'Delivery'
                            : typePos===3
                            ?  isFrench? 'Survoltage': 'Boost'
                            : isFrench? 'Débarrage de portes': 'Unlocking doors'
                        }
                    </span>
                    {typePos===1
                            ? <div style={{backgroundImage:`url(${orderTaxi})`}}  className={typeIconItem}></div>
                            : typePos===2
                            ? <div style={{backgroundImage:`url(${delivery})`}}  className={typeIconItem}></div>
                            : typePos===3
                            ? <div style={{backgroundImage:`url(${carBooster})`}}  className={typeIconItem}></div>
                            : <div style={{backgroundImage:`url(${lostKey})`}}  className={typeIconItem}></div>
                    }
                    
                </div>
            </div>

            <div className={date}>
                <div style={{}} className={day? "relative  w-full my-1 g-no-repeat bg-cover bg-no-repeat rounded-xl bg-right ": "  relative w-full  my-1 bg-cover  rounded-xl "}>
                    <div className="absolute -top-4 right-1/2 translate-x-1/2 flex items-center bg-white px-4 py-1 rounded">
                        {day
                            ? isFrench? 'Tarification jour ': 'Day fare'
                            : isFrench? 'Tarification nuit': 'Night fare'
                        } 
                    </div>
                </div>



                <div className={dateRow}>
                    <div className='flex flex-col w-1/2 '>
                        <div className={!list[activeCarId-1].dateNow ? toggle+ ' ' : toggle +' bg-white'} onClick={()=>{
                                    if(list[activeCarId-1].type>2) return setDateNow(true);
                                    setDateNow(!list[activeCarId-1].dateNow)
                                    if(list[activeCarId-1].dateNow) {
                                        setTime('')
                                        setDate('')
                                    } else {
                                        (dayjs().format('mm') > '30') 
                                            ? setTime((dayjs().add(1, 'hours').format('HH')) + ':' + (dayjs().add(30, 'minutes').format('mm')))
                                            : setTime((dayjs().format('HH')) + ':' + (dayjs().add(30, 'minutes').format('mm')))
                                        setDate(dayjs().format('DD/MM/YYYY'))
                                    }
                                }}>
                            <span className={!list[activeCarId-1].dateNow ? toggleLabelActive : toggleLabel+ ' bg-red-600 '}>{isFrench? store.nowLaterF[0]:store.nowLater[0] }
                            </span>
                            <span className={list[activeCarId-1].dateNow ? toggleLabelActive   :toggleLabel+ ' bg-green-400 ' }>{isFrench? store.nowLaterF[1]:store.nowLater[1] }</span>
                        </div>
                    <div className={isDate ? dateInput: dateInput+' border-red-500'} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                        <span className='icon text-xl'><PiCalendarCheckLight/></span>
                        {list[activeCarId-1].date ? <div className='flex items-center'>
                            {fullDate.format('dddd')==='Monday'? isFrench ?'Lundi' : 'Monday'
                            :fullDate.format('dddd')==='Tuesday'? isFrench ? 'Mardi':'Tuesday'
                            :fullDate.format('dddd')==='Wednesday'?isFrench ? 'Merceredi':'Wednesday'
                            :fullDate.format('dddd')==='Thursday'?isFrench ? 'Jeudi':'Thursday'
                            :fullDate.format('dddd')==='Friday'?isFrench ? 'Venderdi':'Friday'
                            :fullDate.format('dddd')==='Saturday'?isFrench ? 'Samedi':'Saturday'
                            : isFrench ?'Dimanche': 'Sunday'},  
                            {'  '+fullDate.format('MMM')}
                            { '.  '+fullDate.format('D')}{ fullDate.format('DD') === '01' || fullDate.format('DD') === '21' || fullDate.format('DD') === '31'
                                                    ? 'st'
                                                    :  fullDate.format('DD') === '02' || fullDate.format('DD') === '22' || fullDate.format('DD') === '32'
                                                    ?  'nd'
                                                    :  fullDate.format('DD') === '03' || fullDate.format('DD') === '23' || fullDate.format('DD') === '33'
                                                    ? 'rd'
                                                    : 'th'
                                                }
                            {' '+fullDate.format('YYYY')}
                        </div>
                        :<div className='flex items-center'>{isFrench? 'Date Requise' :'Required date '}</div>}
                        
                        

                        {isDateOpen && <div className={dateTimeSubmenu}>
                            <DatePicker value={list[activeCarId-1].date || ''}  time={list[activeCarId-1].time} onChange={setDate} getFullDate={setFullDate}/>
                            <div className="flex justify-between pl-8">
                                <div className={setDateBtn} onClick={(e)=> {
                                        e.stopPropagation();
                                        setIsDateOpen(false)
                                    }}>accept</div>
                            </div>
                        </div>}
                    </div>
                    </div>
                    {list[activeCarId-1].dateNow && <div className="absolute z-30 top-[30px] left-0 right-1/2 bottom-0  bg-white opacity-75 cursor-not-allowed transition duration-1000 "></div>}
                    <div className='flex flex-col relative w-1/2 rounded-lg px-2 justify-end items-end bg-cover' style={{backgroundImage:`url(${day? sky :stars})`, backgroundPosition:`${day? ' ': '0px 0px'}` }} >
                        <TimePicker isAm={list[activeCarId-1].timeType} time={list[activeCarId-1].dateNow ? dayjs().add(30,'minutes').format('HH:mm'): list[activeCarId-1].time}  onChange={setTime} date={list[activeCarId-1].date}/> 
                        {!list[activeCarId-1].dateNow && <div className={list[activeCarId-1].timeType===1 ? timeToggle + ' bg-gray-600 ':timeToggle+ ' '}>
                            <div className={list[activeCarId-1].timeType===0 ? selectTextActive :selectText } onClick={()=>setTimeType(0)}>{isFrench? 'Choisir':'Select'}</div>
                            <div className={list[activeCarId-1].timeType===1 ? amTextActive : amText} onClick={()=>setTimeType(1)}>am</div>
                            <div className="absolute border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
                            <div className={list[activeCarId-1].timeType===2 ? pmTextActive: pmText} onClick={()=>setTimeType(2)}>PM</div>    
                        </div>}
                        {day && <div  className='absolute top-8 left-2 w-8 h-8 bg-no-repeat  bg-cover rotate-45' style={{backgroundImage:`url(${sun})` }}></div>}

                    </div>
                </div>
            </div>

            {list[activeCarId-1].icon>0 && <div className={iconsType}>
                
                <div className={icons}>
                    <span className={list[activeCarId-1].icon == 1 ? iconCard : iconCardActive}>
                        <MdFlightLand className={ iconItem + 'text-xl ' }/>
                    </span>
                    <span className={list[activeCarId-1].icon == 2 ? iconCard : iconCardActive}>
                        
                        <div style={{backgroundImage:`url(${train})`}}  className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                    </span>
                    <span className={list[activeCarId-1].icon == 3 ? iconCard: iconCardActive}>
                        <FaBus className={ iconItem}/>
                    </span>
                    <span className={list[activeCarId-1].icon == 4 ? iconCard : iconCardActive}>
                        
                        <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>

                    </span>
                    <span className={list[activeCarId-1].icon == 5 ?iconCard : iconCardActive}>
                        <MdLocalHotel className={ iconItem}/>
                    </span>
                </div>

                {list[activeCarId-1].icon>0 && <div className={flightCard }>
                    
                    {list[activeCarId-1].icon === 1 && 
                    <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{ borderRadius: 5}} 
                        options={store.flights.map(item=>(
                            {value: item, label: item}
                        ))} 
                        onChange={(e)=>{
                            setFlight({...list[activeCarId-1].flight, title: e})
                        }} 
                        placeholder='Airlines'
                    />}
                    
                    {list[activeCarId-1].icon === 1
                        ?<MdFlightLand className='text-xl mx-1 e'/>
                        :list[activeCarId-1].icon === 2
                        ?<div style={{backgroundImage:`url(${train})`}}  className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        :list[activeCarId-1].icon === 3
                        ? <FaBus className=' mx-1 sm:text-sm'/>
                        :list[activeCarId-1].icon === 4
                        ? <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        :list[activeCarId-1].icon === 5 
                        ?<MdLocalHotel className='mx-1 '/>
                        :<MdFlightTakeoff className='text-xl mx-1 '/>
                    }   
                    {list[activeCarId-1].icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        { prefixes[list[activeCarId-1].flight.title]}
                    </div>}
                    <Input
                        value={list[activeCarId-1].flight.number}
                        maxLength={4}
                        placeholder={list[activeCarId-1].icon === 1 ?'####': list[activeCarId-1].icon === 2 ? 'Train#' : list[activeCarId-1].icon === 3 ? "Bus#" : list[activeCarId-1].icon === 4 ? 'Boat#': 'Room#'} 
                        style={{ width:65, paddingLeft:0,paddingRight:0, borderRadius: 0, height: 30}} 
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                            setFlight({...list[activeCarId-1].flight, number: e.target.value.replace(/\D/g, '')})
                        }}
                    />
                    {list[activeCarId-1].flight.number.length<3 && list[activeCarId-1].flight.number.length>0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}
                </div>}
            </div>}

            <div className={locationCard}>
                <div className={isFrom ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                    <span className='icon text-green-500 '><SlLocationPin/></span>
                    <GoogleAddressInput
                        style='w-full' 
                        defaultLocation={list[activeCarId-1].from || ''} 
                        onChange={setFrom}
                        placeholder={isFrench? store.locationListF[0]:store.locationList[0]}
                    />
                </div>
                {list[activeCarId-1].icon === 1 && 
                <div className="border flex items-center w-1/3 rounded py-1">
                    <Select 
                        className='favorite truncate'
                        style={{borderRadius: 5}} 
                        options={store.departureSections.map(item=>(
                            {value: item, label: item}
                        ))}   
                        onChange={setDeparture} 
                        placeholder='Departure' 
                    />
                </div>}
            </div>
            {list[activeCarId-1].type>2 && <div className={locationCard}>
                <div className={extraCardPickUp}>
                <div className={list[activeCarId-1].carType ? typeCard : typeCard + ' border-red-500'}>
                    {carList.map(item => (
                        <div className={list[activeCarId-1].carType === item ? typeItem2+' bg-green-400 text-black': item === 'Limo' ? typeItem2 + ' bg-gray-200  text-gray-500 cursor':typeItem2+ ' text-blue-500' } onClick={()=>{
                                if(item === 'limo') return;
                                setCarType(item)
                            }}>
                            { (item === 'VAN') 
                                ? <LiaShuttleVanSolid className='w-[20px] text-sm'/>
                                :(item === 'SUV' ||item === 'VUS')
                                ?<PiJeepLight className='w-[20px] text-sm'/>
                                :item === 'Limo'
                                ?<AiOutlineStop className='w-[20px] text-sm text-red-500'/>
                                :<IoCarSportOutline className='w-[20px] text-sm'/> }
                                <div className='truncate font-bold'>{item}</div>
                        </div>
                    ))}
            </div>
                </div>
                
            </div>}
        
            {list[activeCarId-1].type<3 && <div className={extraCardStop}>
                <div className={(stop > 0)? box: box + ' opacity-0 '}>
                    <span className='icon text-orange-400'><SlLocationPin/></span>  
                    <GoogleAddressInput
                        style='w-full'
                        defaultLocation={localStops[1] || ''} 
                        onChange={(e)=>setLocalStops({...localStops, 1:e})}
                        placeholder={isFrench? store.locationListF[2]:store.locationList[2]}
                    />
                </div>
                <div className={(stop === 0) ? openStop :'hidden'} onClick={()=>setStop(1)}>+ stop</div> 
                <div 
                    className={(stop > 0 ) ? closeStop : 'hidden'} 
                    onClick={()=>{
                        if(stop===0) return setStop(1);
                        const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 0)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        
                        setLocalStops(data)
                        setStops(data)
                        setStop(stop - 1)
                    }}
                ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 
            </div>}
            
            {list[activeCarId-1].type<3 && <div className={(stop > 0) ?  extraCardStop: 'hidden'}>
                <div className={stop > 1 ? box: box + ' opacity-0 '}>
                    <span className='icon  text-orange-400'><SlLocationPin/></span>
                    <GoogleAddressInput
                        style='w-full'
                        defaultLocation={localStops[2] || ''} 
                        onChange={(e)=>{setLocalStops({...localStops, 2:e})}}
                        placeholder={isFrench? store.locationListF[3]:store.locationList[3]}
                    />
                </div>
                <div className={(stop === 1) ? openStop : 'hidden'} onClick={()=> setStop(2)} >+ stop</div>
                <div 
                    className={(stop > 1) ? closeStop : 'hidden'} 
                    onClick={()=>{ 
                        if(stop===1) return setStop(2);
                        const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 1)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setLocalStops(data)
                        setStops(data)
                        setStop(stop - 1)
                    }}
                ><span className='scale-[150%] font-bold rotate-45'>+</span></div>
            </div>}

            {list[activeCarId-1].type<3 && <div className={(stop > 1 ) ?  extraCardStop: 'hidden'}>
                    <div className={stop > 2 ? box : box + ' opacity-0 '}>
                        <span className='icon  text-orange-400'><SlLocationPin/></span>
                        <GoogleAddressInput
                            style='w-full'
                            defaultLocation={localStops[3] || ''} 
                            onChange={(e)=>{
                                setLocalStops({...localStops, 3:e})
                            }}
                            placeholder={isFrench? store.locationListF[4]:store.locationList[4]}
                        />
                    </div>
                    <div  className={(stop === 2) ? openStop :' hidden '} onClick={()=>setStop(3)} >+ stop</div> 
                    <div 
                        className={(stop > 2) ? closeStop :'hidden'} 
                        onClick={()=>{ 
                            if(stop===2) return setStop(3);
                            const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 2)
                            const data: IObj ={}
                            array.map((item, index) => {
                                const number  = index+1;
                                data[number] = item;
                            })
                            setLocalStops(data)
                            setStops(data)
                            setStop(stop - 1)
                        }}
                    ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 
            </div>}

            {list[activeCarId-1].type<3 && <div className={(stop > 2 ) ?  extraCardStop: 'hidden'}>
                <div className={stop > 3 ? box : box + ' opacity-0 '}>
                    <span className='icon  text-orange-400'><SlLocationPin/></span>
                    <GoogleAddressInput
                        style='w-full'
                        defaultLocation={localStops[4] || ''} 
                        onChange={(e)=>{
                            setLocalStops({...localStops, 4:e})
                        }}
                        placeholder={isFrench? store.locationListF[5]:store.locationList[5]}
                    />
                </div>

                <div className={(stop === 3) ? openStop :'hidden'} onClick={()=>setStop(4)}>+ stop</div> 
                <div 
                    className={(stop > 3) ? closeStop :'hidden'} 
                    onClick={()=>{ 
                        if(stop===3) return setStop(4);
                        const array = Object.values(list[activeCarId-1].stops).filter((_, index) => index !== 3)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setLocalStops(data)
                        setStops(data)
                        setStop(stop - 1)
                    }}
                ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 
            </div>}


            {list[activeCarId-1].type<3 && <div className={locationCard}>
                <div className={isTo ? extraCardPickUp : extraCardPickUp +' border-red-500'}>
                    <span className='icon text-red-500'><SlLocationPin/></span>
                    <GoogleAddressInput
                        style='w-full' 
                        defaultLocation={list[activeCarId-1].to || ''} 
                        onChange={setTo}
                        placeholder={isFrench? store.locationListF[1]:store.locationList[1]}
                    />
                </div>
                {list[activeCarId-1].icon2 ===1 && 
                <div className="border flex items-center w-1/3 rounded py-1">
                <Select 
                    style={{borderRadius: 5}}
                    className='favorite truncate '
                    options={store.departureSections.map(item=>(
                        {value: item, label: item}
                    ))}   
                    onChange={setDeparture2} 
                    placeholder='Departure' 
                />
                </div>}
            </div>}

            {list[activeCarId-1].type<3 && list[activeCarId-1].icon2>0 &&  <div className={iconsType}>
                
                <div className={icons}>           
                    <span className={list[activeCarId-1].icon2 == 1 ? iconCard + ' rounded-l' : iconCardActive}>
                        <MdFlightTakeoff className={ iconItem + ' text-xl ' } />
                    </span>
                    <span className={list[activeCarId-1].icon2 == 2 ? iconCard : iconCardActive}>
                        <div style={{backgroundImage:`url(${train})`}}  className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>

                    </span>
                    <span className={list[activeCarId-1].icon2 == 3 ?iconCard : iconCardActive}>
                        <FaBus className={ iconItem}/>
                    </span>
                    <span className={list[activeCarId-1].icon2 == 4 ?iconCard : iconCardActive}>
                        <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>

                    </span>
                    <span className={list[activeCarId-1].icon2 == 5 ?iconCard+ ' rounded-r' : iconCardActive }>
                        <MdLocalHotel className={ iconItem }/>
                    </span>
                </div>

                {list[activeCarId-1].icon2>0 && <div className={flightCard }>
                    {list[activeCarId-1].icon2 === 1 && 
                    <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius: 5}} 
                        options={store.flights.map(item=>(
                            {value: item, label: item}
                        ))} 
                        onChange={(e)=>{setFlight2({...list[activeCarId-1].flight2, title: e})}}
                        placeholder='Airlines' 
                    />}
                    
                    {list[activeCarId-1].icon2 === 1
                        ?<MdFlightTakeoff className='text-xl mx-1'/>
                        :list[activeCarId-1].icon2 === 2
                        ? <div style={{backgroundImage:`url(${train})`}}  className="w-8 h-8 bg-contain bg-no-repeat bg-center"></div>
                        :list[activeCarId-1].icon2 === 3
                        ? <FaBus className=' mx-1'/>
                        :list[activeCarId-1].icon2 === 4
                        ? <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        :list[activeCarId-1].icon2 === 5 
                        ?<MdLocalHotel className='mx-1'/>
                        :<MdFlightLand className='text-xl mx-1'/>
                    }
                    {list[activeCarId-1].icon === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        { prefixes[list[activeCarId-1].flight2.title]}
                    </div>}
                    <Input 
                        value={list[activeCarId-1].flight2.number}
                        maxLength={4}
                        placeholder={list[activeCarId-1].icon2 === 1 ?'####': list[activeCarId-1].icon2 === 2 ? 'Train#' : list[activeCarId-1].icon2 === 3 ? "Bus#" : list[activeCarId-1].icon2 === 4 ? 'Boat#': 'Room#'} 
                        className={list[activeCarId-1].icon === 1 ? ' max-w-[80px]': '' } 
                        style={{ width:`${list[activeCarId-1].icon2 === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 0, height: 30}} 
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                            setFlight2({...list[activeCarId-1].flight2, number: e.target.value.replace(/\D/g, '')})
                        }}
                    />
                    {list[activeCarId-1].flight2.number.length<3 && list[activeCarId-1].flight2.number.length>0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}

                </div>}
            </div>}

            {list[activeCarId-1].type<3 &&<div className={list[activeCarId-1].type + ' pt-4'}>
                <button className={reset} onClick={resetForm}>{isFrench? 'Réinitialiser': 'Reset'}</button>
            </div>}

            {list[activeCarId-1].type<3 && 
            <div className='w-full flex justify-between max-w-[400px] mx-auto pt-10'>
                <div className="bg-red-500 p-2 px-3 rounded-full text-white cursor-pointer border border-black active:bg-red-400" onClick={()=>setSteps(1)}>{isFrench? 'Précédent': 'Back'}</div>
                <div 
                    className="bg-green-400 p-2 px-3 rounded-full cursor-pointer border border-black text-white flex items-center active:bg-green-300"
                    onClick={goNext}
                >{isFrench? 'Suivant': 'Next'}</div>
            </div>}

            {list[activeCarId-1].type>2 && 
            <div className='flex pt-10'> 
                {
                    list[activeCarId-1].filled 
                    ?<>
                        <div className="px-4 py-2 text-gray-400 flex items-center "><MdDone className='-translate-y-[1px] text-xl'/> Completed! </div>
                        <div   
                            className='bg-yellow-200 px-3  self-start py-2 rounded cursor-pointer text-center border border-yellow-500 active:bg-yellow-100' 
                            onClick={()=> {
                                setIsSubmit(true)
                            }}
                        > View orders</div>
                    
                    </>
                    :<div 
                        className='bg-green-400 px-3  self-start py-2 rounded cursor-pointer text-center text-white border-2 border-green-500 active:bg-green-300'
                        onClick={()=>{
                            if(list[activeCarId-1].timeType && !list[activeCarId-1].time)return alert('You need choose time')
                            if(list[activeCarId-1].timeType && !list[activeCarId-1].date)return alert('You need choose date')
                            if(!list[activeCarId-1].from){
                                setIsFrom(false)
                                return alert('need address')
                            }
                            setIsFrom(true)
                            setFilled(true, activeCarId)
                        }}
                    >
                        order car
                    </div>
                }
            </div>
            }
        </div>
    </div>
    );
};

export default TripContent;



const box = 'flex relative border  rounded w-full'


const typeIconItem = 'w-8 h-8 mx-auto bg-contain bg-no-repeat bg-center'
const amText = 'pl-2  flex items-center py-1 pr-[2px] '
const amTextActive = 'pl-2  flex items-center py-1 pr-[2px] bg-gray-600 text-white '

const pmText = 'px-2 pl-4 rounded-tl triangle flex bg-white items-center py-1 '
const pmTextActive = 'px-2 pl-4 text-white bg-gray-600  rounded-tl triangle flex items-center py-1 '

const selectText = 'px-2 text-[#0C0B09] bg-gray-200 flex items-center py-1 border-r border-black '
const selectTextActive = 'px-2  bg-gray-600 text-white flex items-center py-1 border-r border-black '

const timeToggle = ' absolute top-1 font-bold right-2 flex  items-center text-xs  cursor-pointer  rounded overflow-hidden border border-black '


const typeItem2 = 'flex items-center px-2 py-1 cursor-pointer text-[10px] px-0 w-1/4'
const typeCard = 'flex  self-center border border-black rounded  divide-x overflow-hidden w-full'

const content = 'flex flex-col w-full space-y-3 py-10 pt-20'

const typeItem = ' flex flex-col  border-black items-center justify-between cursor-pointer w-12 h-15'
const trickster = "absolute flex flex-col justify-between border-l border-black bg-green-400 items-center w-12  left-0 h-full bg-green-300 duration-500"
const mainType = ' absolute top-6  right-1/2 translate-x-1/2 justify-center -translate-x-3 text-[10px]  divide-x flex border border-black '



const toggle ='flex self-start relative items-center rounded border border-black duration-500 transition cursor-pointer mb-2 overflow-hidden' 
const toggleLabel ='flex  items-center  text-xs  duration-500 transition px-2   text-black font-bold min-w-[42px] py-1'
const toggleLabelActive ='flex min-w-[42px] items-center py-1 text-xs  duration-500 transition px-2   opacity-25 font-bold '

const reset = 'px-4 py-1 bg-red-500 text-white rounded hover:bg-red-400 active:bg-red-600 border border-black'

const iconCard = 'flex items-center justify-center w-8 h-8  bg-sky-400 border-black'
const iconCardActive = 'flex items-center justify-center  w-8 h-8 border-black'
const iconItem = ' '
const icons = 'flex divide-x  border-black border rounded  overflow-hidden'
const iconsType = 'flex items-center justify-between w-full sm:space-x-0 xl:space-x-4  lg:space-x-4 2xl:space-x-4'
const flightCard = 'flex relative items-center border w-1/2 rounded py-1'

const closeStop =" my-auto w-5 h-5  bg-red-500 ml-1  rounded flex  justify-center cursor-pointer text-bold items-center"
const openStop ="absolute bg-green-400 px-2 py-1 text-xs  text-gray-700 rounded flex cursor-pointer border border-gray-800"


const setDateBtn = ' border bg-sky-500 hover:bg-sky-400 active:bg-sky-600 shadow cursor-pointer rounded px-3 py-2 flex text-white items-center'
const dateTimeSubmenu ='absolute z-30 flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow-xl rounded-xl sm:-left-[10px]'
const dateRow = 'flex relative   w-full   justify-between'

const dateInput = 'text-xs flex border cursor-pointer h-[40px] relative w-[200px] max-w-[200px] w-full rounded'

const date = 'flex w-full items-center justify-between border-b-2 border-black pb-6 flex-wrap pt-4'
const locationCard = 'flex relative items-center w-full  space-x-2'

const extraCardStop = 'flex relative w-5/6 self-end  rounded'
const extraCardPickUp = 'flex relative w-3/4 items-center border w-full rounded'

const container = 'flex relative  px-4  w-full  relative  rounded-b  border shadow-xl border-t-0'

// const label = 'absolute -top-2 right-1/2 translate-x-1/2 bg-white px-4 text-gray-400 font-bold sm:hidden'