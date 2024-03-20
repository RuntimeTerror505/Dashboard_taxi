import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-date-range/dist/styles.css'; // main css file
import { Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { DateRange } from 'react-date-range';
import {  addDays} from 'date-fns';
import moment from 'moment';
import { Calendar as CalendarContent, dayjsLocalizer, View } from 'react-big-calendar'
import dayjs from 'dayjs'
import { IEvent, IOrder, useDashboard } from '../../../Store/useDashboard';
import OrderCard from './OrderCard';

const localizer = dayjsLocalizer(dayjs)

interface FilterType {
    type: 'time' |'date' |'name' |'phone' | 'email',
    value:string,
}

const Calendar = (): React.ReactNode => {
    const { orders, activeEvents, setActiveEvents,getOrders } = useDashboard()
    const createEvents = (data:IOrder[]) =>{
        return data.map((item)=>{
            const res:IEvent  = {
                data:item,
                title: `${item.date} ${item.status}`,
                start: dayjs(`${item.date} ${item.time}`, 'MM/DD/YYYY hh:mm').toDate(),
                end: dayjs(`${item.date} ${item.time}`, 'MM/DD/YYYY hh:mm').add(30, 'minute').toDate(),
            }
            return res
        })
    }
    const formats = {
        timeGutterFormat: 'HH:mm',
    };

    const [ timeRange, setTimeRange ] = useState({
        selection: {
            startDate: dayjs().toDate(),
            endDate: dayjs().toDate(),
            key: 'selection'
        }
    });
    const [activeTab, setActiveTab] = useState(2)
    const [filter,setFilter]= useState<FilterType>({type:'date', value:''})
    const [calendarDate, setCalendarDate] = useState(dayjs().toDate())
    const [events, setEvents] = useState<IEvent[]>([])
    const [trigger, setTrigger] = useState(false)
    const [view, setView] = useState<View | undefined>('month'); 

    useEffect(()=>{
        getOrders()
    },[])
    
    useEffect(()=>{
        // getToken()
        setEvents(createEvents(orders))
    },[orders])

    useEffect(()=>{
        if(trigger) {
            const res = createEvents(orders)
                .filter(item => (
                    (dayjs(item.start).isBefore(dayjs(timeRange.selection.endDate)) 
                        && dayjs(item.end).isAfter(dayjs(timeRange.selection.startDate))
                    ) || dayjs(item?.start).startOf('day').isSame(dayjs(timeRange.selection.startDate).startOf('day'))))

            setEvents(res)
        }
    },[timeRange])



    const options = ['time', 'date', 'name', 'phone']
    const colors:string[] =  ['bg-red-500  active:bg-red-400 ', 'bg-orange-500 active:bg-orange-400 ', 'bg-green-500 active:bg-green-400 ', 'bg-blue-500']

    const dates:{[key:number]: Date} = {
        1:moment().add(-1, 'days').toDate(),
        2:new Date(),
        3:moment().add(1, 'days').toDate(),
        4:moment().startOf('week').add(-1, 'weeks').toDate(),
        5:moment().startOf('week').toDate(),
        6:moment().startOf('week').add(1, 'weeks').toDate(),
        7:moment().startOf('month').add(-1, 'months').toDate(),
        8:moment().startOf('month').toDate(),
        9:moment().startOf('month').add(1, 'months').toDate(),
    }
    const dayNames:{[key:number]: View | undefined} = {
        1:'day',
        2:'day',
        3:'day',
        4:'week',
        5:'week',
        6:'week',
        7:'month',
        8:'month',
        9:'month',
    }


    var days = Array.from({ length: 31 }, (_, index) => index + 1);
    var months = Array.from({ length: 12 }, (_, index) => index + 1);
    var years = Array.from({ length: 50 }, (_, index) => index + 2001);
    const setCalendar = (number:number) =>{
        setActiveTab(number)
        setCalendarDate(dates[number]);
        setView(dayNames[number]); 
    } 

    const handleEvent =(event:IEvent) =>{
        console.log(event.data, 'work')
        if(activeEvents.find(item => item._id === event.data._id)) return setActiveEvents(activeEvents.filter(i => i._id !== event.data._id))
        setActiveEvents([event.data,...activeEvents])
    }

    const handleClickEvent = (data:string) => {
        const res = dayjs(data).toDate()
        setCalendarDate(res)
    }

    const selectEvent = (item:IEvent)=> {
        if(activeEvents.find(i => i._id === item.data._id)) return setActiveEvents(activeEvents.filter(i => i._id !== item.data._id))
        setActiveEvents([item.data,...activeEvents])
        
        handleClickEvent(item.data.date)
    }


    return (
        <section className={container}>
            <header className={header}>
                <div className={dateName}>
                    Monday,
                    <Select className=' w-7 ml-1 dateSelect ' placeholder='d' options={days.map(item => ({ value: item, label: item, }))} />/
                    <Select className=' w-7 dateSelect ' placeholder='m' options={months.map(item => ({ value: item, label: item, }))} />/
                    <Select className=' w-[54px] dateSelect ' placeholder='year' options={years.map(item => ({ value: item, label: item, }))} />
                </div>
                <div className={menuFilters}>
                    <div className={filterInput}>
                        <GoSearch className='text-3xl px-1' />
                        <Select
                            className=' filterSelect '
                            placeholder="select filter"
                            value={filter.type}
                            style={{ width: '40%' }}
                            onChange={(e)=>setFilter({...filter, type:e})}
                            options={options.map(item => (
                                { value: item, label: item }
                            ))}
                        />
                        <Input
                            allowClear
                            value={filter.value}
                            onChange={(e)=>setFilter({...filter, value:e.target.value})}
                            className='w-1/2 rounded-r-full'
                            placeholder='Find your destiny'
                        />

                    </div>
                </div>
            </header>
            
            <main className={content}>
                
                <article className={datePicker}>
                    <nav className={calendarNav}>
                        <nav className={navItem}>
                            {
                                ['Yesterday','Today','Tomorrow'].map((item, index) =>
                                    <button 
                                        key={item}
                                        onClick={()=>setCalendar(index+1)} 
                                        className={
                                            navButton +
                                            (activeTab===index+1 
                                            ?  colors[3]
                                            : colors[index])
                                        }
                                    >{item}</button>)
                            }
                        </nav>
                        <nav className={navItem}>
                            {
                                ['Last Week','This Week','Next Week'].map((item, index) =>
                                    <button 
                                        key={item}
                                        onClick={()=>setCalendar(index+4)} 
                                        className={
                                            navButton +
                                            (activeTab===index+4 
                                            ? colors[3]
                                            : colors[index])
                                        }
                                    >{item}</button>)
                                }
                        </nav>
                        <nav className={navItem}>
                            {
                                ['Last Month','This Month','Next Month'].map((item, index) =>
                                    <button 
                                        key={item}
                                        onClick={()=>setCalendar(index+7)} 
                                        className={
                                            navButton +
                                            (activeTab===index+7
                                            ? colors[3]
                                            : colors[index])
                                        }
                                    >{item}</button>)
                            }
                        </nav>
                    </nav>
                    <DateRange
                        editableDateInputs={true}
                        onChange={item => {
                            setCalendarDate(dayjs(item.selection.startDate).toDate())
                            setTrigger(true)
                            setTimeRange({ ...timeRange, ...item })
                        }}
                        months={1}
                        minDate={addDays(new Date(), -5000)}
                        maxDate={addDays(new Date(), 2300)}
                        ranges={[timeRange.selection]}
                    />
                    <div className={clearButton} onClick={()=>{
                            setTimeRange({
                                selection: {
                                    startDate: dayjs().toDate(),
                                    endDate: dayjs().toDate(),
                                    key: 'selection'
                                }
                                })
                                setFilter({ type :'date', value:''})
                                setTrigger(false)
                                setEvents(createEvents(orders))
                            }}
                    >clear</div>
                    {/* ______________________________________________ORDER LIST___________________________________________ */}
                    <div className={activeEventsList}>
                        {
                            activeEvents.map(item=>(
                                <OrderCard item={item} key={item._id} />
                            ))
                        }
                    </div>

                </article>

                <article className={calendarContent}>
                    <CalendarContent
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500, backgroundColor: 'white' }}
                        onSelectEvent={handleEvent}
                        date={calendarDate}
                        onNavigate={(event)=> setCalendarDate(dayjs(event).toDate())}
                        toolbar={false}
                        view={view}
                        onView={setView}
                        formats={formats}
                    />
                    <div className={eventList}>
                        <h1 
                            className='ml-auto mb-2 cursor-pointer text-rose-500'
                            onClick={()=>{
                                setTimeRange({
                                    selection: {
                                        startDate: dayjs().toDate(),
                                        endDate: dayjs().toDate(),
                                        key: 'selection'
                                    }
                                })
                                setFilter({ type :'date', value:''})
                                setTrigger(false)
                                setEvents(createEvents(orders))
                            }}
                        >clear filters</h1>
                        {events
                            .filter(item => item.data[filter.type].toLowerCase().includes(filter.value.toLowerCase()) )
                            .map(item=>(
                            <div 
                                onClick={()=> selectEvent(item)}
                                key={item.title+item.data._id} 
                                className={ activeEvents.find(i=>item.data._id ===i._id) ? activeListItem :listItem}
                            >
                                <span className={tableItem}>{item.data.status}</span>
                                <span className={tableItem}>{item.data.type}</span>
                                <span className={tableItem}>{item.data.orderType}</span>
                                <span className={tableItem} >{item.data.date}</span>
                                <span className={tableItem}>{item.data.time}</span>
                                <span className={tableItem}>{item.data.email}</span>
                                <span className={tableItem}>{item.data.name}</span>
                                <span className={tableItem}>{item.data.carType}</span>
                                <span className={tableItem}>{item.data.phone}</span>
                            </div>
                        ))}
                    </div>
                </article>
            </main>
        </section>
    );
};

