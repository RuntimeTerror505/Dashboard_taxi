import { useEffect, useState } from 'react';
import { useMain } from '../../../../Store/useMain';

const CarSeatsSelect = () => {
    const { orders,id, setOrder} = useMain()

    const [maxSeats, setMaxSeats ] = useState(orders[id].carSeats.filter((_,index)=> index <3).reduce((sum, item) => sum + item.quantity, 0))
    const [maxStroll, setMaxStroll ] = useState(orders[id].carSeats.filter((_,index)=> index >2).reduce((sum, item) => sum + item.quantity, 0))
    useEffect(()=>{
        setMaxSeats(orders[id].carSeats.filter((_,index)=> index <3).reduce((sum, item) => sum + item.quantity, 0))
        setMaxStroll(orders[id].carSeats.filter((_,index)=> index >2).reduce((sum, item) => sum + item.quantity, 0))
    },[orders[id].carSeats])


    useEffect(()=>{
        const seats = orders[id].carSeats.filter((_,index)=> index <3)
        const strollers = orders[id].carSeats.filter((_,index)=> index >2)
        console.log(seats)
        if(Number(orders[id].totalSeats) < maxSeats) {
            const index =  seats.map(item => item.quantity > 0).lastIndexOf(true)
            seats[index].quantity -= 1
            setOrder([...seats, ...strollers], 'carSeats')
        }
        if(Number(orders[id].totalStroller) < maxStroll) {
            const index =  strollers.map(item => item.quantity > 0).lastIndexOf(true)
            strollers[index].quantity -= 1
            setOrder([...seats, ...strollers], 'carSeats')
        }
    },[orders[id].totalSeats, orders[id].totalStroller])


    const addTotalSeats = () => {
        if(orders[id].totalSeats ===10) return
        setOrder(+orders[id].totalSeats+1,'totalSeats')
    }
    const removeTotalSeats = () => {
        if(orders[id].totalSeats ===0) return
        setOrder(+orders[id].totalSeats-1,'totalSeats')
    }

    const addTotalStrollers = () => {
        if(orders[id].totalStroller ===10) return
        setOrder(+orders[id].totalStroller+1,'totalStroller')
    }
    const removeTotalStrollers = () => {
        if(orders[id].totalStroller ===0) return
        setOrder(+orders[id].totalStroller-1,'totalStroller')
    }

    return (
        <div className={optionsContent}>
            <h2 className=' absolute top-2  text-red-500 self-end'>Maximum 10 items </h2>
            <div className="p-2 flex items-center text-base w-full border-b font-bold">
                <span className={passTitle}>Total Seats: </span>
                <span className={btnQuantity + ' ml-auto'} onClick={removeTotalSeats}>-</span>
                <span className={passNumber}>{orders[id].totalSeats}</span>
                <span className={btnQuantity} onClick={addTotalSeats}>+</span>
            </div>

            {orders[id].carSeats.filter((_,index)=>  index < 3 ).map(item => (
                <div className="p-2 flex items-center text-base w-full ">
                    <span className={passTitle}>{item.title}</span>
                    <button 
                        className={btnQuantity + ' ml-auto'}
                        onClick={()=>{
                            if(item.quantity <= 0 ) return 
                                setOrder(orders[id].carSeats.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ), 'carSeats')
                            }}
                    >-</button>
                    <span className={passNumber}>{item.quantity}</span>
                    <button 
                        className={btnQuantity}
                        onClick={()=>{
                            if(maxStroll >= +orders[id].totalStroller) return;
                            if(orders[id].carSeats[3].quantity >= 10) return;
                            setOrder(orders[id].carSeats.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ),'carSeats')
                        }}
                    >+</button>
                </div>
            ))}

            <div className="p-2 flex items-center text-base w-full border-b font-bold mt-[90px]">
                <span className={passTitle}>Total Strollers: </span>
                <span className={btnQuantity + ' ml-auto'} onClick={removeTotalStrollers}>-</span>
                <span className={passNumber}>{orders[id].totalStroller}</span>
                <span className={btnQuantity} onClick={addTotalStrollers}>+</span>
            </div>

            {orders[id].carSeats.filter((_,index)=>  index > 2  ).map(item => (
                <div className="p-2 flex items-center text-base w-full ">
                    <span className={passTitle}>{item.title}</span>
                    <button 
                        onClick={()=>{
                            if(item.quantity <= 0 ) return ;
                            setOrder(orders[id].carSeats.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity - 1} : rem ), 'carSeats')
                        }}  
                        className={btnQuantity + ' ml-auto'}
                    >-</button>
                    <span className={passNumber}>{item.quantity}</span>
                    <button 
                        className={btnQuantity}
                        onClick={()=>{
                            if(maxStroll >= +orders[id].totalStroller) return;
                            if(item.quantity >= 10) return;
                            setOrder(orders[id].carSeats.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ),'carSeats')
                        }}
                    >+</button>
                </div>
            ))}
        </div>
    );
};

export default CarSeatsSelect;

const passTitle = 'text-sm text-gray-600 w-3/5 '
const passNumber = 'px-2'
const btnQuantity = ' w-5 shadow h-5 font-black text-lg text-blue-400 rounded-full flex items-center justify-center font-bold cursor-pointer border-2 border-blue-400'
const optionsContent = 'relative w-1/3 flex flex-col pr-2 pt-8 border-l'

