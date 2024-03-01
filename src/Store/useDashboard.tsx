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
    activeEvents: IOrder[],
    driverNumber:number;
    accessToken: string, 
    setIsFrench:(value: boolean) => void;
    setDriverNumber:(value: number) => void;
    setActiveEvents:(value: IOrder[]) => void;
    setOrders:(value: IOrder[]) => void;
    getOrders: () => void;
    getUsers: () => void;
    sendOrder: (data:IOrder) => void;
    sendOrderToDriver: (data:IOrder,number:number) => void;
    setToken: (token:string) => void;
    getToken: () => void;
}
export const useDashboard = create<Store>((set) => ({
    orders: [],
    users: [],
    isFrench: false,
    activeEvents:[],
    driverNumber: 0,
    accessToken: '',
    setDriverNumber: (data) => set((state) => ({ ...state,driverNumber: data})),
    setIsFrench: (data) => set((state) => ({ ...state,isFrench: data})),
    setActiveEvents: (data) => set((state) => ({ ...state,activeEvents: data})),
    setOrders: (data) => set((state) => ({ ...state, orders: data})),
    setToken: (data) => set((state) => ({ ...state, accessToken: data})),
    getOrders: async  () => {
        // const res:IOrder[] = await axios.get('https://taxibeckend.onrender.com/order').then(res => res.data)
        const res:IOrder[] = await axios.get('https://server.taxi/order').then(res => res.data)
        set((state) =>({...state, orders: res}))
    },
    getUsers: async  () => {
        const res:IUser[] = await axios.get('https://taxibeckend.onrender.com/users').then(res => res.data)
        set((state) =>({...state, users: res}))
    },
    getToken: async  () => {
        const res:string = await axios.get('https://api.taxicaller.net/AdminService/v1/jwt/for-key?key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDk1Iiwic3ViIjoiKiIsInVpZCI6MCwiZmxhZ3MiOjgsIm9pZCI6MjIyMDgsImV4cCI6MTcwOTMwOTI5OH0.gh82x_uVqm1d-PzoryaVfpaTF8ozWyYZTJP9w9Oa29w&sub=*').then(res => res.data)
        set((state) =>({...state, accessToken: res}))
    },


    sendOrderToDriver: async  ( data: IOrder, number: number ) => {
        const res:IOrder = await axios.post('https://api.taxicaller.net/AdminService/v1/jwt/for-key?key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDk1Iiwic3ViIjoiKiIsInVpZCI6MCwiZmxhZ3MiOjgsIm9pZCI6MjIyMDgsImV4cCI6MTcwOTMwOTI5OH0.gh82x_uVqm1d-PzoryaVfpaTF8ozWyYZTJP9w9Oa29w&sub=*', {data, number})
        console.log(res, 'response from server')
    },

    sendOrder: async  ( data: IOrder ) => {
        const res:IOrder = await axios.post('https://api.taxicaller.net/AdminService/v1/jwt/for-key?key=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDk1Iiwic3ViIjoiKiIsInVpZCI6MCwiZmxhZ3MiOjgsIm9pZCI6MjIyMDgsImV4cCI6MTcwOTMwOTI5OH0.gh82x_uVqm1d-PzoryaVfpaTF8ozWyYZTJP9w9Oa29w&sub=*', data)
        console.log(res, 'response from server')
    },
}))
