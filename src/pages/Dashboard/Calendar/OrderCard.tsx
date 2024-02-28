import React, { useState } from 'react';
import { IOrder, useDashboard } from '../../../Store/useDashboard';
import OrderModal from './OrderModal';


const OrderCard= ({ item }:{ item:IOrder }): React.ReactNode  => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { activeEvents, setActiveEvents } = useDashboard()

    return (
        <div className={activeEventItem}>
            <div className="flex flex-col mb-4">
                <div className={text}><span className={title}>Date: </span>{item.date}</div>
                <div className={text}><span className={title}>Time: </span> {item.time}</div>
                <div className={orderStatus}>{item.status}</div>
            </div>
            <div className="flex w-full justify-between">
                <button className={approveButton} onClick={()=>setIsModalOpen(true)}>Open order</button>
                <button className={closeButton} onClick={()=>setActiveEvents(activeEvents.filter(i => i._id !== item._id))}>x</button>
            </div>
            <OrderModal item={item} setIsModalOpen={setIsModalOpen} open={isModalOpen} />
        </div>
    );
};

export default OrderCard;

const orderStatus = ' absolute right-8 top-1 bg-green-300 px-2 rounded-full text-white py-[2px]'

const text = 'flex text-sm '
const title = 'text-yellow-300 mr-2 text-sm'

const approveButton = ' '
const closeButton = ' absolute top-1 right-1 w-5 h-5 flex items-center justify-center rounded-full bg-rose-500 text-white cursor-pointer'
const activeEventItem = 'relative flex flex-col border border-yellow-300 py-2 px-4 mb-2 bg-white '