export default Calendar;

const navButton = 'w-[30%] rounded text-sm border-black border-[1px] text-white '

const navItem = 'flex justify-between cursor-pointer'
const calendarNav = ' flex w-full flex-col space-y-2 mb-4'
const activeEventsList = '   rounded p-2 bg-white h-full'
const tableItem = 'px-2'

const clearButton = ' flex border-rose-500 border-2 rounded-full px-2 self-start -translate-y-6 text-rose-500 cursor-pointer ml-4 active:text-white active:bg-rose-500'
const activeListItem = ' border-b bg-blue-500   cursor-pointer px-2 py-1 rounded-lg text-white'
const listItem = ' border-b hover:bg-blue-300 hover:text-white cursor-pointer px-2 py-1 rounded-lg '
const eventList = ' flex flex-col  p-2 overflow-y-scroll max-h-[500px] bg-white border border-blue-500 rounded-3xl mt-4'
const calendarContent =  'flex flex-col w-[70%] px-4 '
const datePicker = 'flex flex-col w-[30%]'

const content = 'flex'

const filterInput = 'border border-blue-500 rounded-full flex bg-white w-[300px] mx-auto'

const menuFilters = 'w-[320px]'
const dateName = ' flex items-center px-4'
const header = " flex min-w-[430px] mb-6 pt-6 text-gray-400 text-xs justify-between items-center"
const container = '  w-full pl-[60px] min-h-screen border'
