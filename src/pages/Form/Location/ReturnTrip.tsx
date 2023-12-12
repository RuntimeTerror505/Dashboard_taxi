import { ChangeEvent, useEffect, useState } from "react";
import { Input,  Select } from "antd";
import dayjs from "dayjs";
import useOnclickOutside from "react-cool-onclickoutside";

import GoogleAddressInput from "../../../UI/components/GoogleAddressInput";
import TimePicker from "../../../UI/components/TimePicker";
import DatePicker from "../../../UI/components/DatePicker";
import { useStore } from "../../../Store";


import { SlLocationPin } from "react-icons/sl";
import { PiCalendarCheckLight } from "react-icons/pi";
import { FaBus } from "react-icons/fa";
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { MdLocalHotel } from "react-icons/md";
import { useMain } from "../../../Store/useMain";
import React from "react";
interface IObj {[key:number]: string}
import sky from './../../../assets/day.png'
import sun from './../../../assets/sun.png'
import stars from './../../../assets/night.jpg'
import train from './../../../assets/train.jpeg'
import boat from './../../../assets/ship.png'



const ReturnTrip = ():React.ReactNode  => {
    const {
        list,
        isFrench,
        activeCarId,
        setFromR, 
        setToR, 
        setIconR, 
        setIcon2R, 
        setStopsR, 
        setDateR,
        setTimeR,
        setDepartureR,
        setDeparture2R,
        setFlightR,
        setFlight2R, 
        resetReturn,
        setTimeTypeR,
        setSteps,
    } =useMain()
    const { store } = useStore()
    
    const [ day, setDay ] = useState(true)
    const [trigger, setTrigger] = useState({ 1: 1, 2: 1 })
    const [stopTrigger, setStopTrigger] = useState(true)
    const [fullDate, setFullDate] = useState(dayjs())
    const [isDateOpen, setIsDateOpen] = useState(false)
    const ref = useOnclickOutside(() => setIsDateOpen(false));
    const [stop, setStop] = useState(3)
    const [isDateR, setIsDateR] = useState(true)
    const [isFromR, setIsFromR] = useState(true)
    const [isToR, setIsToR] = useState(true)

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
        setDay(list[activeCarId-1].timeR.slice(0,2) > '04' && list[activeCarId-1].timeR.slice(0,2) < '23')
    },[list[activeCarId-1].timeR,list[activeCarId-1].timeTypeR])

    useEffect(()=>{
        if(trigger[1]) setFromR(list[activeCarId-1].to)
        if(trigger[2]) setToR(list[activeCarId-1].from)
    },[trigger,list[activeCarId-1].to, list[activeCarId-1].from])

    useEffect(()=>{
        //I get all stops revert it ans complete in new array, I want to display stops order without holes im order! so we need make a sort every time when stops changes
        if(stopTrigger) {
            const values = Object.values(list[activeCarId-1].stops).filter(value=>value).reverse()
            setStop(values.length)
            const data: IObj ={}
            values.map((item, index) => {
                const number  = index+1;
                data[number] = item;
                if(item) { setStopsR(data) }
            })
        }
    },[stopTrigger, list[activeCarId-1].stops])

    useEffect(()=>{
        if(trigger){
            setIsDateR(list[activeCarId-1].dateR.length>0)
            setIsFromR(list[activeCarId-1].fromR.length>0)
            setIsToR(list[activeCarId-1].toR.length>0)
        }
    },[list[activeCarId-1]])

    useEffect(()=>{
        setIconR(0)
        setIcon2R(0)
        store.airportArray.map(item =>{
            if(list[activeCarId-1].fromR.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIconR(1)
        })
        store.busArray.map(item =>{
            if(list[activeCarId-1].fromR.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIconR(3)

        })
        store.trainArray.map(item =>{
            if(list[activeCarId-1].fromR.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIconR(2)
        })
        store.boatArray.map(item =>{
            if(list[activeCarId-1].fromR.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIconR(4)
        })
        store.hotelArray.map(item =>{
            if(list[activeCarId-1].fromR.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIconR(5)
        })
        store.airportArray.map(item =>{
            if(list[activeCarId-1].toR.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2R(1)
        })
        store.busArray.map(item =>{
            if(list[activeCarId-1].toR.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length >0) setIcon2R(3)

        })
        store.trainArray.map(item =>{
            if(list[activeCarId-1].toR.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2R(2)
        })
        store.boatArray.map(item =>{
            if(list[activeCarId-1].toR.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2R(4)
        })
        store.hotelArray.map(item =>{
            if(list[activeCarId-1].toR.split(' ').filter((word)=> word.toLowerCase() === item.toLowerCase()).length > 0) setIcon2R(5)
        })

    },[list[activeCarId-1].from,list[activeCarId-1].fromR, list[activeCarId-1].to,list[activeCarId-1].toR])



    function goNext() {

        setIsDateR(list[activeCarId-1].date.length>0)
        setIsFromR(list[activeCarId-1].from.length>0)
        setIsToR(list[activeCarId-1].to.length>0)

        if(!list[activeCarId-1].date) return alert('need date')
        if(!list[activeCarId-1].time && list[activeCarId-1].timeType!==0 ) return alert('need time')
        if(!list[activeCarId-1].from) return alert('need pick up location')
        if(!list[activeCarId-1].to) return alert('need drop of location')

        if(list[activeCarId-1].date && list[activeCarId-1].from && list[activeCarId-1].to && !list[activeCarId-1].isReturnTrip) return setSteps(3)
        if(!list[activeCarId-1].dateR && list[activeCarId-1].isReturnTrip) return alert('need return date')
        if(!list[activeCarId-1].timeR && list[activeCarId-1].isReturnTrip ) return alert('need return time')
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
    function setBackSection(){
        setTrigger({ 1: 1, 2: 1 })
        setStopTrigger(true)
    }
    function resetCard(){
        setTrigger({ 1: 0, 2: 0 })
        setStopTrigger(false)
        resetReturn();
    }

    
    return (
    <div className={container}>
        {!list[activeCarId-1].isReturnTrip && <div className='absolute left-0 top-10 right-0 bottom-0 z-20 bg-white opacity-50'></div>}
        <div className={content}>
            
            <div className={date}>
                <div style={{backgroundImage:`url(${day? sky :stars})`, backgroundPosition:`${day? ' ': '11px -30px'}` }} className={day? bg +" bg-right ": bg }>
                    <div className="absolute -top-4 right-1/2 translate-x-1/2 border flex items-center bg-white px-4 py-1 rounded">
                        {day
                            ? isFrench? 'Tarification jour ': 'Day fare'
                            : isFrench? 'Tarification nuit': 'Night fare'
                        } 
                    </div>
                    {day && <div  className='absolute top-1 left-2 w-12 h-12 bg-no-repeat bg-center bg-contain rotate-45' style={{backgroundImage:`url(${sun})` }}></div>}
                </div>
                <div className={dateRow}>
                    <div className={isDateR ? dateInput : dateInput +' border-red-500'}  onClick={()=> setIsDateOpen(true)} ref={ref}> 
                        <span className='icon text-xl'><PiCalendarCheckLight/></span>
                            {list[activeCarId-1].dateR ? 
                            <div className='flex items-center'>
                                {fullDate.format('dddd')==='Monday'? isFrench ?'Lundi' : 'Monday'
                                :fullDate.format('dddd')==='Tuesday'? isFrench ? 'Mardi':'Tuesday'
                                :fullDate.format('dddd')==='Wednesday'?isFrench ? 'Merceredi':'Wednesday'
                                :fullDate.format('dddd')==='Thursday'?isFrench ? 'Jeudi':'Thursday'
                                :fullDate.format('dddd')==='Friday'?isFrench ? 'Venderdi':'Friday'
                                :fullDate.format('dddd')==='Saturday'?isFrench ? 'Samedi':'Saturday'
                                : isFrench ?'Dimanche': 'Sunday'},
                                {'  '+fullDate.format('MMM')}
                                {'.  '+fullDate.format('D')}
                                { fullDate.format('DD') === '01' || fullDate.format('DD') === '21' || fullDate.format('DD') === '31'
                                    ? 'st'
                                    :  fullDate.format('DD') === '02' || fullDate.format('DD') === '22' || fullDate.format('DD') === '32'
                                    ?  'nd'
                                    :  fullDate.format('DD') === '03' || fullDate.format('DD') === '23' || fullDate.format('DD') === '33'
                                    ? 'rd'
                                    : 'th'
                                }
                            {' '+fullDate.format('YYYY')} </div>:  <div className='flex items-center'>Choose return date</div> }
                        {isDateOpen && <div className={dateTimeSubmenu}>
                            <DatePicker value={list[activeCarId-1].dateR} isReturn={true} time={list[activeCarId-1].timeR} onChange={setDateR} getFullDate={setFullDate}/>
                            <div className="flex justify-between pl-8">
                                <div className={setDateBtn} onClick={(e)=> {
                                        e.stopPropagation();
                                        setIsDateOpen(false)
                                    }}>accept</div>
                            </div>
                        </div>}
                    </div>
                    <TimePicker isAm={list[activeCarId-1].timeTypeR} time={list[activeCarId-1].timeR} onChange={setTimeR} date={list[activeCarId-1].dateR}/>
                    <div className={list[activeCarId-1].timeTypeR===1 ? timeToggle + ' bg-gray-600 ':timeToggle+ ' '}>
                        <div className={list[activeCarId-1].timeTypeR===0 ? selectTextActive :selectText } onClick={()=>setTimeTypeR(0)}>{isFrench? 'Choisir':'Select'}</div>
                        <div className={list[activeCarId-1].timeTypeR===1 ? amTextActive : amText} onClick={()=>setTimeTypeR(1)}>am</div>
                        <div className="absolute  border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
                        <div className={list[activeCarId-1].timeTypeR===2 ? pmTextActive: pmText} onClick={()=>setTimeTypeR(2)}>PM</div>    
                    </div>

                </div>
            </div>

            {list[activeCarId-1].iconR>0 && <div className={type}>
                <div className={icons}>
                    
                    <span className={list[activeCarId-1].iconR == 1 ?  iconCard : iconCardActive  }>
                        <MdFlightLand className={ iconItem + ' text-xl ' } />
                    </span>
                    <span className={list[activeCarId-1].iconR == 2 ? iconCard : iconCardActive  }>
                        <div style={{backgroundImage:`url(${train})`}}  className="w-7 h-7 bg-cover bg-no-repeat bg-center"></div>
                    </span>
                    <span className={list[activeCarId-1].iconR == 3 ? iconCard : iconCardActive }>
                        <FaBus className={ iconItem} />
                    </span>
                    <span className={list[activeCarId-1].iconR == 4 ? iconCard : iconCardActive  }>
                        <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                    </span>
                    <span className={list[activeCarId-1].iconR == 5 ? iconCard : iconCardActive  }>
                        <MdLocalHotel className={ iconItem }/>
                    </span>
                </div>

                {list[activeCarId-1].iconR > 0 && <div className={flightCard }>
                    {list[activeCarId-1].iconR === 1 && 
                    <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius: 5}} 
                        options={store.flights.map(item=>({value: item, label: item}))} 
                        onChange={(e)=>{setFlightR({...list[activeCarId-1].flightR, title: e})}}
                        placeholder='Airlines' 
                    />}
                    
                    {list[activeCarId-1].iconR === 1
                        ?<MdFlightLand className='text-xl mx-1'/>
                        :list[activeCarId-1].iconR === 2
                        ?<div style={{backgroundImage:`url(${train})`}}  className="w-7 h-7 bg-cover bg-no-repeat bg-center"></div>
                        :list[activeCarId-1].iconR === 3
                        ? <FaBus className=' mx-1'/>
                        :list[activeCarId-1].iconR === 4
                        ? <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        :list[activeCarId-1].iconR === 5 
                        ?<MdLocalHotel className='mx-1'/>
                        :<MdFlightLand className='text-xl mx-1'/>
                    }   
                    {list[activeCarId-1].iconR === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        { prefixes[list[activeCarId-1].flightR.title]}
                    </div>}
                    <Input 
                        value={list[activeCarId-1].flightR.number}
                        maxLength={4}
                        placeholder={list[activeCarId-1].iconR === 1 ?'####': list[activeCarId-1].iconR === 2 ? 'Train#' : list[activeCarId-1].iconR === 3 ? "Bus#" : list[activeCarId-1].iconR === 4 ? 'Boat#': 'Room#'} 
                        style={{width:`${list[activeCarId-1].iconR === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 5, height: 30}}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                            setFlightR({...list[activeCarId-1].flightR, number: e.target.value.replace(/\D/g, '')})
                        }}
                    />
                    {list[activeCarId-1].flightR.number.length<3 && list[activeCarId-1].flightR.number.length>0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}

                </div>} 
            </div>}

            <div className={locationCard}>
                <div className={isFromR ? extraCard : extraCard + ' border-red-500'}>
                    <span className='icon text-green-400'><SlLocationPin/></span>
                    <GoogleAddressInput 
                        style='w-full ' 
                        defaultLocation={
                            list[activeCarId-1].fromR
                            ? list[activeCarId-1].fromR
                            : list[activeCarId-1].to && trigger[1] 
                            ? list[activeCarId-1].to
                            : ''
                        }
                        onChange={(e)=> {
                            setFromR(e)
                            setTrigger({...trigger, 1: 0})
                        }}
                        placeholder={isFrench? store.locationListF[0]:store.locationList[0]}
                    />
                </div>
                {list[activeCarId-1].icon === 1 && <div className="border flex items-center w-1/3 rounded py-1">
                    <Select placeholder='Departure' className='favorite' style={{ height: 30, borderRadius: 5}}onChange={setDepartureR}options={store.departureSections.map(item=>({value: item, label: item}))}/>
                </div>}
            </div>

            
            <div className={extraCardStop}>
                <div className={(stop > 0)? box: box + ' opacity-0 '}>
                    <span className='icon text-orange-400'><SlLocationPin/></span> 
                    <GoogleAddressInput
                        style='w-full'
                        defaultLocation={list[activeCarId-1].stopsR[1]} 
                        onChange={(e)=>{
                            setStopTrigger(false)
                            setStopsR({...list[activeCarId-1].stopsR, 1: e})
                        }}
                        placeholder={isFrench? store.locationListF[2]:store.locationList[2]}
                    />
                </div>
                <div 
                    className={(stop === 0) ? openStop : 'hidden'} 
                    onClick={()=>{ 
                        if(stop===0) return setStop(1);
                        const array = Object.values(list[activeCarId-1].stopsR).filter((_, index) => index !== 0)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setStopTrigger(false)
                        setStopsR(data)
                        setStop(stop - 1)
                    }}
                >+ stop</div>
                <div 
                    className={(stop > 0) ? closeStop : 'hidden'} 
                    onClick={()=>{ 
                        if(stop===0) return setStop(1);
                        const array = Object.values(list[activeCarId-1].stopsR).filter((_, index) => index !== 0)
                        const data: IObj ={}
                        array.map((item, index) => {
                            const number  = index+1;
                            data[number] = item;
                        })
                        setStopsR(data)
                        setStop(stop - 1)
                    }}
                ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 

            </div>

            
            <div className={(stop > 0 ) ?  extraCardStop: 'hidden'}>
                <div className={stop > 1 ? box: box + ' opacity-0 '}>
                    <span className='icon text-orange-400'><SlLocationPin/></span>
                    <GoogleAddressInput 
                        style='w-full'
                        defaultLocation={list[activeCarId-1].stopsR[2]} 
                        onChange={(e)=>{
                            setStopTrigger(false)
                            setStopsR({...list[activeCarId-1].stopsR, 2: e})
                        }}
                        placeholder={isFrench? store.locationListF[3]:store.locationList[3]}
                    />
                </div>
                    <div  className={(stop === 1) ? openStop :'hidden'} onClick={()=> setStop(2)} >+ stop</div> 

                    <div 
                        className={(stop > 1) ? closeStop : 'hidden'} 
                        onClick={()=>{
                                if(stop===1) return setStop(2) 
                                const array = Object.values(list[activeCarId-1].stopsR).filter((_, index) => index !== 1)
                                const data: IObj ={}
                                array.map((item, index) => {
                                    const number  = index+1;
                                    data[number] = item;
                                })
                                setStopTrigger(false)
                                setStopsR(data)
                                setStop(stop -1)
                            }}
                    ><span className='scale-[150%] font-bold rotate-45'>+</span></div>  
            </div>

            
            <div className={(stop > 1 ) ?  extraCardStop: 'hidden'}>
                <div className={stop > 2 ? box : box + ' opacity-0 '}>
                    <span className='icon text-orange-400'><SlLocationPin/></span>
                    <GoogleAddressInput 
                        style='w-full'
                        defaultLocation={list[activeCarId-1].stopsR[3]} 
                        onChange={(e)=>{
                            setStopTrigger(false)
                            setStopsR({...list[activeCarId-1].stopsR, 3: e})
                        }}
                        placeholder={isFrench? store.locationListF[4]:store.locationList[4]}
                    />
                </div>
                <div className={(stop === 2) ? openStop :'hidden'} onClick={()=> setStop(3)}>+ stop</div> 
                <div 
                    className={(stop > 2) ? closeStop :'hidden'} 
                    onClick={()=>{ 
                            if(stop===2) return setStop(3)
                            const array = Object.values(list[activeCarId-1].stopsR).filter((_, index) => index !== 2)
                            const data: IObj ={}
                            array.map((item, index) => {
                                const number  = index+1;
                                data[number] = item;
                            })
                            setStopTrigger(false)
                            setStopsR(data)
                            setStop(stop -1) 
                        }}
                ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 
            </div>

            
            <div className={(stop > 2  ) ?  extraCardStop: 'hidden'}>
                <div className={stop > 3 ? box : box + ' opacity-0 '}>

                    <span className='icon text-orange-400'><SlLocationPin/></span>
                    <GoogleAddressInput 
                        style='w-full '
                        defaultLocation={list[activeCarId-1].stopsR[4]} 
                        onChange={(e)=>{
                            setStopTrigger(false)
                            setStopsR({...list[activeCarId-1].stopsR, 4: e})
                        }}
                        placeholder={isFrench? store.locationListF[5]:store.locationList[5]}
                    />
                </div>
                <div className={(stop === 3) ? openStop :'hidden'}onClick={()=>setStop(4)} >+ stop</div> 
                <div 
                    className={(stop > 3) ? closeStop :'hidden'} 
                    onClick={()=>{ 
                        if(stop===3) return setStop(4)
                            const array = Object.values(list[activeCarId-1].stopsR).filter((_, index) => index !== 3)
                            const data: IObj ={}
                            array.map((item, index) => {
                                const number  = index+1;
                                data[number] = item;
                            })
                            setStopTrigger(false)
                            setStopsR(data)
                            setStop(stop -1) 
                        }}
                ><span className='scale-[150%] font-bold rotate-45'>+</span></div> 
            </div>

            <div className={locationCard}>
                <div className={isToR ? extraCard : extraCard + ' border-red-500'}>
                    <span className='icon text-red-400'><SlLocationPin/></span>
                    <GoogleAddressInput 
                        defaultLocation={
                            list[activeCarId-1].toR 
                            ?  list[activeCarId-1].toR
                            : list[activeCarId-1].from && trigger[2]
                            ? list[activeCarId-1].from 
                            : ''
                        } 
                        style='w-full' 
                        onChange={(e)=> {
                            setToR(e)
                            setTrigger({...trigger, 2: 0})
                        }}
                        placeholder={isFrench? store.locationListF[1]:store.locationList[1]}
                    />
                </div>
                {list[activeCarId-1].icon2 === 1 && 
                <div className="border flex items-center w-1/3 rounded">
                    <Select placeholder='Departure' className='favorite ' style={{ height: 30, borderRadius: 5}}onChange={setDeparture2R}options={store.departureSections.map(item=>({value: item, label: item}))}/>
                </div>}
            </div>

            <div className={type}>
                
                <div className={icons}>
                    <span className={list[activeCarId-1].icon2R == 1 ? iconCard : iconCardActive  }>
                        <MdFlightTakeoff className={ iconItem + 'text-xl' } />
                    </span>
                    <span className={list[activeCarId-1].icon2R == 2 ? iconCard : iconCardActive  }>
                        <div style={{backgroundImage:`url(${train})`}}  className="w-7 h-7 bg-cover bg-no-repeat bg-center"></div>
                    </span>
                    <span className={list[activeCarId-1].icon2R == 3 ? iconCard : iconCardActive  }>
                        <FaBus className={ iconItem} />
                    </span>
                    <span className={list[activeCarId-1].icon2R == 4 ? iconCard : iconCardActive  }>
                        <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>

                    </span>
                    <span className={list[activeCarId-1].icon2R == 5 ? iconCard : iconCardActive  }>
                        <MdLocalHotel className={ iconItem}/>
                    </span>
                </div>

                {list[activeCarId-1].icon2R>0 && <div className={flightCard }>
                    {list[activeCarId-1].icon2R === 1 && <Select 
                        className='favorite w-1/2 max-h-[30px]'
                        style={{width: '100px', borderRadius:5}} 
                        options={store.flights.map(item=>(
                            {value: item, label: item}
                        ))} 
                        onChange={(e)=>{
                            setFlight2R({...list[activeCarId-1].flight2R, title: e})
                        }} 
                        placeholder='Airlines' 
                    />}
                    
                    {list[activeCarId-1].icon2R === 1
                        ?< MdFlightTakeoff className='text-xl mx-1'/>
                        :list[activeCarId-1].icon2R === 2
                        ?<div style={{backgroundImage:`url(${train})`}}  className="w-7 h-7 bg-cover bg-no-repeat bg-center"></div>
                        :list[activeCarId-1].icon2R === 3
                        ? <FaBus className=' mx-1'/>
                        :list[activeCarId-1].icon2R === 4
                        ? <div style={{backgroundImage:`url(${boat})`}}  className="w-5 h-5 bg-cover bg-no-repeat bg-center"></div>
                        :list[activeCarId-1].icon2R === 5 
                        ?<MdLocalHotel className='mx-1'/>
                        :<MdFlightLand className='text-xl mx-1'/>
                    }   
                    {list[activeCarId-1].icon2R === 1 && <div className='text-sm pl-1 text-gray-500 translate-y-[0.5px] pr-[1px]'>
                        {prefixes[list[activeCarId-1].flight2R.title]}
                    </div>}
                    <Input 
                        value={list[activeCarId-1].flight2R.number}
                        maxLength={4}
                        placeholder={list[activeCarId-1].icon2R === 1 ?'####': list[activeCarId-1].icon2R === 2 ? 'Train#' : list[activeCarId-1].icon2R === 3 ? "Bus#" : list[activeCarId-1].icon2R === 4 ? 'Boat#': 'Room#'} 
                        style={{width:`${list[activeCarId-1].icon2R === 1 ? '70px': '100%' }`, paddingLeft:0, borderRadius: 0, height: 30}}
                        onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                            setFlight2R({...list[activeCarId-1].flight2R, number: e.target.value.replace(/\D/g, '')})

                        }
                    }/>
                    {list[activeCarId-1].flight2R.number.length<3 && list[activeCarId-1].flight2R.number.length>0 && <div className='absolute right-0 -bottom-4 text-[10px] text-red-500'>from 3 to 4 digits</div>}

                </div> }
            </div>

            <div className={btns}>
                <button className={reset} onClick={resetCard}>{isFrench? 'Réinitialiser': 'Reset'}</button>
                <button className={revert} onClick={setBackSection}>{isFrench? store.tripTitlesF[1] : store.tripTitles[1]}</button>
            </div>
            <div className='w-full flex justify-between max-w-[400px] mx-auto pt-10'>
                <div className="flex items-center bg-red-500 p-2 px-3 rounded-full text-white cursor-pointer border border-black active:bg-red-400" onClick={()=>setSteps(1)}>{isFrench? 'Précédent': 'Back'}</div>
                <div 
                    className="bg-green-400 p-2 px-3 rounded-full cursor-pointer border border-black active:bg-green-300"
                    onClick={goNext}
                >{isFrench? 'Suivant': 'Next'}</div>
            </div>
        </div>
    </div>
    );
};


export default ReturnTrip;


const box = 'flex relative border rounded w-full'

const amText = 'pl-2  flex items-center py-1 pr-[2px] '
const amTextActive = 'pl-2  flex items-center py-1 pr-[2px] bg-gray-600 text-white '

const pmText = 'px-2 pl-4  triangle flex bg-white items-center py-1 '
const pmTextActive = 'px-2 pl-4 text-white bg-gray-600 triangle flex items-center py-1 '

const selectText = 'px-2 text-[#0C0B09] bg-gray-200 flex items-center py-1 border-r border-black '
const selectTextActive = 'px-2  bg-gray-600 text-white flex items-center py-1 border-r border-black '

const timeToggle = ' absolute -top-8 font-bold right-0 flex  items-center text-xs  cursor-pointer  rounded overflow-hidden border border-black '


const bg = 'relative  w-full h-14 my-1 mb-10  bg-cover  rounded-xl bg-right '
const content = ' relative flex flex-col w-full  space-y-3 py-10'

const reset = 'px-4 py-1 bg-red-500 text-white rounded hover:bg-red-400 active:bg-red-600 border border-black '
const revert = 'px-4 py-1 bg-orange-400 text-white rounded  active:bg-orange-300 border border-black'

const iconCard = 'flex items-center justify-center w-8 h-8 bg-sky-400'
const iconCardActive = 'flex items-center justify-center  w-8 h-8 border-black'
const iconItem = ' '
const icons = 'flex divide-x  border-black border rounded  overflow-hidden'
const type = 'flex items-center justify-between w-full sm:space-x-0 xl:space-x-4  lg:space-x-4 2xl:space-x-4'
const flightCard = 'flex relative items-center border w-1/2 py-1 rounded '

const btns = 'flex items-center  w-full  space-x-4 pt-4'

const closeStop =" my-auto w-5 h-5  bg-red-500 ml-1  rounded flex  justify-center cursor-pointer text-bold items-center"
const openStop ="absolute bg-green-400 px-2 py-1 text-xs rounded flex cursor-pointer border border-black text-black"



const setDateBtn = ' border bg-blue-500 hover:bg-blue-400 active:bg-blue-600 cursor-pointer px-2 py-1 flex text-white items-center'
const dateTimeSubmenu ='absolute z-30 flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow sm:-left-[10px]'

const dateRow = 'flex relative sm:items-start items-start w-full justify-between'

const dateInput = 'text-xs flex border py-1 h-[40px] relative w-full max-w-[200px] rounded'
const date = 'flex w-full flex-col border-b-2 border-black pb-6 '

const locationCard = 'flex relative items-center w-full  space-x-2'
const extraCard = 'flex relative items-center border w-full rounded'
const extraCardStop = 'flex relative w-5/6 self-end  rounded'

const container = 'flex relative  px-4  w-full rounded-b relative border shadow-xl border-t-0'

// const label = 'absolute -top-2 right-1/2 translate-x-1/2 bg-white px-4 text-gray-400 font-bold sm:hidden'