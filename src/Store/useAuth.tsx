import axios from 'axios';
import { create } from 'zustand'

interface IUser {
    _id: string;
    email: string;
    name: string;
    phone: string;
    password: string;
    role: string;
}
interface Store {
    user: IUser;
    response: number;
    login: (user: {email:string, password:string}) => void;
    setStatus: ( data:number )=> void; 
    registration: (user: {email:string, password:string, name:string, phone:string}) => void;
}

export const useAuth = create<Store>((set) => ({
    user: {
        _id:'',
        email: '',
        name:'',
        phone:"",
        password: '',
        role: '',
    
    },
    response: 0,
    setStatus: (data) => set((state) => ({ ...state,response: data})),
    login: async () =>{
        
        set(state => ({...state, response: 102 }))
        // const res = await axios.post('http://localhost:7013/auth/login', data).then(res => res.data)
        const res = await axios.get('https://taxibeckend.onrender.com/auth/registration').then(res => res.data)
        console.log(res, 'login response from server')
        if(res.token) localStorage.setItem('token', res.token);
        set(state => ({...state,response:res.status }))
    },

    registration: async (data) =>{
        set(state => ({...state, response: 102 }))
        const res = await axios.post('https://taxibeckend.onrender.com/auth/registration', data).then(res => res.data)
        console.log(res, 'registration response from server')
        if(res.status === 409) return set(state => ({...state, response: res.status }))
        set(state => ({...state , response: res.status }))
    } 
}))