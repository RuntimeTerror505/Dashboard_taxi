import PassengersSelect from "./PassengersSelect";
import BagsSelect from "./BaggageSelect";
import CarSeatsSelect from "./CarSeatsSelect";
import SportSelect from "./SportSelect";
import PetsSelect from "./PetsSelect";

const OptionsSection = () => {
   
    

    return (
        <div className={optionsSection}>
            <PassengersSelect />
            <BagsSelect />
            <CarSeatsSelect />
            <SportSelect />
            <PetsSelect />
        </div>
    );
};

export default OptionsSection;

const optionsSection = 'flex  w-full bg-white rounded mb-5 p-4 text-xs border '

