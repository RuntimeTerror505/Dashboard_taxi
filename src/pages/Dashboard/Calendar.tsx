import React from "react";


const Calendar = ():React.ReactNode => {
    const days = [
        "1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"
    ];

    return (
        <div className="w-full min-h-screen px-10 py-20">
            <div className={calendarBlock}>
                <div className="flex w-full justify-around">
                    <div className="">date</div>
                    <div className="">mounth</div>
                    <div className="">year</div>
                </div>

                <nav className=' w-full flex flex-wrap shadow-inner p-4 '>
                    {days.map(item=>(
                        <div className="w-[14%] py-4 px-2 bg-white rounded-xl text-center cursor-pointer mr-2 mb-2 border-white border-2 hover:border-purple-500 hover:text-purple-500 ">{item}</div>
                    ))}
                </nav>

            </div>
        </div>
    );
};

export default Calendar;

const calendarBlock = 'bg-white shadow-xl rounded-xl p-5'