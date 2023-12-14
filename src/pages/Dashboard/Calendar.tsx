import 'react-date-range/dist/theme/default.css'; // theme css file
import 'react-date-range/dist/styles.css'; // main css file
import { Select, Input } from "antd";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import { Calendar as CalendarContent, dayjsLocalizer } from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = dayjsLocalizer(dayjs)

const Calendar = (): React.ReactNode => {
    const [range, setRange] = useState(1)
    const [state, setState] = useState({
        selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        },
        compare: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'compare'
        }
    });

    const myEventsList:{id?:number,title:string,allDay?:boolean,start:Date,end:Date}[] =[
        { 
            
            title: "title",
            start: dayjs().set('hour', 7).set('minute',15).toDate(),
            end: dayjs().set('hour', 9).set('minute',30).toDate(), 
        }
    ]

    const setFilterType = () => {

    }
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
                    <div className={range === 1 ? menuTabActive : menuTab} onClick={() => setRange(1)}>Range dates</div>
                    <div className={range === 2 ? menuTabActive : menuTab} onClick={() => setRange(2)}>Last 7 days</div>
                    <div className={range === 3 ? menuTabActive : menuTab} onClick={() => setRange(3)}>Yesterday</div>
                    <div className={range === 4 ? menuTabActive : menuTab} onClick={() => setRange(4)}>Today</div>
                    <div className={range === 5 ? menuTabActive : menuTab} onClick={() => setRange(5)}>Tomorrow</div>
                    <div className={range === 6 ? menuTabActive : menuTab} onClick={() => setRange(6)}>Next 7 days</div>
                </div>
                {/* _______________FILTERS________________________________________ */}

                <div className={menuFilters}>
                    <div className={filterInput}>
                        <GoSearch className='text-3xl px-1' />
                        <Select
                            className=' filterSelect '
                            placeholder="select filter"
                            style={{ width: '40%' }}
                            onChange={setFilterType}
                            options={options.map(item => (
                                { value: item, label: item }
                            ))}
                        />
                        <Input
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
                        onChange={item => setState({ ...state, ...item })}
                        months={1}
                        minDate={addDays(new Date(), -100)}
                        maxDate={addDays(new Date(), 900)}
                        ranges={[state.selection, state.compare]}
                    />
                </div>

                {/* ______________________________CALENDAR_______________________________________ */}
                <div className={calendarContent}>
                    <CalendarContent
                        localizer={localizer}
                        events={myEventsList}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 500 }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Calendar;

const calendarContent = 'w-full p-6 bg-white rounded-xl shadow-xl m-6 '
const calendarSection = ''

const content = 'flex'

const filterInput = 'border border-purple-500 rounded-full flex bg-white w-[300px] mx-auto'

const menuFilters = 'w-[320px]'
const menuTab = 'text-gray-400  px-2 pt-1 cursor-pointer '
const menuTabActive = 'text-purple-500 border-b border-purple-500 px-2 pt-1 cursor-pointer '
const tabs = 'flex'
const dateName = ' flex items-center px-4'
const menu = " flex min-w-[430px] pt-6 text-gray-400 text-xs justify-between items-center"
const container = '  w-full ml-[55px] min-h-screen border'
