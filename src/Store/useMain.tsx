import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware'


export interface IPet {
    isOther?: boolean;
    title: string,
    cage: boolean,
    quantity: number,
}

interface IItem {
    title: string,
    quantity: number,
}

export interface ITaxi {
    id: number;
    filled: boolean;
    timeType: number;
    timeTypeR: number;
    type: number;
    validation:number;
    isEdit: boolean;
    weightType: boolean;
    totalPass: number | string;
    totalBags: number | string;
    totalSport: number | string;
    totalPets: number | string;
    totalSeats: number | string;
    totalStroller: number | string;

    name: string;
    name2: string;
    name3: string;

    title: string;
    title2: string;
    title3: string;

    email: string;
    email2: string;
    email3: string;

    phone: string;
    phone2: string;
    phone3: string;

    date: string;
    time: string;
    dateNow: boolean;

    //trip information
    from: string;
    to: string;

    stops: { [key: number]: string; };

    icon: number;
    icon2: number;

    flight: {
        title: string;
        prefix: string;
        number: string;
    };
    flight2: {
        title: string;
        prefix: string;
        number: string;
    };

    airlines: string;
    airlinesBack: string;

    departure: string;
    departure2: string;
    tripType: string;

    paymentMethod: string;
    additionalText: string;

    //return trip information
    isReturnStatus: boolean;
    isReturnTrip: boolean;

    fromR: string;
    toR: string;

    stopsR: {
        [key: number]: string;
    },

    dateR: string;
    timeR: string;

    iconR: number;
    icon2R: number;
    flightR: {
        title: string;
        prefix: string;
        number: string;
    };
    flight2R: {
        title: string;
        prefix: string;
        number: string;
    };

    airlinesR: string;
    airlinesBackR: string;
    departureR: string;
    departure2R: string;

    //options information
    carType: number;
    adults: number;
    kids: number[],
    babies: number
    baggage: {type:number,title: string,  quantity:number}[];
    sport: IItem[];
    pets: IPet[];
    carSeats: IItem[];
    steps: number;
}

interface IStore {
    submit: boolean;
    alert: string;
    isFrench: boolean;
    isCars: {
        1: boolean,
        2: boolean,
        3: boolean,
        4: boolean,
        5: boolean,
    }
    id: number;
    orders: ITaxi[];
    //info methods
    setOrder: (data: any, title:string) => void;
    setIsFrench: (value: boolean) => void;
    setAlert: (value: string) => void;
    setId: (value: number) => void;
    setIsCars: (data: {
        1: boolean,
        2: boolean,
        3: boolean,
        4: boolean,
        5: boolean
    }) => void;
    addNewCar: () => void;
    removeCar: (id: number) => void;
    setSubmit: (value: boolean) => void;
    resetForm: () => void;
    restoreForm: () => void;
    resetLocation: () => void;
    resetReturn: () => void;

    setIsReturnStatus: (value: boolean) => void;
    setOrders: (value: ITaxi[]) => void;
}


