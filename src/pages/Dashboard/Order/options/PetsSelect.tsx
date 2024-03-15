import { useEffect, useState } from "react";
import { useMain } from "../../../../Store/useMain";

const PetsSelect = () => {
    const { orders, id,setOrder } = useMain()
    const [max, setMax ] = useState(orders[id].pets.reduce((sum, item) => sum + item.quantity, 0))

    useEffect(()=>{
        setMax(orders[id].pets.reduce((sum, item) => sum + item.quantity, 0))
    },[orders[id].pets])

    useEffect(()=>{
        if(Number(orders[id].totalPets) < max) { 
            const newPets = orders[id].pets
            const index =  orders[id].pets.map(item => item.quantity > 0).lastIndexOf(true)
            newPets[index].quantity--
            
            setOrder([...newPets],'pets')
        }
    },[orders[id].totalPets])

    return (
        <div className={optionsContent}>
            <h2 className=' absolute top-2 text-red-500 self-end'>Maximum 10 pets </h2>

            <div className={itemRow+ ' border-b font-bold' }>
                <span className={passTitle}>Total Pets:</span>
                <span className={btnQuantity + ' ml-auto'} onClick={() => {
                    if (!Number(orders[0].totalPets)) return;
                    setOrder(Number(orders[0].totalPets) - 1,'totalPets')
                }}>-</span>
                <span className={passNumber}>{orders[0].totalPets}</span>
                <span className={btnQuantity} onClick={() => {
                    if (Number(orders[0].totalPets) >= 10) return
                    setOrder(Number(orders[0].totalPets) + 1,'totalPets')
                }}>+</span>
            </div>

        {orders[id].pets.map(item => (
            <div className={itemRow}>
                
                <span className={passTitle}>{item.title }</span>
                <span className={btnQuantity + ' ml-auto'} onClick={() => {
                    if(item.quantity <= 0 ) return;
                    setOrder(orders[id].pets.map(rem=>item.title === rem.title ? {...rem,  quantity: rem.quantity - 1} : rem ),'pets')
                }}>-</span>
                <span className={passNumber}>{item.quantity}</span>
                <span className={btnQuantity} onClick={() => {
                    if(max >= +orders[id].totalPets) return;
                    if(item.quantity >= 10) return;
                    setOrder(orders[id].pets.map(rem=>item.title === rem.title ? {...rem, quantity: rem.quantity + 1} : rem ),'pets')
                }}>+</span>
            </div>
        ))}
    </div>
    );
};

export default PetsSelect;

const itemRow = 'p-2 flex items-center text-base w-full '

const passTitle = 'text-sm text-gray-600 mr-5 '
const passNumber = 'px-2'
const btnQuantity = ' w-5 shadow h-5 font-black text-lg text-blue-400 rounded-full flex items-center justify-center font-bold cursor-pointer border-2 border-blue-400'
const optionsContent = 'relative flex w-full flex-col border-l pr-2 pt-8'
