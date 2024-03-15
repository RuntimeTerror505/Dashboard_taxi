import { Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useMain } from '../../../Store/useMain';
import { useStore } from '../../../Store';
import axios, { AxiosResponse } from 'axios';

const PaymentSection = () => {
    const { orders, isFrench,  setOrder } = useMain()
    const { store } = useStore()

    const sendOrder = async (): Promise<AxiosResponse> => {

        console.log(orders, ' - order sent')
        const response = await axios.post("http://localhost:7010/order",{ list:orders, isFrench })
        // const response = await axios.post("https://taxibeckend.onrender.com/order",{orders, isFrench})
        console.log(response, 'response from server')
        return response;
    };

    return (
        <div className={optionsSection}>
        <div className='pb-2'>
            <div className='text-blue-600 w-1/3'>Payment method</div>
        </div>
        <div className='pb-2 flex space-x-2'>
            <span className='flex border h-min pl-3 w-[100px] rounded-lg'>
                <Select placeholder='Trip type' style={{ width: 200, height: 30, borderRadius: 10 }} value={orders[0].tripType} onChange={(value)=>setOrder(value,'tripType')} options={store.tripList.map(item => ({ value: item, label: item }))} /></span>
            <span className='flex border h-min pl-3 w-[100px] rounded-lg'>
                <Select placeholder='Payment method' style={{ width: 200, height: 30, borderRadius: 10 }} value={orders[0].paymentMethod} onChange={(value)=>setOrder(value,'maymentMethod')} options={store.paymentList.map(item => ({ value: item, label: item }))} /></span>
        </div>
        <span className={textArea}>
            <TextArea style={{ borderRadius: '10px' }} rows={2} placeholder='Additional information' onChange={(e) => {
                setOrder(e.target.value, 'additionalText')
            }} /></span>

        <div className="flex space-x-2">
            <div className={btnGreen} onClick={sendOrder}>confirm</div>
            <div className={btnblue}>orders</div>
        </div>
    </div>
    );
};

export default PaymentSection;


const btnGreen = ' border-2 px-2 py-1 rounded-full border-green-500 font-bold cursor-pointer hover:bg-green-300 self-start'
const btnblue = ' border-2 px-2 py-1 rounded-full border-blue-500 font-bold cursor-pointer hover:bg-blue-400'

const optionsSection = 'flex flex-col w-full bg-white rounded mb-5 p-4 text-xs border border-gray-800'
const textArea = 'flex border h-min w-full rounded-lg mb-4'