export const useMain = create<IStore>()(
    persist(
    (set) => ({
        alert: '',
        isCars: { 1: false, 2: false, 3: false, 4: false, 5: false, },
        id: 0,
        isFrench: false,
        submit: false,
        orders: [
            {
                id: 1,
                type: 1,
                timeType: dayjs().isBefore(dayjs().set('hour', 12).set('minute', 0).set('second', 0))? 1: 2,
                timeTypeR: dayjs().isBefore(dayjs().set('hour', 12).set('minute', 0).set('second', 0))? 1: 2,
                filled: false,
                validation:1,
                isEdit: false,
                isReset: {1:false, 2:false, 3:false, 4:false, 5:false, 6:false },
                weightType: true,
                totalPass: 1,
                totalBags: 0,
                totalSport: 0,
                totalPets: 0,
                totalSeats: 0,
                totalStroller: 0,

                name: '',
                name2: '',
                name3: '',

                title: '',
                title2: '',
                title3: '',

                email:'@',
                email2:'@',
                email3:'@',

                phone: '',
                phone2: '',
                phone3: '',

                date: '', 
                time: dayjs().add(15,'minutes').format('hh:mm'), 
                dateNow: true,

                //trip information
                from: '', to: '',

                stops: {
                    1: '', 2: '', 3: '', 4: '',
                },

                icon: 0, icon2: 0,

                airlines: '', airlinesBack: '',
                flight: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                flight2: {
                    title: '',
                    prefix: '',
                    number: '',
                },

                departure: '', departure2: '',

                tripType: 'Vacation',
                paymentMethod: 'Cash',
                additionalText: '',

                //return trip information
                isReturnTrip: false,
                isReturnStatus:false,

                fromR: '', toR: '',

                stopsR: {
                    1: '', 2: '', 3: '', 4: '',
                },

                dateR: '', timeR: '',

                iconR: 0, icon2R: 0,
                flightR: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                flight2R: {
                    title: '',
                    prefix: '',
                    number: '',
                },

                airlinesR: '', airlinesBackR: '',
                departureR: '', departure2R: '',

                //options information
                carType: 1,

                adults: 1, kids: [], babies: 0,

                baggage: [
                    { type: 1,title: '', quantity: 0, },
                    { type: 2,title: '', quantity: 0, },
                    { type: 3,title: '', quantity: 0, }
                ],
                sport: [
                    { title: 'Bikes', quantity: 0, },
                    { title: 'Skis', quantity: 0, },
                    { title: 'Golf', quantity: 0, },
                    { title: 'Surf', quantity: 0, },
                ],
                carSeats: [
                    {
                        title: 'Regular',
                        quantity: 0,
                    },
                    {
                        title: 'Baby',
                        quantity: 0,
                    },
                    {
                        title: 'Booster',
                        quantity: 0,
                    },
                    {
                        title: 'Regular stroller',
                        quantity: 0,
                    },
                    {
                        title: 'Umbrella',
                        quantity: 0,
                    },
                    {
                        title: 'Double',
                        quantity: 0,
                    },
                    {
                        title: 'Wheelchair',
                        quantity: 0,
                    },
                ],
                pets: [
                    { title: 'Dog', cage: false, quantity: 0, },
                    { title: 'Cat', cage: false, quantity: 0 },
                    { title: 'Rabbit', cage: false, quantity: 0 },
                    { title: 'Service dog (Mira)', cage: false, quantity: 0 },
                    { title: 'Other', cage: false, quantity: 0, isOther: true, },
                ],
                steps:0,
            }
        ],
        setOrder: (data, title) => set((state) => ({ ...state, orders: state.orders.map(item => item.id === state.id+1 ? {...item,  [title] : data } : item ) })), 
        setIsFrench: (data) => set((state) => ({ ...state, isFrench: data})), 
        

        addNewCar:() => {
            set((state)=>({
                ...state,
                orders:[...state.orders, {...state.orders[state.orders.length-1], id: (state.orders[state.orders.length-1].id+1), isEdit: false, filled: false, validation: 1 } ]
            }))
        },
        removeCar:(id) =>  set((state)=>({...state, orders:state.orders.filter(item => item.id !== id)})),

        setOrders:(data) => {
            const res = data.map((item,index)=> { return {...item, id: (index+1)} })
            set((state)=>({...state, orders:res}))
        },

        setAlert: (data) => set((state) => ({ ...state, alert: data })),
        setSubmit: (data) => set((state) => ({ ...state, submit: data })),

        setId: (data) => set((state) => ({ ...state, id: data })),
        setIsCars: (data) => set((state) => ({ ...state, isCars: data })),

        resetForm: () => set((state) => ({
            ...state, orders: state.orders.map(item => item.id === state.id++ 
                ? 
                {   ...item,
                    id: state.id++,
                    type: 1,
                    timeType: 0,
                    timeTypeR: 0,
                    filled: false,
                    validation:0,
                    isEdit: false,
                    isReset: { 1:true, 2:true, 3:true, 4:true, 5:true, 6:true },
                    totalPass: 1,
                    totalBags: 0,
                    totalSport: 0,
                    totalPets: 0,
                    totalSeats: 0,
                    totalStroller: 0,

                    name: '',
                    name2: '',
                    name3: '',
    
                    title: '',
                    title2: '',
                    title3: '',
    
                    email:'@',
                    email2:'@',
                    email3:'@',
    
                    phone: '',
                    phone2: '',
                    phone3: '',
    
                    date: '',
                    time: '', 
                    dateNow: true,
    
                    //trip information
                    from: ''
                    , to: '',
    
                    stops: {
                        1: '',
                        2: '', 
                        3: '', 
                        4: '',
                    },
    
                    icon: 0, 
                    icon2: 0,
    
                    airlines: '', 
                    airlinesBack: '',
                    flight: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
                    flight2: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
    
                    departure: '', 
                    departure2: '',
    
                    tripType: 'Vacation', 
                    paymentMethod: 'Cash',
                    additionalText: '',
    
                    //return trip information
                    isReturnTrip: false,
                    isReturnStatus:false,
    
                    fromR: '', 
                    toR: '',
    
                    stopsR: {
                        1: '', 
                        2: '', 
                        3: '', 
                        4: '',
                    },
    
                    dateR: '', 
                    timeR: '',
    
                    iconR: 0, icon2R: 0,
                    flightR: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
                    flight2R: {
                        title: '',
                        prefix: '',
                        number: '',
                    },
    
                    airlinesR: '', airlinesBackR: '',
                    departureR: '', departure2R: '',
    
                    //options information
                    carType: 1,
    
                    adults: 1, kids: [], babies: 0,
    
                    baggage: [
                        { type: 1,title: '', quantity: 0, },
                        { type: 2,title: '', quantity: 0, },
                        { type: 3,title: '', quantity: 0, }
                    ],
                    sport: [
                        { title: 'Bikes', quantity: 0, },
                        { title: 'Skis', quantity: 0, },
                        { title: 'Golf', quantity: 0, },
                        { title: 'Surf', quantity: 0, },
                    ],
                    carSeats: [
                        {
                            title: 'Regular',
                            quantity: 0,
                        },
                        {
                            title: 'Babi',
                            quantity: 0,
                        },
                        {
                            title: 'Booster',
                            quantity: 0,
                        },
                        {
                            title: 'Regular stroller',
                            quantity: 0,
                        },
                        {
                            title: 'Umbrella',
                            quantity: 0,
                        },
                        {
                            title: 'Double',
                            quantity: 0,
                        },
                        {
                            title: 'Wheelchair',
                            quantity: 0,
                        },
                    ],
                    pets: [
                        { title: 'Dog', cage: false, quantity: 0, },
                        { title: 'Cat', cage: false, quantity: 0 },
                        { title: 'Rabbit', cage: false, quantity: 0 },
                        { title: 'Service dog (Mira)', cage: false, quantity: 0 },
                        { title: 'Other', cage: false, quantity: 0, isOther: true, },
                    ],
                    steps:0,
                } : item)
        })),
        restoreForm: () => set((state) => ({...state, orders: state.orders.map(item=> item.id === state.id++
            ? {
                ...state.orders[0],
                id:state.id++,
                isReset: { 1:false, 2:false, 3:false, 4:false, 5:false, 6:false },
                filled:false,
                steps:  state.orders[state.id].steps,
            }
            : item
        )})),

        resetLocation: () => set((state) => ({
            ...state, orders: state.orders.map(item => item.id === state.id++ ? {
                ...item,
                from: '',
                to: '',

                stops: {
                    1: '', 2: '', 3: '', 4: '',
                },

                icon: 0, icon2: 0,
                flight: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                flight2: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                airlines: '', airlinesBack: '',
                departure: '', departure2: '',
                tripType: '',

                paymentMethod: '',
                additionalText: '',
            } : item)
        })),

        //return trip methods 
        setIsReturnStatus: (data) => set((state) => ({ ...state, orders: state.orders.map(item => item.id === state.id++ ? { ...item, isReturnStatus: data } : item) })),

        resetReturn: () => set((state) => ({
            ...state, orders: state.orders.map(item => item.id === state.id++ ? {
                ...item,
                fromR: '', toR: '',
                stopsR: {
                    1: '', 2: '', 3: '', 4: '',
                },

                iconR: 0, icon2R: 0,
                flightR: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                flight2R: {
                    title: '',
                    prefix: '',
                    number: '',
                },
                airlinesR: '', airlinesBackR: '',
                departureR: '', departure2R: '',
                tripTypeR: '',

            } : item)
        })),

    }),
    { name: 'taxi-form' },
    )
    )

