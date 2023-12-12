import { create } from 'zustand'

interface IUser {
    isPhone: boolean;
    isSubmit: boolean;
    cars: {
        [key: number]: boolean;
    }
}
interface Store {
    validation: IUser;
    setIsPhone:(value: boolean) => void;

    setIsSubmit:(value: boolean) => void;
    setCars:(value: {[key: number]: boolean;}) => void;

}
export const useValidation = create<Store>((set) => ({
    validation: {
        isPhone: false,
        isSubmit: true,
        cars: {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
        }
    },

    setIsPhone: (name) => set(state => ({ validation: {...state.validation, isPhone: name }})),
    setIsSubmit: (name) => set(state => ({ validation: {...state.validation, isSubmit: name }})),
    setCars: (name) => set(state => ({ validation: {...state.validation, cars: name }})),
}))