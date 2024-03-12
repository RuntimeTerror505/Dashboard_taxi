import { useMain } from '../../../../Store/useMain';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const BagsSelect = ():React.ReactNode => {
    const { t } = useTranslation();
    const {orders, id, setOrder} = useMain()
    const [max, setMax ] = useState(orders[id].baggage.reduce((sum, item) => sum + item.quantity, 0))

    useEffect(()=>{
        setMax(orders[id].baggage.reduce((sum, item) => sum + item.quantity, 0))
    },[orders[id].baggage])
    

    const titlesKg:{[key:number]:string} = {
        1: `${t('checkedBag')} [ 23 to 32 ] kg`,
        2: `${t('carryOnBag')} [ 8 to 10 ] kg`,
        3: `${t('backpacks')}`,
    }

    const titlesLb:{[key:number]:string} = {
        1: `${t('checkedBag')}  [ 50 to 70 ] lb`,
        2: `${t('carryOnBag')}  [ 17 to 22 ] lb`,
        3: `${t('backpacks')} `,
    }


    useEffect(()=>{
        if(Number(orders[id].totalBags) < max) { 
            const newBaggage = orders[id].baggage
            const index =  orders[id].baggage.map(item => item.quantity > 0).lastIndexOf(true)
            newBaggage[index].quantity--
            
            setOrder([...newBaggage],'baggage')
        }
    },[orders[id].totalBags])

    return (
        <div className={container} >

            <div className={toggle} onClick={()=>setOrder(!orders[id].weightType, 'weightType')}>
                {orders[id].weightType? 'kg': 'lb'}
            </div>


            <div className={itemRow}>
                
                <span className={passTitle}>Total Bags:</span>
                <span className={btnQuantity + ' ml-auto'} onClick={() => {
                    if (!Number(orders[0].totalBags)) return;
                    setOrder(Number(orders[0].totalBags) - 1,'totalBags')
                }}>-</span>
                <span className={passNumber}>{orders[0].totalBags}</span>
                <span className={btnQuantity} onClick={() => {
                    if (Number(orders[0].totalBags) >= 10) return
                    setOrder(Number(orders[0].totalBags) + 1,'totalBags')
                }}>+</span>
            </div>

            {orders[id].baggage.map((item)=>(
            <div className={itemRow}>
                
                <span className={passTitle}>{orders[id].weightType? titlesLb[item.type] : titlesKg[item.type]}</span>
                <span className={btnQuantity + ' ml-auto'} onClick={() => {
                    if(item.quantity <= 0 ) return;
                    setOrder(orders[id].baggage.map(rem=>item.type === rem.type ? {...rem,  quantity: rem.quantity - 1} : rem ),'baggage')
                }}>-</span>
                <span className={passNumber}>{item.quantity}</span>
                <span className={btnQuantity} onClick={() => {
                    if(max >= +orders[id].totalBags) return;
                    if(item.quantity >= 10) return;
                    setOrder(orders[id].baggage.map(rem=>item.type === rem.type ? {...rem, quantity: rem.quantity + 1} : rem ),'baggage')
                }}>+</span>
            </div>))}
            
        </div>
    );
};
export default BagsSelect;

const toggle = 'border-black ml-2 border rounded-lg w-6 h-6 cursor-pointer flex items-center justify-center'
const passTitle = 'text-sm text-gray-600 mr-5 '
const passNumber = 'px-2'
const btnQuantity = ' w-5 shadow h-5 font-black text-lg text-purple-400 rounded-full flex items-center justify-center font-bold cursor-pointer border-2 border-purple-400'
const itemRow = 'p-2 flex items-center text-base w-full '
const container = 'flex flex-col'