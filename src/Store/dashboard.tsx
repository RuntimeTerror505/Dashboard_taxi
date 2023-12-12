import { create } from 'zustand'
import { ITaxi } from './useMain';
import axios from 'axios';

interface IOrders extends ITaxi {
    status: string;
}

interface IUser {
    _id: string;
    name: string;
    email: string;
    phone: string;
    orders: string[];

}
interface Store {
    orders: IOrders[];
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
        const res:IOrders[] = await axios.get('https://taxibeckend.onrender.com/order').then(res => res.data)
        set((state) =>({...state, orders: res}))
    },
    getUsers: async  () => {
        const res:IUser[] = await axios.get('https://taxibeckend.onrender.com/users').then(res => res.data)
        set((state) =>({...state, users: res}))
    } 
}))
