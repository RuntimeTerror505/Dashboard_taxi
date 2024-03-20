interface Baggage {
    type:number;
    title: string;
    quantity: number;
  }
  
interface CarSeat {
title: string;
quantity: number;
}
  
interface Sport {
title: string;
quantity: number;
}
  
interface Pet {
title: string;
quantity: number;
cage: boolean;
isOther?: boolean; // Optional since it only appears for "Other" pets
}
  
interface Stop {
[key: string]: string; // Keys like "1", "2", etc., with city names as values
}
  
interface Flight {
title: string;
prefix: string;
number: string;
}
  
export interface IFullOrder {
    _id: string;
    orderType: string;
    type: string;
    status: string;
    carType: string;
    totalPass: string,
    totalBags:string, 
    totalSport:string, 
    totalPets: string,
    tripType: string;
    totalSeats:string, 
    totalStroller: string,
    paymentMethod: string;
    additionalText: string;
    isReturnTrip: boolean;
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
    from: string;
    to: string;
    stops: Stop;
    flight: Flight;
    flight2: Flight;
    departure: string;
    departure2: string;
    adults: number;
    kids: number[];
    babies: number;
    baggage?: Baggage[];
    carSeats?: CarSeat[];
    sport?: Sport[];
    pets?: Pet[];
    returnOrder?: IFullOrder;
}
  