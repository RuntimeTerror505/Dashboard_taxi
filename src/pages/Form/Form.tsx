import React from 'react';
import InfoSection from './Info/InfoSection';
import AddressSection from './Location/LocationSection';
import OptionsSection from './Options/OptionsSection';

import PaymentSection from './Payment/Payment';
import { useValidation } from '../../Store/useValidation';
import { useEffect } from 'react';
import Submit from './Submit/Submit';
import { useMain } from '../../Store/useMain';

const Form = (): React.ReactNode => {
    const { list, activeCarId ,setIsCars, setFilled } = useMain()
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const { validation,setIsSubmit } = useValidation()

    useEffect(()=>{

        let cars = {
            1: false,
            2: false,
            3: false,
            4: false,
            5: false,
        }

        list.map((item,index)=>{

            if(item.type>2
                && item.from 
                && item.name.length > 3 
                && item.title 
                && pattern.test(item.email)
                && item.phone.length >= 11
            ){
                
                if(item.from 
                    && item.name.length > 3 
                    && item.title 
                    && pattern.test(item.email)
                    && item.phone.length >= 11
                ) {
                    return cars = {...cars, [index+1]: true}
                } else {
                    return cars = {...cars, [index+1]: false}
                }
            } else{
                
                if(item.isReturnTrip 
                    && item.name.length > 3 
                    && item.title 
                    && pattern.test(item.email)
                    && item.phone.length >= 11
                    && item.isReturnTrip 
                    && item.dateR 
                    && item.timeR.length===5 
                    && item.fromR 
                    && item.toR 
                    && item.from 
                    && item.to
                    && (item.adults>0 || (!item.adults && list[activeCarId-1].type===2))
                ){
                        return cars = {...cars, [index+1]: true}
                } else if(
                    !item.isReturnTrip 
                    && item.name.length > 2 
                    && item.title 
                    && pattern.test(item.email)
                    && item.phone.length >= 11
                    && item.from 
                    && item.to
                    && (item.adults>0 || (!item.adults && list[activeCarId-1].type===2))
                ){

                    return cars = {...cars, [index+1]: true}
                } else {
                    if(item.filled) setFilled(false, item.id)
                    cars = {...cars, [index+1]: false}
                    
                }
            }
        })
        setIsCars(cars)
    },[list])



    useEffect(()=>{
        setIsSubmit(false)
    },[activeCarId])
    
    return (
        <div  className={container}>
            {!validation.isSubmit &&
            <>
                {list[activeCarId-1].steps === 1 && <InfoSection />}
                {list[activeCarId-1].steps === 2 && <AddressSection />}
                {list[activeCarId-1].steps === 3 && <OptionsSection />}
                {list[activeCarId-1].steps === 4 && <PaymentSection/>}
            </>}
            {validation.isSubmit && <Submit />}
        </div>
    );
};

export default Form;

const container = 'flex w-[85%] flex-col  border-none items-center min-h-screen '