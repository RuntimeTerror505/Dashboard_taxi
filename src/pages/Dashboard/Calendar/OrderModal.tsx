import React from 'react';
import {  Modal } from 'antd';
import { IOrder, useDashboard } from '../../../Store/useDashboard';

const cars: { [keys: number]:string} =  {
    1:'Sedan',
    2:'SUV',
    3:'VAN',
    4:'Limo',
}
const OrderModal = ({ item, setIsModalOpen, open}:{setIsModalOpen:(data:boolean)=>void, open:boolean , item:IOrder} ): React.ReactNode => {
    const { orders, setOrders, setActiveEvents, activeEvents, sendOrder,sendOrderToDriver, driverNumber, setDriverNumber } = useDashboard()
    const changeStatus = (status: string) => {
        
        setOrders(orders.map(i => i._id === item._id? { ...i, data: { ...item, status }}: i))
        setActiveEvents(activeEvents.map(i => i._id === item._id? {...item, status }: i))
    }
    

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };



console.log(item)
  return (
    
      <Modal 
        title="Bonjour taxi" 
        width={800}
        open={open} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer=''
    >
        <div className={content}>
            <div className={carType}>{cars[item.carType]}</div>
            <div className={carStatus}>{item.status}</div>
            <div>date: {item.date}</div>
            <div className='mb-2'>time: {item.time}</div>
            <div> {item.from}</div>
            <div>{item.to}</div>
        </div>
        <div className={buttons}>
            <button className={buttonYellow} onClick={()=>{sendOrder(item)}}>Taxi Caller</button>
            <button className={buttonInput} onClick={()=>{sendOrderToDriver(item, driverNumber)}}>Assign to driver</button>
            <input value={driverNumber}  onChange={(e)=>setDriverNumber(+e.target.value.replace(/[^\d]+/g, ''))} type="text" placeholder='Driver#' className={driverInput} maxLength={4}/>

            <button onClick={()=>changeStatus('canceled')} className={item.status === 'canceled' ? buttonToggleLActive : buttonToggleL}>Canceled</button>
            <button onClick={()=>changeStatus('pending')} className={item.status === 'pending' ? buttonToggleCActive : buttonToggleC }>Pending</button>
            <button onClick={()=>changeStatus('confirmed')} className={item.status === 'confirmed' ? buttonToggleRActive : buttonToggleR}>Confirmed</button>

            <button className={button + ' rounded-full bg-blue-500 active:bg-blue-400 text-white mx-4 ml-auto'}>Modify</button>
            <button className={button + ' rounded-full bg-gray-400 text-white'}>Hide</button>
        </div>


      </Modal>
  );
};

export default OrderModal;
 
const carStatus = ' absolute top-[22px] left-32 border px-2 rounded' 
const buttonToggleL = '  py-1 px-2 rounded-l-full  ml-4 border'
const buttonToggleC = '  py-1 px-2 border-t border-b border-'
const buttonToggleR = '  py-1 px-2 rounded-r-full border'

const buttonToggleLActive = '  py-1 px-2 text-white rounded-l-full bg-red-500 active:bg-red-400  ml-4'
const buttonToggleCActive = '  py-1 px-2 text-white bg-orange-400 border-orange-400 active:bg-orange-300'
const buttonToggleRActive = '  py-1 px-2 text-white rounded-r-full bg-green-400 border-green-400 active:bg-green-300 '


const driverInput = ' border py-[7px] rounded-r-full w-[80px] mr-6 outline-none px-2'
const button = '  py-2 px-4 '
const buttonInput = '  py-2 px-4  rounded-l-full ml-4 bg-yellow-300 active:bg-yellow-200'
const buttonYellow = '  py-2 px-4 rounded-full bg-yellow-300 active:bg-yellow-200'
const buttons = 'flex mt-4 border-t pt-4 w-full items-center'

const carType = ' text-lg font-bold'
const content = ' flex flex-col ' 