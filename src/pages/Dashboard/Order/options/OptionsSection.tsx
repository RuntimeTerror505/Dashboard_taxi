import PassengersSelect from "./PassengersSelect";
import BagsSelect from "./BaggageSelect";
import CarSeatsSelect from "./CarSeatsSelect";
import SportSelect from "./SportSelect";
import PetsSelect from "./PetsSelect";

const OptionsSection = () => {
   
    

    return (
        <section className={optionsSection}>
            <div className='flex flex-col w-1/3 '>
                <PassengersSelect />
                <SportSelect />
            </div>
            <CarSeatsSelect />

            <div className='flex flex-col w-1/3 '>
                <BagsSelect />
                <PetsSelect />
            </div>
        </section>
    );
};

export default OptionsSection;

const optionsSection = 'flex w-full bg-white rounded mb-5 p-4 text-xs border border-gray-800'

