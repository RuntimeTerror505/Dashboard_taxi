import { useState } from "react";
import { useMain } from "../../../../Store/useMain";

import PassengersSelect from "./PassengersSelect";
import BagsSelect from "./BaggageSelect";
import CarSeatsSelect from "./CarSeatsSelect";

const OptionsSection = () => {
    const { orders } = useMain()
    const [option, setOption] = useState(1)
    const isFrench = false;

    return (
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
        <PassengersSelect />
        <BagsSelect />
        <CarSeatsSelect />
        <div className={optionsContent}>
            {orders[0].sport.map(item => (
                <div className="p-2 flex items-center text-base w-full ">
                    <span className={passTitle}>{item.title}</span>
                    <span className={btnQuantity + ' ml-auto'}>-</span>
                    <span className={passNumber}>{item.quantity}</span>
                    <span className={btnQuantity}>+</span>
                </div>
            ))}
        </div>
        {option === 5 && <div className={optionsContent}>
            {orders[0].pets.map(item => (
                <div className="p-2 flex items-center text-base w-full ">
                    <span className={passTitle}>{item.title}</span>
                    <span className={btnQuantity + ' ml-auto'}>-</span>
                    <span className={passNumber}>{item.quantity}</span>
                    <span className={btnQuantity}>+</span>
                </div>
            ))}
        </div>}
    </div>
    );
};

export default OptionsSection;
const passTitle = 'text-sm text-gray-600 mr-5 '
const passNumber = 'px-2'
const btnQuantity = ' w-5 shadow h-5 font-black text-lg text-purple-400 rounded-full flex items-center justify-center font-bold cursor-pointer border-2 border-purple-400'
const optionsContent = 'flex flex-col'
const mainTypeBox = "flex  border-2 border-purple-500 overflow-hidden cursor-pointer"
const mainTypeItem = ' px-2 py-1 font-bold duration-500'
const mainTypeItemActive = ' px-2 py-1 font-bold bg-purple-400 text-white duration-500'


const optionsSection = 'flex flex-col w-full bg-white rounded mb-5 p-4 text-xs border '

