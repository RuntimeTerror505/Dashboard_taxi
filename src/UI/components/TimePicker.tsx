import dayjs from "dayjs";
import React, { useEffect, useState } from 'react';
import { IoMdTime } from 'react-icons/io';
import useOnclickOutside from "react-cool-onclickoutside";
import { useMain } from "../../Store/useMain";


interface InputProps {
    onChange: (value: string) => void;
    date?: string;
    time: string;
    style?:string;
}

const TimePicker: React.FC<InputProps> = ({ style, onChange, date, time }) => {
    const minutes = [
        "00","05","10", "15", "20", "25", "30",
        "35", "40", "45",  "50","55",
    ]
    const hours = [
        "00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
        "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
        "20", "21", "22", "23", 
    ]
    const { orders, id } = useMain()

    const ref = useOnclickOutside(() => setIsOpen(false));

    const [hour, setHour] = useState(time.replace(/:/g, '') ? time.slice(0,2): (dayjs().format('mm') > '45') ? dayjs().add(1, 'hours').format('HH'): dayjs().format('HH'))
    const [minute, setMinute] = useState(time.replace(/:/g, '') ? time.slice(3): dayjs().add(15, 'minutes').format('mm'))
    const [isOpen, setIsOpen] = useState(false)
    const [filteredMinutes, setFilteredMinutes] = useState<string[]>([])
    const [filteredHours, setFilteredHours] = useState<string[]>(hours)

    useEffect(()=>{
        if(orders[id].dateNow){
            setHour(dayjs().format('HH'))
            setMinute(dayjs().format('mm'))
        } else {
            setHour(time.replace(/:/g, '') ? time.slice(0,2): (dayjs().format('mm') > '45') ? dayjs().add(1, 'hours').format('HH'): dayjs().format('HH'))
            setMinute(time.replace(/:/g, '') ? time.slice(3): dayjs().add(15, 'minutes').format('mm'))
        }
    },[orders[id].dateNow])

    useEffect(()=>{

        if(!orders[id].dateNow && JSON.stringify(dayjs().format('MM/DD/YYYY')) === JSON.stringify(date)) {
            
            hour === dayjs().format('HH')
                ? setFilteredMinutes(minutes.filter(item => item > dayjs().add(15, 'minutes').format('MM') ))
                : setFilteredMinutes(minutes)

            if(orders[id].time < dayjs().format('HH:mm')) {
                setMinute(dayjs().add(15, 'minutes').format('mm'))
                setHour(dayjs().add(15, 'minutes').format('HH'))
                onChange(dayjs().add(15, 'minutes').format('HH:mm'))
            }

            setFilteredHours(hours.filter(item => item >= dayjs().format('HH')))
        }
        
    },[date, orders[id].dateNow, orders[id].date, orders[id].time])



    return (
        <div className={container + style} onClick={() => setIsOpen(true)} ref={ref}>
            <IoMdTime className='cursor-pointer text-lg ml-2' onClick={() => setIsOpen(true)}/>
            <input
                className={input}
                type="text"
                value={hour}
                placeholder='hh'
                maxLength={2}
                autoFocus={false}
                
                onChange={(e) => {
                    const newValue = e.target.value.replace(/[^0-9]/g, '')
                    if (+newValue > 23) return setHour('00')
                    setHour(newValue)
                }}
            /> :
            <input
                className={input2}
                type="text"
                placeholder='mm'
                value={minute}
                autoFocus={false}
                maxLength={2}
                
                onChange={(e) => {
                    const newValue = e.target.value.replace(/[^0-9]/g, '')
                    if (+newValue > 59) return setMinute('59')
                    setMinute(newValue)
                }}
            />
            
            {isOpen && <div className={submenu} >

                <div className="overflow-scroll border-r">
                    {['- -',...filteredHours].map((item, index) =>
                            <div
                                key={index + item}
                                className=" px-4 cursor-pointer hover:bg-gray-100"
                                onClick={() => setHour(item)}
                            >{item}</div>
                        )}
                </div>
                <div className="overflow-scroll " >
                    {['- -',...filteredMinutes].map((item, index) =>
                        <div
                            key={index + item}
                            className=" px-4 cursor-pointer hover:bg-gray-100"
                            onClick={() => setMinute(item)}
                        >{item}</div>)}
                </div>

                <button
                    className={button}
                    onClick={(e)=>{
                        e.stopPropagation();
                        setIsOpen(false)
                    }}
                >OK</button>
            </div>}
        </div>
    );
};

export default TimePicker;

const input ='pr-2 py-1 text-end pr-[2px] w-[24px] outline-none'
const input2 ='pr-2 py-1 pl-[2px] w-[35px] outline-none'
const button ='absolute top-[120px] rounded left-2 bg-purple-500 px-3 py-1 text-xs text-white active:bg-purple-700'
const submenu = "absolute flex shadow-xl top-[104%] overflow-hidden pb-6 max-h-[150px] bg-white z-30 rounded "

const container = 'flex cursor-pointer relative h-[40px] bg-white items-center border text-sm relative w-[100px] outline-none  cursor-text rounded-lg'