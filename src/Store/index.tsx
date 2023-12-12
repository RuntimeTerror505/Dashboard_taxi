import { create } from 'zustand'

interface IUser {
    titleList: string[];
    titleListF: string[];

    nameList: string[],
    nameListF: string[],

    emailList: string[],
    emailListF: string[],

    phoneList: string[],
    phoneListF: string[],

    phoneTitleList: string[],
    phoneTitleListF: string[],

    typeList: string[],
    typeListF: string[],

    nowLater: string[],
    nowLaterF: string[],

    locationList: string[],
    locationListF: string[],

    tripTitles: string[],
    tripTitlesF: string[],


    carList: string[];
    carListF: string[];

    paymentList: string[];
    tripList: string[];
    departureSections: string[];
    flights: string[];
    airportArray: string[];
    busArray: string[];
    trainArray: string[];
    boatArray: string[];
    hotelArray: string[];


}
interface Store {
    store: IUser;

}
export const useStore = create<Store>(() => ({
    store: {
        //  defaultLocations: [ 'Aéroport - Montréal ( 975 Roméo-Vachon)', 'Airport - Saint-Hubert( PASCAN AVIATION)', 'Train - Gare Centrale de Montreal(895 de la //Gauchetière Ouest)', 'Train - Dorval Station','Bus - Bus - Station Centrale d’autobus( 1717 rue Berri)',]
        // defaultLocations: ['Airport - Montreal ( 975 Roméo-Vachon)', 'Airport - Saint-Hubert( PASCAN AVIATION)', 'Train - Central Station( 895 Gauchetière Ouest)', 'Train - Dorval Station', 'Bus - Central Station( 1717 Rue Berri)',],
        numbersList: ['st', 'nd', 'rd', 'th'],
        numbersListF: ['st', 'nd', 'rd', 'th'],

        titleList: ['Mr.', 'Mrs.', 'Miss.', 'Nothing'],
        titleListF: ['M.', 'Mme.', 'Mlle.', 'Aucun'],

        nameList: ['Your name', 'Second name', 'Third name'],
        nameListF: ['Votre nom', 'Deuxième nom', 'Troisième nom'],

        emailList: ['Your e-mail', 'Second e-mail', 'Third e-mail'],
        emailListF: ['Votre courriel', 'Deuxième courriel', 'Troisième courriel'],

        phoneList: ['Your phone', 'Second phone', 'Third phone'],
        phoneListF: ['Votre cellulaire', 'Deuxième cellulaire ', 'Troisième cellulaire'],

        phoneTitleList: ['Mobile', 'Home', 'Work'],
        phoneTitleListF: ['Cellulaire', 'Domicile', 'Travail'],

        tripTitles: ['One-Way', 'Return'],
        tripTitlesF: ['Aller', 'Retour'],

        typeList: ['Transport', 'Delivery', 'Boost', 'Unlocking doors'],
        typeListF: ['Transport', 'Livraison', 'Survoltage', 'Débarrage de portes'],

        nowLater: ['Now', 'Later'],
        nowLaterF: ['Maintenant', 'Après'],

        locationList: ['Pick Up', 'Drop Off', 'First Stop', 'Second Stop', 'Third Stop', 'Fourth Stop'],
        locationListF: ['Ramassage', 'Débarquement', 'Premier Arrêt', 'Deuxième Arrêt', 'Troisième Arrêt', 'Quatrième Arrêt'],

        carList: ['Sedan', 'SUV', 'VAN', 'Limo'],
        carListF: ['Berline', 'VUS', "VAN", "Limo"],

        tripList: ['Business (need receipt)', 'Vacation', 'Else'],
        tripListF: ['Affaires (Besoin reçu)', 'Vacance', 'Autre'],

        departureSections: ['Domestic', 'International', 'USA', 'Arrivals'],
        departureSectionsF: ['Domestique', 'International', 'États-Unis', 'Arrivés'],

        paymentList: ['Cash', 'Debit', 'Credit Card(need receipt),', 'Voucher', 'Office Charges'],
        paymentListF: ['Comptant', 'Débit', 'Carte crédit(besoin reçu),', 'Coupon', 'Charge Au Bureu'],

        flights: [
            'AIR CANADA',
            'Air Transat',
            'PAL airlines',
            'Air Inuit',
            'Porter',
            'UNITED',
            'CANADIAN NORTH',
            'American Airlines',
            'Emirates',
            'arajet',
            'DELTA',
            'flair',
            'AIR ALGERIE',
            'TUNISAIR',
            'SWISS',
            'Austrian',
            'Air Saint-Pierre',
            'AIRFRANCE',
            'KLM',
            'Lufthansa',
            'Royal Air MAroc(RAM)',
            'BRITISH AIRWAYS',
            'AeroMexico',
            'CopaAirlines',
            'Lynx',
            'SUNWING',
            'QATAR',
            'RAM',
            'Another'
        ],



        airportArray: [
            'plane',
            'airport',
            'airport,',
            'Airport',
            'Airport - Montreal ( 975 Roméo-Vachon)',
            'Aéroport - Montréal ( 975 Roméo-Vachon)',
            'YUL - Montreal Airport'
        ],
        busArray: [
            'bus',
            'bus station'
        ],
        trainArray: [
            'train',
            'train station underground'
        ],
        boatArray: [
            'boat'
        ],
        hotelArray: [
            'room',
            'hotel'
        ],


    },

}))