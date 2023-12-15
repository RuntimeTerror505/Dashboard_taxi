import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-date-range/dist/styles.css'; // main css file
import { Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import { GoSearch } from "react-icons/go";
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { Calendar as CalendarContent, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import '../../index.css'
import myEventsList from './db' 

const localizer = dayjsLocalizer(dayjs)

interface FilterType {
    type: 'time' |'date' |'name' |'phone' | 'email',
    value:string,
}
const Calendar = (): React.ReactNode => {
    const [range, setRange] = useState(1)
    const [ timeRange, setTimeRange ] = useState({
        selection: {
            startDate: dayjs().toDate(),
            endDate: dayjs().toDate(),
            key: 'selection'
        }
    });
    const [filter,setFilter]= useState<FilterType>({type:'date', value:''})
    const [calendarDate, setCalendarDate] = useState(dayjs().toDate())
    const [events, setEvents] = useState(myEventsList)
    const [trigger, setTrigger] = useState(false)
    useEffect(()=>{
        if(trigger) {
            const res = myEventsList.filter(item=> (item.start > timeRange.selection.startDate && item.end < timeRange.selection.endDate))
            setEvents(res)
        }
    },[timeRange])

    const options = ['time', 'date', 'name', 'phone']
    // const monthsNames = [
    //     "January",
    //     "February",
    //     "March",
    //     "April",
    //     "May",
    //     "June",
    //     "July",
    //     "August",
    //     "September",
    //     "October",
    //     "November",
    //     "December"
    // ];
    var days = Array.from({ length: 31 }, (_, index) => index + 1);
    var months = Array.from({ length: 12 }, (_, index) => index + 1);
    var years = Array.from({ length: 50 }, (_, index) => index + 2001);

    const handleEvent =(event:any) =>{
        console.log(event)
    }
    const handleClickEvent = (data:string) => {
        const res = dayjs(data).toDate()
        setCalendarDate(res)
    }


    return (
        <div className={container}>
{/*_________________________________________________MENU_______________________________________________________________________________   */}
            <div className={menu}>
                {/* ______________DATE____________________________________________ */}
                <div className={dateName}>
                    Monday,
                    <Select className=' w-7 ml-1 dateSelect ' placeholder='d' options={days.map(item => ({ value: item, label: item, }))} />/
                    <Select className=' w-7 dateSelect ' placeholder='m' options={months.map(item => ({ value: item, label: item, }))} />/
                    <Select className=' w-[54px] dateSelect ' placeholder='year' options={years.map(item => ({ value: item, label: item, }))} />
                </div>

                {/* ______________ TABS _________________________________________ */}
                <div className={tabs}>
                    <div className={range === 1 ? menuTabActive : menuTab} onClick={() => {
                            setRange(1)
                        }}>Range dates</div>
                    <div className={range === 2 ? menuTabActive : menuTab} onClick={() => {
                            setCalendarDate(dayjs().subtract(1, 'week').toDate())
                            setRange(2)
                        }}>Last 7 days</div>
                    <div className={range === 3 ? menuTabActive : menuTab} onClick={() => {
                            setCalendarDate(dayjs().subtract(1, 'day').toDate())
                            setRange(3)
                        }}>Yesterday</div>
                    <div className={range === 4 ? menuTabActive : menuTab} onClick={() => {
                            setCalendarDate(dayjs().toDate())
                            setRange(4)
                        }}>Today</div>
                    <div className={range === 5 ? menuTabActive : menuTab} onClick={() => {
                            setCalendarDate(dayjs().add(1, 'day').toDate())
                            setRange(5)
                        }}>Tomorrow</div>
                    <div className={range === 6 ? menuTabActive : menuTab} onClick={() => {
                            setCalendarDate(dayjs().add(1, 'week').toDate())
                            setRange(6)
                        }}>Next 7 days</div>
                </div>
                {/* _______________FILTERS________________________________________ */}

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
                            value={filter.value}
                            onChange={(e)=>setFilter({...filter, value:e.target.value})}
                            className='w-1/2 rounded-r-full'
                            placeholder='Find your destiny'
                        />

                    </div>
                </div>

            </div>

{/*_________________________________________________CALENDAR_______________________________________________________________________________   */}
            <div className={content}>
                {/* ______________________________PICKER_______________________________________ */}
                <div className={calendarSection}>
                    <DateRange
                        onChange={item => {
                            setTrigger(true)
                            setTimeRange({ ...timeRange, ...item })
                        }}
                        months={1}
                        minDate={addDays(new Date(), -5000)}
                        maxDate={addDays(new Date(), 2300)}
                        ranges={[timeRange.selection]}
                    />
                    <div className={eventList}>
                        <h1 
                            className='ml-auto mb-2 cursor-pointer text-rose-500'
                            onClick={()=>{
                                setTrigger(false)
                                setEvents(myEventsList)
                            }}
                        >clear filters</h1>
                        {events
                            .filter(item => item.data[filter.type].toLowerCase().includes(filter.value.toLowerCase()) )
                            .map(item=>(
                            <div 
                                onClick={()=> handleClickEvent(item.data.date)}
                                key={item.title} 
                                className={listItem}
                            >{item.data.name}, {item.data.email}</div>
                        ))}
                    </div>
                </div>

                {/* ______________________________CALENDAR_______________________________________ */}
                <div className={calendarContent}>
                    <CalendarContent
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                        onSelectEvent={handleEvent}
                        date={calendarDate}
                        onNavigate={(event)=> setCalendarDate(dayjs(event).toDate())}
                    />
                </div>
            </div>
        </div>
    );
};

export default Calendar;

const listItem = ' border-b hover:bg-purple-500 hover:text-white cursor-pointer px-2 py-1 rounded-full '
const eventList = ' flex flex-col bg-white shadow-lg rounded-lg m-2 mr-0 p-2'
const calendarContent = 'w-full p-6 bg-white rounded-xl shadow-xl m-6 '
const calendarSection = 'flex flex-col'

const content = 'flex'

const filterInput = 'border border-purple-500 rounded-full flex bg-white w-[300px] mx-auto'

const menuFilters = 'w-[320px]'
const menuTab = 'text-gray-400  px-2 pt-1 cursor-pointer '
const menuTabActive = 'text-purple-500 border-b border-purple-500 px-2 pt-1 cursor-pointer '
const tabs = 'flex'
const dateName = ' flex items-center px-4'
const menu = " flex min-w-[430px] pt-6 text-gray-400 text-xs justify-between items-center"
const container = '  w-full ml-[55px] min-h-screen border'
