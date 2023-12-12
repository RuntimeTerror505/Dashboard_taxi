import React, { useEffect, useState } from "react";
import { useDashboard } from "../../Store/dashboard";
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
import { FaRegQuestionCircle } from "react-icons/fa";


const Orders = ():React.ReactNode => {
    const { orders, getOrders } = useDashboard()
    const { 
        list, 
        setTitle,
        setName,
        setTitle2,
        setName2 ,
        setTitle3,
        setName3 ,
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
        setTo,
        setDeparture,
        setDeparture2,
    } = useMain()
    const { store } = useStore()
    const isFrench = false;
    const isTitle = false;
    const isName = false;
    const isTitle2 = false;
    const isName2 = false;
    const isTitle3 = false;
    const isName3 = false;
    const isEmail = false;
    const options1 = isFrench ? store.titleListF.map(item=>({value: item, label: item })) : store.titleList.map(item=>({value: item, label: item }))
    const [ localStops, setLocalStops ] = useState<{[key:number]:string}>({})

    const [isPhone, setIsPhone] = useState(true)
    const [isDateOpen, setIsDateOpen] = useState(false)
    const [isDate, setIsDate] = useState(true)
    const [fullDate, setFullDate] = useState(dayjs())
    const [isFrom, setIsFrom] = useState(true)
    const [isTo, setIsTo] = useState(true)

    const ref = useOnclickOutside(() => setIsDateOpen(false));


    const noPhone = 'false'

    useEffect(()=>{
        getOrders()
    },[])

    return (
        <div className={box}>
{/* __________________________________________________personal info_______________________________________________________             */}
            <div className={personalInfo}>
                <div className='pb-2 text-yellow-400'>
                    <div className='text-blue-600 w-1/3'>Personal info</div>
                </div>
                <div className="flex space-x-2 ">
    {/* __________________________________________________name________________________________________________             */}
                    <div className=' flex flex-col space-y-4'>
                        <div className={ (isTitle && isName) ? nameBox: nameBox + '  border-red-500' }>
                            <span className='icon'><BsPeople/></span>
                            <Select allowClear  placeholder={isFrench? 'Titre':'Title' } style={{width: 110, height: 40}} onChange={setTitle} options={options1} value={list[0].title || null} />
                            <Input allowClear value={list[0].name} placeholder={isFrench? store.nameListF[0]:store.nameList[0] } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName(e.target.value)}}style={{maxWidth:180, borderRadius: 5, height: 30, paddingLeft:0,}}/>
                        </div>
                        <div className={ (isTitle2 && isName2) ? nameBox: nameBox + '  border-red-500' }>
                            <span className='icon'><BsPeople/></span>
                            <Select allowClear  placeholder={isFrench? 'Titre':'Title' } style={{width: 110, height: 40}} onChange={setTitle2} options={options1} value={list[0].title2 || null} />
                            <Input allowClear value={list[0].name2} placeholder={isFrench? store.nameListF[0]:store.nameList[0] } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName2(e.target.value)}}style={{maxWidth:180, borderRadius: 5, height: 30, paddingLeft:0}}/>
                        </div>
                        <div className={ (isTitle3 && isName3) ? nameBox: nameBox + '  border-red-500' }>
                            <span className='icon'><BsPeople/></span>
                            <Select allowClear  placeholder={isFrench? 'Titre':'Title' } style={{width: 110, height: 40}} onChange={setTitle3} options={options1} value={list[0].title3 || null} />
                            <Input allowClear value={list[0].name3} placeholder={isFrench? store.nameListF[0]:store.nameList[0] } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName3(e.target.value)}}style={{maxWidth:180, borderRadius: 5, height: 30, paddingLeft:0}}/>
                        </div>
                    </div>
    {/* _____________________________________________________________email________________________________________________ */}

                    <div className='flex flex-col space-y-4'>
                        <div className={nameBox +' border-none '}>
                            <MailInput value={list[0].email} mainMail={true} noMail={isEmail} onChange={setEmail} placeholder={isFrench? store.emailListF[0]:store.emailList[0] }/>
                        </div>
                        <div className={nameBox +' border-none '}>
                            <MailInput value={list[0].email2} mainMail={true} noMail={isEmail} onChange={setEmail2} placeholder={isFrench? store.emailListF[0]:store.emailList[0] }/>
                        </div>
                        <div className={nameBox +' border-none '}>
                            <MailInput value={list[0].email3} mainMail={true} noMail={isEmail} onChange={setEmail3} placeholder={isFrench? store.emailListF[0]:store.emailList[0] }/>
                        </div>
                    </div>
    {/* _____________________________________________________________phone________________________________________________ */}

                    <div className='flex flex-col space-y-4'>
                        <div className={noPhone ? nameBox +' border z-30': nameBox+ ' border border-red-500 z-30' } >
                            <PhoneNumberInput  setValidation={setIsPhone} type={1} value={list[0].phone} onChange={setPhone}/>
                        </div>
                        <div className={noPhone ? nameBox +' border z-30': nameBox+ ' border border-red-500 z-30' } >
                            <PhoneNumberInput  setValidation={setIsPhone} type={2} value={list[0].phone2} onChange={setPhone2}/>
                        </div>
                        <div className={noPhone ? nameBox +' border z-30': nameBox+ ' border border-red-500 z-30' } >
                            <PhoneNumberInput  setValidation={setIsPhone} type={2} value={list[0].phone3} onChange={setPhone3}/>
                        </div>
                    </div>

                </div>
                
                <div className="flex pt-4">
                    footer
                    {/* <div className={btn+ ' mr-2'}>confirm</div>
                    <div className={btn2}>reject</div> */}
                </div>
            </div>
{/* __________________________________________________mainType________________________________________________________________*/}

            <div className={mainType}>
                <div className={mainTypeBox}>
                    <span className={mainTypeItemActive}>{isFrench? 'Transport': 'Transport'}</span>
                    <span className={mainTypeItem}>{isFrench? 'Livraison': 'Delivery'}</span>
                    <span className={mainTypeItem}>{isFrench? 'Survoltage': 'Boost'}</span>
                    <span className={mainTypeItem}>{isFrench? 'Débarrage de portes': 'Unlocking doors'}</span>
                </div>
            </div>
{/* __________________________________________________trip info________________________________________________________________*/}
            <div className='flex justify-between'>
    {/* ______________________________________________one-way_________________________________________________________________ */}
                <div className={trip}>
                    <div className='flex mb-2'>
                        <div className='text-red-600 mr-2'>one way</div>
                        <div className={mainTypeBox} onClick={()=>{
                                    if(list[0].dateNow) setTimeType(0)
                                    setDateNow(!list[0].dateNow)
                                }}>
                            <span className={list[0].dateNow ? mainTypeItemActive:mainTypeItem }>{isFrench?'Maintenant':'Now'}</span>
                            <span className={list[0].dateNow ? mainTypeItem : mainTypeItemActive }>{isFrench?'Après':'Later'}</span>
                        </div>
                        <div className={btnGreen+ ' ml-auto'}>
                            return trip
                        </div>
                    </div>
    {/*____________________________________________________time_____________________________________________________________  */}
                    {!list[0].dateNow && <div className={list[0].timeType===1 ? timeToggle + ' bg-gray-600 ':timeToggle+ ' '}>
                        <div className={list[0].timeType===0 ? selectTextActive :selectText } onClick={()=>setTimeType(0)}>{isFrench? 'Choisir':'Select'}</div>
                        <div className={list[0].timeType===1 ? amTextActive : amText} onClick={()=>setTimeType(1)}>am</div>
                        <div className="absolute border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
                        <div className={list[0].timeType===2 ? pmTextActive: pmText} onClick={()=>setTimeType(2)}>PM</div>    
                    </div>}
                    <div className='flex justify-between mb-2'>
                        <div className={isDate ? dateBox: dateBox+' border-red-500'} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                            <span className='icon text-xl'><PiCalendarCheckLight/></span>
                            {list[0].date ? <div className='flex items-center'>
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
                                <DatePicker value={list[0].date || ''}  time={list[0].time} onChange={setDate} getFullDate={setFullDate}/>
                                <div className="flex justify-between pl-8">
                                    <div className={setDateBtn} onClick={(e)=> {
                                            e.stopPropagation();
                                            setIsDateOpen(false)
                                        }}>accept</div>
                                </div>
                            </div>}
                        </div>
                        <TimePicker isAm={list[0].timeType} time={list[0].dateNow ? dayjs().add(30,'minutes').format('HH:mm'): list[0].time}  onChange={setTime} date={list[0].date}/>
                    </div>

    {/* __________________________________________________location_________________________________________________________________ */}
                    <div className="flex flex-col space-y-2 ">
                        <div className={locationCard}>
                            <div className={isFrom ? locationBox : locationBox +' border-red-500'}>
                                <span className='icon text-green-500 '><SlLocationPin/></span>
                                <GoogleAddressInput
                                    style='w-full' 
                                    defaultLocation={list[0].from || ''} 
                                    onChange={setFrom}
                                    placeholder={isFrench? store.locationListF[0]:store.locationList[0]}
                                />
                            </div>
                            {list[0].icon === 1 && 
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
                        <div className={stopsContent}>
                            <div className={stopStepper}>
                                <span className={stepperItem}><FaRegCircleCheck /></span>
                                <span className={stepperItem}><FaRegQuestionCircle /><span className={stepLine}></span></span>
                                <span className={stepperItem}><FaRegCircleCheck /><span className={stepLine}></span></span>
                                <span className={stepperItem}><FaRegCircleCheck /><span className={stepLine}></span></span>
                            </div>
                            <div className={stopContainer}>
                                <div className={locationBox+' w-1/2 '}>
                                    <span className='icon text-orange-400'><SlLocationPin/></span>  
                                    <GoogleAddressInput
                                        style='w-full'
                                        defaultLocation={localStops[1] || ''} 
                                        onChange={(e)=>setLocalStops({...localStops, 1:e})}
                                        placeholder={isFrench? store.locationListF[2]:store.locationList[2]}
                                    />
                                </div>
                                <div className={locationBox}>
                                    <span className='icon text-orange-400'><SlLocationPin/></span>  
                                    <GoogleAddressInput
                                        style='w-full'
                                        defaultLocation={localStops[2] || ''} 
                                        onChange={(e)=>setLocalStops({...localStops, 2:e})}
                                        placeholder={isFrench? store.locationListF[3]:store.locationList[3]}
                                    />
                                </div>
                                <div className={locationBox}>
                                    <span className='icon text-orange-400'><SlLocationPin/></span>  
                                    <GoogleAddressInput
                                        style='w-full'
                                        defaultLocation={localStops[3] || ''} 
                                        onChange={(e)=>setLocalStops({...localStops, 3:e})}
                                        placeholder={isFrench? store.locationListF[4]:store.locationList[4]}
                                    />
                                </div>
                                <div className={locationBox}>
                                    <span className='icon text-orange-400'><SlLocationPin/></span>  
                                    <GoogleAddressInput
                                        style='w-full'
                                        defaultLocation={localStops[4] || ''} 
                                        onChange={(e)=>setLocalStops({...localStops, 4:e})}
                                        placeholder={isFrench? store.locationListF[5]:store.locationList[5]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={locationCard}>
                            <div className={isFrom ? locationBox : locationBox +' border-red-500'}>
                                <span className='icon text-green-500 '><SlLocationPin/></span>
                                <GoogleAddressInput
                                    style='w-full' 
                                    defaultLocation={list[0].from || ''} 
                                    onChange={setFrom}
                                    placeholder={isFrench? store.locationListF[0]:store.locationList[0]}
                                />
                            </div>
                            {list[0].icon === 1 && 
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

                    </div>
                    
                    <div className="flex pt-4">
                        footer
                        {/* <div className={btn+ ' mr-2'}>confirm</div>
                        <div className={btn2}>reject</div> */}
                    </div>
                </div>
    {/* ______________________________________________return___________________________________________________________________ */}

                <div className={trip}>
                    <div className='flex mb-5'>
                        <div className='text-red-600 mr-2'>one way</div>
                        
                    </div>
    {/*____________________________________________________time_____________________________________________________________  */}
                    {!list[0].dateNow && <div className={list[0].timeType===1 ? timeToggle + ' bg-gray-600 ':timeToggle+ ' '}>
                        <div className={list[0].timeType===0 ? selectTextActive :selectText } onClick={()=>setTimeType(0)}>{isFrench? 'Choisir':'Select'}</div>
                        <div className={list[0].timeType===1 ? amTextActive : amText} onClick={()=>setTimeType(1)}>am</div>
                        <div className="absolute border-b border-black w-[30px] right-[21.5px] rotate-[117deg]"></div>
                        <div className={list[0].timeType===2 ? pmTextActive: pmText} onClick={()=>setTimeType(2)}>PM</div>    
                    </div>}
                    <div className='flex justify-between mb-2'>
                        <div className={isDate ? dateBox: dateBox+' border-red-500'} onClick={()=> setIsDateOpen(true)} ref={ref}> 
                            <span className='icon text-xl'><PiCalendarCheckLight/></span>
                            {list[0].date ? <div className='flex items-center'>
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
                                <DatePicker value={list[0].date || ''}  time={list[0].time} onChange={setDate} getFullDate={setFullDate}/>
                                <div className="flex justify-between pl-8">
                                    <div className={setDateBtn} onClick={(e)=> {
                                            e.stopPropagation();
                                            setIsDateOpen(false)
                                        }}>accept</div>
                                </div>
                            </div>}
                        </div>
                        <TimePicker isAm={list[0].timeType} time={list[0].dateNow ? dayjs().add(30,'minutes').format('HH:mm'): list[0].time}  onChange={setTime} date={list[0].date}/>
                    </div>

    {/* __________________________________________________location_________________________________________________________________ */}
                    <div className="flex flex-col space-y-2 ">
                        <div className={locationCard}>
                            <div className={isFrom ? locationBox : locationBox +' border-red-500'}>
                                <span className='icon text-green-500 '><SlLocationPin/></span>
                                <GoogleAddressInput
                                    style='w-full' 
                                    defaultLocation={list[0].from || ''} 
                                    onChange={setFrom}
                                    placeholder={isFrench? store.locationListF[0]:store.locationList[0]}
                                />
                            </div>
                            {list[0].icon === 1 && 
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
                        <div className={stopsContent}>
                            <div className={stopStepper}>
                                <span className={stepperItem}><FaRegCircleCheck /></span>
                                <span className={stepperItem}><FaRegQuestionCircle /><span className={stepLine}></span></span>
                                <span className={stepperItem}><FaRegCircleCheck /><span className={stepLine}></span></span>
                                <span className={stepperItem}><FaRegCircleCheck /><span className={stepLine}></span></span>
                            </div>
                            <div className={stopContainer}>
                                <div className={locationBox+' w-1/2 '}>
                                    <span className='icon text-orange-400'><SlLocationPin/></span>  
                                    <GoogleAddressInput
                                        style='w-full'
                                        defaultLocation={localStops[1] || ''} 
                                        onChange={(e)=>setLocalStops({...localStops, 1:e})}
                                        placeholder={isFrench? store.locationListF[2]:store.locationList[2]}
                                    />
                                </div>
                                <div className={locationBox}>
                                    <span className='icon text-orange-400'><SlLocationPin/></span>  
                                    <GoogleAddressInput
                                        style='w-full'
                                        defaultLocation={localStops[2] || ''} 
                                        onChange={(e)=>setLocalStops({...localStops, 2:e})}
                                        placeholder={isFrench? store.locationListF[3]:store.locationList[3]}
                                    />
                                </div>
                                <div className={locationBox}>
                                    <span className='icon text-orange-400'><SlLocationPin/></span>  
                                    <GoogleAddressInput
                                        style='w-full'
                                        defaultLocation={localStops[3] || ''} 
                                        onChange={(e)=>setLocalStops({...localStops, 3:e})}
                                        placeholder={isFrench? store.locationListF[4]:store.locationList[4]}
                                    />
                                </div>
                                <div className={locationBox}>
                                    <span className='icon text-orange-400'><SlLocationPin/></span>  
                                    <GoogleAddressInput
                                        style='w-full'
                                        defaultLocation={localStops[4] || ''} 
                                        onChange={(e)=>setLocalStops({...localStops, 4:e})}
                                        placeholder={isFrench? store.locationListF[5]:store.locationList[5]}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={locationCard}>
                            <div className={isFrom ? locationBox : locationBox +' border-red-500'}>
                                <span className='icon text-green-500 '><SlLocationPin/></span>
                                <GoogleAddressInput
                                    style='w-full' 
                                    defaultLocation={list[0].from || ''} 
                                    onChange={setFrom}
                                    placeholder={isFrench? store.locationListF[0]:store.locationList[0]}
                                />
                            </div>
                            {list[0].icon === 1 && 
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

                    </div>
                    
                    <div className="flex pt-4">
                        footer
                        {/* <div className={btn+ ' mr-2'}>confirm</div>
                        <div className={btn2}>reject</div> */}
                    </div>
                </div>
            </div>


            {/* <div className={table}>
                <h1 className={tableHeader}>Orders table</h1>
                <div className={tableRow}>
                    <div className={tableHCell + ' w-[20%]'}>type</div>
                    <div className={tableHCell + ' w-[20%] '}>date/time</div>
                    <div className={tableHCell + ' w-[30%] '}>location</div>
                    <div className={tableHCell + ' w-[10%]'}>status</div>
                    <div className={tableHCell  + ' w-[20%]'} >passengers</div>
                </div>
                <div className='overflow-y-scroll max-h-[320px] mb-4 '>
                    {orders.map(item=>(
                        <div className={tableRow}>
                            <div className={tableCell + ' w-[20%]'}>
                                <div className="flex flex-col ">
                                    <div className='mb-1'>{item.type}</div>
                                    <div className='text-gray-500 text-[10px]'>{item.carType}</div>
                                </div>
                                
                            </div>
                            <div className={tableCell + ' w-[20%]'}>
                                <div className="flex flex-col ">
                                    <div className='mb-1'>{item.time}</div>
                                    <div className='text-gray-500 text-[10px]'>{item.date}</div>
                                </div>
                            </div>
                            <div className={tableCell + ' w-[30%]'}>
                                {item.from}
                                {item.to}
                            </div>
                            <div className={tableCell + ' w-[10%]'}>
                                <div className={item.status ==='active' ? statusCell +' bg-green-400 ': statusCell}>
                                    {item.status}
                                </div>
                                
                            </div>
                            <div className={tableCell + ' w-[10%] justify-end'}>{item.adults + item.kids?.length + item.babies}</div>
                            <div className={tableCell  + ' w-[10%]'}>
                                <div className="cursor-pointer text-gray-600 hover:text-gray-400 text-sm">edit</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div> */}
            
        </div>
    );
};

export default Orders;

const stepLine = 'absolute border-l border-black h-[75%] -top-[38%]'
const stepperItem = 'relative h-1/4 flex items-center justify-center w-full text-purple-500 '
const stopContainer = 'w-[90%]'
const stopStepper = 'w-[10%] h-full flex flex-col'
const stopsContent = ' flex '
const locationBox = ' flex items-center border rounded-lg shadow-inner w-full '
const locationCard = 'flex relative items-center w-full  space-x-2'


const pmText = 'px-2 pl-4 rounded-tl triangle flex bg-white items-center py-1 '
const pmTextActive = 'px-2 pl-4 text-white bg-gray-600  rounded-tl triangle flex items-center py-1 '

const amText = 'pl-2  flex items-center py-1 pr-[2px] '
const amTextActive = 'pl-2  flex items-center py-1 pr-[2px] bg-gray-600 text-white '
const timeToggle = 'relative font-bold self-end mb-1 flex  items-center text-xs  cursor-pointer  rounded overflow-hidden border border-black '
const selectText = 'px-2 text-[#0C0B09] bg-gray-200 flex items-center py-1 border-r border-black '
const selectTextActive = 'px-2  bg-gray-600 text-white flex items-center py-1 border-r border-black '


const dateBox = 'flex relative border pr-3 rounded-lg py-1 cursor-pointer'
const setDateBtn = ' border bg-sky-500 hover:bg-sky-400 active:bg-sky-600 shadow cursor-pointer rounded px-3 py-2 flex text-white items-center'
const dateTimeSubmenu ='absolute z-30 flex flex-col item-star top-[102%] left-0 z-20 max-w-[300px] pb-2 bg-white shadow-xl rounded-xl sm:-left-[10px]'



const nameBox = 'flex items-center rounded-lg border self-start'
const mainType = 'flex flex-col w-full px-4 mb-2 text-xs items-center'
const mainTypeBox = "flex  border-2 border-purple-500 rounded-full overflow-hidden cursor-pointer"
const mainTypeItem = ' px-2 py-1 font-bold '
const mainTypeItemActive = ' px-2 py-1 font-bold bg-purple-400 text-white'
const btn =' border-2 px-2 py-1 rounded-full border-purple-500 text-purple-500 font-bold cursor-pointer hover:bg-purple-200'
const btnRed =' border-2 px-2 py-1 rounded-full border-red-500 text-red-500 font-bold cursor-pointer hover:bg-red-200'
const btnGreen =' border-2 px-2 py-1 rounded-full border-green-500 font-bold cursor-pointer hover:bg-green-200'

const personalInfo = 'flex flex-col w-full bg-white rounded-xl mb-5 p-4 text-xs shadow-xl'
const trip = 'flex flex-col w-[49%] bg-white rounded-xl mb-5 p-4 text-xs shadow-xl'

const statusCell = ' px-2 py-1 rounded-full text-white self-start'

const tableCell = ' flex px-2 py-2'
const tableHCell = ' flex px-4 py-2'
const tableRow = ' flex w-full border-b '

const tableHeader = ' px-10 pb-4 '
const table = 'bg-white shadow-xl w-full py-6 rounded-xl text-xs max-h-[450px]  pb-4'
const box = 'flex flex-col w-full  py-20 min-w-screen w-full min-h-screen '