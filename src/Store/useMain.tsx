import { create } from 'zustand';

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
    carType: number | string;
    adults: number;
    kids: number[],
    babies: number
    baggage: IItem[];
    sport: IItem[];
    pets: IPet[];
    carSeats: IItem[];
    steps: number;
}

interface IStore {
    day: boolean;
    isFrench: boolean;
    isCars: {
        1: boolean,
        2: boolean,
        3: boolean,
        4: boolean,
        5: boolean,
    }
    activeCarId: number;
    list: ITaxi[];
    //info methods
    setDay: (value: boolean) => void;
    setType: (value: number) => void;
    setIsFrench: (value: boolean) => void;
    setActiveCarId: (value: number) => void;
    setFilled: (value: boolean, id: number) => void;
    setTimeType: (value: number) => void;
    setTimeTypeR: (value: number) => void;
    setIsCars: (data: {
        1: boolean,
        2: boolean,
        3: boolean,
        4: boolean,
        5: boolean
    }) => void;

    setTitle: (value: string) => void;
    setTitle2: (value: string) => void;
    setTitle3: (value: string) => void;

    setName: (name: string) => void;
    setName2: (name: string) => void;
    setName3: (name: string) => void;

    setEmail: (email: string) => void;
    setEmail2: (email: string) => void;
    setEmail3: (email: string) => void;

    setPhone: (phone: string) => void;
    setPhone2: (phone: string) => void;
    setPhone3: (phone: string) => void;

    setPaymentMethod: (method: string) => void;
    setAdditionalText: (text: string) => void;
    resetForm: () => void;

    //trip data methods
    setDate: (value: string) => void;
    setTime: (value: string) => void;
    setDateNow: (value: boolean) => void;

    setFrom: (data: string) => void;
    setTo: (data: string) => void;

    setStops: (value: {
        [key: number]: string;
    }) => void;

    setDeparture: (section: string) => void;
    setDeparture2: (section: string) => void;

    setIcon: (value: number) => void;
    setIcon2: (value: number) => void;

    setFlight: (value: {
        title: string;
        prefix: string;
        number: string;
    }) => void;
    setFlight2: (value: {
        title: string;
        prefix: string;
        number: string;
    }) => void;

    setTripType?: (trip: string) => void;
    setAirlines: (value: string) => void;
    setAirlinesBack: (value: string) => void;

    resetLocation: () => void;

    // return trip methods
    setIsReturnTrip: (value: boolean) => void;

    setFromR: (trip: string) => void;
    setToR: (trip: string) => void;

    setStopsR: (trip: {
        [key: number]: string;
    }) => void;


    setDateR: (trip: string) => void;
    setTimeR: (trip: string) => void;

    setDepartureR: (trip: string) => void;
    setDeparture2R: (trip: string) => void;
    setIconR: (trip: number) => void;
    setIcon2R: (trip: number) => void;
    setFlightR: (trip: {
        title: string;
        prefix: string;
        number: string;
    }) => void;
    setFlight2R: (trip: {
        title: string;
        prefix: string;
        number: string;
    }) => void;
    setAirlinesR: (trip: string) => void;
    setAirlinesBackR: (trip: string) => void;

    resetReturn: () => void;

    //options methods
    setCarType: (value: number| string) => void;
    setAdults: (value: number) => void;
    setKids: (value: number[]) => void;
    setBabies: (value: number) => void;
    setBaggage: (value: IItem[]) => void;
    setSport: (value: IItem[]) => void;
    setPets: (value: IPet[]) => void;
    setCarSeats: (value: IItem[]) => void;
    setIsReturnStatus: (value: boolean) => void;

    //steps 
    setSteps: (value: number) => void;
}

