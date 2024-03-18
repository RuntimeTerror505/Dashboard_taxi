import { useEffect, useState } from "react";
import { useMain } from "../../../../Store/useMain";

const SportSelect = () => {
    const { orders, id,setOrder } = useMain()
    const [max, setMax ] = useState(orders[id].sport.reduce((sum, item) => sum + item.quantity, 0))

    useEffect(()=>{
        setMax(orders[id].sport.reduce((sum, item) => sum + item.quantity, 0))
    },[orders[id].sport])

    useEffect(()=>{
        if(Number(orders[id].totalSport) < max) { 
            const newSport = orders[id].sport
            const index =  orders[id].sport.map(item => item.quantity > 0).lastIndexOf(true)
            newSport[index].quantity--
            
            setOrder([...newSport],'sport')
        }
    },[orders[id].totalSport])

    return (
        <div className={optionsContent}>
            <h2 className=' absolute top-2 text-red-500 self-end'>Maximum 10 items </h2>

            <div className={itemRow+ ' border-b font-bold' }>
                <span className={passTitle}>Total Sport:</span>
                <span className={btnQuantity + ' ml-auto'} onClick={() => {
                    if (!Number(orders[id].totalSport)) return;
                    setOrder(Number(orders[id].totalSport) - 1,'totalSport')
                }}>-</span>
                <span className={passNumber}>{orders[id].totalSport}</span>
                <span className={btnQuantity} onClick={() => {
                    if (Number(orders[id].totalSport) >= 10) return
                    setOrder(Number(orders[id].totalSport) + 1,'totalSport')
                }}>+</span>
            </div>

        {orders[id].sport.map(item => (
            <div className={itemRow}>
                
                <span className={passTitle}>{item.title }</span>
                <span className={btnQuantity + ' ml-auto'} onClick={() => {
                    if(item.quantity <= 0 ) return;
                    setOrder(orders[id].sport.map(rem=>item.title === rem.title ? {...rem,  quantity: rem.quantity - 1} : rem ),'sport')
                }}>-</span>
                <span className={passNumber}>{item.quantity}</span>
                <span className={btnQuantity} onClick={() => {
                    if(max >= +orders[id].totalSport) return;
                    if(item.quantity >= 10) return;
                    setOrder(orders[id].sport.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ),'sport')
                }}>+</span>
            </div>
        ))}
    </div>
    );
};

export default SportSelect;


const itemRow = 'p-2 flex items-center text-base w-full '

const passTitle = 'text-sm text-gray-600 mr-5 '
const passNumber = 'px-2'
const btnQuantity = ' w-5 shadow h-5 font-black text-lg text-blue-400 rounded-full flex items-center justify-center font-bold cursor-pointer border-2 border-blue-400'
const optionsContent = 'flex w-full relative flex-col  pr-2 pt-8'
