
import { ITaxi, useMain } from '../../../Store/useMain';
import React from 'react';
import CarCard from './CarCard';
import { useValidation } from '../../../Store/useValidation';
import axios, { AxiosResponse } from 'axios';
import { UseMutationResult, useMutation } from 'react-query';
import dayjs from 'dayjs';


const sendOrder = async (data:ITaxi[]): Promise<AxiosResponse> => {
    console.log(data, 'data')
    // const response = await axios.post("https://taxibeckend.onrender.com/order",data)
    const response = await axios.post("https://taxibeckend.onrender.com/order",data)
    console.log(response, 'response from server')
    return response;
};

const Submit = (): React.ReactNode => {
    const { list } = useMain()
    const { setIsSubmit } = useValidation()
    const mutation: UseMutationResult<AxiosResponse<unknown>, unknown, ITaxi[], unknown> = useMutation(data=> sendOrder(data))

    return (
        <section className={section}>
            {list.filter(item => item.filled).length > 0 
            ? list.filter(item => item.filled).map((item) => (
                <CarCard  key={item.name + item.phone}/>
            ))
            :<div className='w-full h-[100px] text-center'> no orders yet</div>  }
            <div className="flex justify-between">
                <div onClick={() => setIsSubmit(false)} className={btn}> Back </div>
                <div onClick={() => {
                    const data = list.filter(item=>item.filled).map(car =>{return car.dateNow?  {...car, date: dayjs().format('MM/DD/YYYY'), time: dayjs().format('HH:mm')} : car})
                    mutation.mutate(data)
                    alert('order sent')
                }} className={btn2}>Submit</div>
            </div>
        </section>
    );
};

export default Submit;

const btn = 'flex border border-black px-2 py-2 rounded self-start bg-red-500 active:bg-red-400 cursor-pointer text-white'
const btn2 = 'flex text-black border-black border px-2 py-2 rounded self-start bg-green-400 active:bg-green-300 cursor-pointer text-white'

const section = 'flex w-full space-y-4  flex-col max-w-[576px] border-none   py-8 px-1'