export const useMain = create<IStore>()(
    (set) => ({
        day: true,
        isFrench: false,
        isCars: {
            1: false, 2: false, 3: false, 4: false, 5: false,
        },
        activeCarId: 1,
        list: [
            {
                id: 1,
                type: 1,
                timeType: 0,
                timeTypeR: 0,
                filled: false,
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

                date: '', time: '', dateNow: true,

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

                tripType: 'Vacation', paymentMethod: 'Cash',
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
                    { title: '32 kg', quantity: 0, },
                    { title: '23 kg', quantity: 0, },
                    { title: 'Between', quantity: 0, },
                    { title: '10 kg', quantity: 0, },
                    { title: '8 kg', quantity: 0, }
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
                steps: 1,
            },
        ],

        setDay: (data) => set((state) => ({ ...state, day: data })),
        setType: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, type: data } : item) })),

        setIsFrench: (data) => set((state) => ({ ...state, isFrench: data })),
        setActiveCarId: (data) => set((state) => ({ ...state, activeCarId: data })),
        setIsCars: (data) => set((state) => ({ ...state, isCars: data })),
        setTimeType: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, timeType: data } : item) })),
        setTimeTypeR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, timeTypeR: data } : item) })),
        setFilled: (data, id) => set((state) => ({ ...state, list: state.list.map(item => item.id === id ? { ...item, filled: data } : item) })),


        //info methods

        setTitle: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, title: data } : item) })),
        setTitle2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, title2: data } : item) })),
        setTitle3: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, title3: data } : item) })),

        setName: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, name: data } : item) })),
        setName2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, name2: data } : item) })),
        setName3: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, name3: data } : item) })),

        setEmail: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, email: data } : item) })),
        setEmail2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, email2: data } : item) })),
        setEmail3: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, email3: data } : item) })),

        setPhone: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, phone: data } : item) })),
        setPhone2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, phone2: data } : item) })),
        setPhone3: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, phone3: data } : item) })),

        setPaymentMethod: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, paymentMethod: data } : item) })),
        setAdditionalText: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, additionalText: data } : item) })),
        resetForm: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId ? {
                ...item,

                date: '', time: '', dateNow: true,
                from: '', to: '',

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
                airline: '', airlineBack: '',
                departure: '', departure2: '',

                //return trip information
                isReturnTrip: false,
                

                fromR: '',
                toR: '',

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

                airlineR: '', airlineBackR: '',
                departureR: '', departure2R: '',

            } : item)
        })),


        //trip methods 

        setFrom: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, from: data } : item) })),
        setTo: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, to: data } : item) })),
        setStops: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, stops: data } : item) })),

        setDate: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, date: data } : item) })),
        setTime: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, time: data } : item) })),
        setDateNow: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, dateNow: data } : item) })),


        setIcon: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, icon: data } : item) })),
        setIcon2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, icon2: data } : item) })),

        setDeparture: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, departure: data } : item) })),
        setDeparture2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, departure2: data } : item) })),


        setFlight: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, flight: data } : item) })),
        setFlight2: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, flight2: data } : item) })),
        setTripType: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, tripType: data } : item) })),
        setAirlines: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, airlines: data } : item) })),
        setAirlinesBack: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, airlineBacks: data } : item) })),

        resetLocation: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId ? {
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
        setIsReturnTrip: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, isReturnTrip: data } : item) })),
        setIsReturnStatus: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, isReturnStatus: data } : item) })),

        setFromR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, fromR: data } : item) })),
        setToR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, toR: data } : item) })),
        setStopsR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, stopsR: data } : item) })),

        setDateR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, dateR: data } : item) })),
        setTimeR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, timeR: data } : item) })),


        setIconR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, iconR: data } : item) })),
        setIcon2R: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, icon2R: data } : item) })),

        setDepartureR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, departureR: data } : item) })),
        setDeparture2R: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, departure2R: data } : item) })),


        setFlightR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, flightR: data } : item) })),
        setFlight2R: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, flight2R: data } : item) })),
        setTripTypeR: (data: string) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, tripTypeR: data } : item) })),
        setAirlinesR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, airlinesR: data } : item) })),
        setAirlinesBackR: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, airlinesBackR: data } : item) })),

        resetReturn: () => set((state) => ({
            ...state, list: state.list.map(item => item.id === state.activeCarId ? {
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


        setCarType: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, carType: data } : item) })),

        setAdults: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, adults: data } : item) })),
        setKids: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, kids: data } : item) })),
        setBabies: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, babies: data } : item) })),

        setBaggage: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, baggage: data } : item) })),
        setPets: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, pets: data } : item) })),
        setSport: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, sport: data } : item) })),
        setCarSeats: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, carSeats: data } : item) })),

        setSteps: (data) => set((state) => ({ ...state, list: state.list.map(item => item.id === state.activeCarId ? { ...item, steps: data } : item) })),
    }))

