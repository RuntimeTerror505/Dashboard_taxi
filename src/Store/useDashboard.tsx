import { create } from 'zustand'
import axios from 'axios';


export interface IOrder {
    additionalText: string;
    adults: number;
    babies: number;
    carType: number;
    date: string;
    departure: string;
    departure2: string;
    email: string;
    email2: string;
    email3: string;
    flight: { title: string; prefix: string; number: string };
    flight2: { title: string; prefix: string; number: string };
    from: string;
    isReturnTrip: boolean;
    kids: number[];
    name: string;
    name2: string;
    name3: string;
    orderType: number;
    paymentMethod: string;
    phone: string;
    phone2: string;
    phone3: string;
    status: string;
    stops: { 1: string; 2: string; 3: string; 4: string };
    time: string;
    title: string;
    title2: string;
    title3: string;
    to: string;
    tripType: string;
    type: number;
    __v: number;
    _id: string;
}

export interface IEvent {
    data: IOrder;
    title: string;
    allDay?: boolean;
    start:  Date;
    end:  Date;
}
interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    orders: string[];

}
interface Store {
    orders: IOrder[];
    users: IUser[],
    isFrench: boolean,
    setIsFrench:(value: boolean) => void;
    getOrders: () => void;
    getUsers: () => void;
}
export const useDashboard = create<Store>((set) => ({
    orders: [],
    users: [],
    isFrench: false,
    setIsFrench: (data) => set((state) => ({ ...state,isFrench: data})),

    getOrders: async  () => {
        const res:IOrder[] = await axios.get('https://taxibeckend.onrender.com/order').then(res => res.data)
        // const res:IOrder[] = await axios.get('http://localhost:7013/order').then(res => res.data)
        set((state) =>({...state, orders: res}))
    },
    getUsers: async  () => {
        const res:IUser[] = await axios.get('https://taxibeckend.onrender.com/users').then(res => res.data)
        set((state) =>({...state, users: res}))
    } 
}))
