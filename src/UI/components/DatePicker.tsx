import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import dayjs from 'dayjs';
import { useState } from 'react';
import React from 'react';
import { useMain } from '../../Store/useMain';
interface IDate {
    onChange:(date:string) => void;
    getFullDate?: (date: dayjs.Dayjs) => void;
    time:string;
    isReturn?:boolean;
    value:string;
}

export default function DatePicker({onChange, getFullDate, isReturn, value}:IDate):React.ReactNode {
    const [date, setDate] = useState<dayjs.Dayjs>(dayjs());
    const {list, activeCarId} = useMain()

    const handleDate = (date: string | number | dayjs.Dayjs | Date | null | undefined) => {
            const parsedDate = dayjs(date);
            setDate(parsedDate);
            if(getFullDate) getFullDate(parsedDate)
            onChange(parsedDate.format('MM/DD/YYYY'))
    }
console.log(dayjs(list[activeCarId-1].date))
    return (
        <div className="relative" >
            <div className={pickUpTime}>
                <span className='font-bold'>{date.format('dddd')},  
                {'  '+date.format('MMM')}
                {'.  '+date.format('D')}{ date.format('DD') === '01' || date.format('DD') === '21' || date.format('DD') === '31'
                                            ? 'st'
                                            :  date.format('DD') === '02' || date.format('DD') === '22' || date.format('DD') === '32'
                                            ?  'nd'
                                            :  date.format('DD') === '03' || date.format('DD') === '23' || date.format('DD') === '33'
                                            ? 'rd'
                                            : 'th'
                                        }
                {' '+date.format('YYYY')}</span>
            </div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                    className='sm:w-[280px] mt-8 '
                    minDate={isReturn ? list[activeCarId-1].date ? dayjs(list[activeCarId-1].date) : dayjs(): dayjs()}
                    value={dayjs(value)}
                    onChange={handleDate}
                />
            </LocalizationProvider>
        </div>
    );
}

const pickUpTime = 'absolute z-10 top-4 left-6 text-lg flex max-w-[300px]'