import { IFullOrder } from "../Store/types";

export function createOrder(data:IFullOrder){
    const { returnOrder, ...order} = data;

    const newOrder = {
        ...order,
        id: 1,
        type: +order.orderType,
        carType: +order.carType,
        timeType: order.time.slice(-1,2)< '12'? 1: 2,
        timeTypeR: order.time.slice(-1,2)< '12'? 1: 2,
        isEdit: true,
        weightType: true,
        dateNow: false,

        icon: 0, 
        icon2: 0,

        airlines: '', 
        airlinesBack: '',
        flight: {
            ...order.flight
        },
        flight2: {
            ...order.flight2
        },

        fromR: returnOrder?.from ? returnOrder.from : '', 
        toR: returnOrder?.to ? returnOrder.to : '',

        stopsR: returnOrder?.stops ? returnOrder.stops : {
                1: '', 2: '', 3: '', 4: '',
        },

        dateR: returnOrder?.date ? returnOrder.date : '', 
        timeR: returnOrder?.time ? returnOrder.time : '',

        iconR: 0, 
        icon2R: 0,
        flightR:
            returnOrder?.flight ? returnOrder.flight : {
            title: '',
            prefix: '',
            number: '',
        },
        flight2R: returnOrder?.flight2 ? returnOrder.flight2 : {
            title: '',
            prefix: '',
            number: '',
        },

        airlinesR: '', 
        airlinesBackR: '',
        departureR: returnOrder?.departure ? returnOrder.departure : '', 
        departure2R: returnOrder?.departure2 ? returnOrder.departure2 : '',

        //options information
        baggage: order.baggage ? order.baggage :[
            { type: 1,title: '', quantity: 0, },
            { type: 2,title: '', quantity: 0, },
            { type: 3,title: '', quantity: 0, }
        ],
        sport: order.sport ? order.sport :[
            { title: 'Bikes', quantity: 0, },
            { title: 'Skis', quantity: 0, },
            { title: 'Golf', quantity: 0, },
            { title: 'Surf', quantity: 0, },
        ],
        carSeats: order.carSeats ? order.carSeats :[
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
        pets: order.pets ? order.pets :[
            { title: 'Dog', cage: false, quantity: 0, },
            { title: 'Cat', cage: false, quantity: 0 },
            { title: 'Rabbit', cage: false, quantity: 0 },
            { title: 'Service dog (Mira)', cage: false, quantity: 0 },
            { title: 'Other', cage: false, quantity: 0, isOther: true, },
        ],
        steps:0,
    }
    return newOrder
}