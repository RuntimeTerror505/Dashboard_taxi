import React, { useEffect } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";

interface IGoogleInput {
    isLoaded: boolean;
    onChange: (value:{
        lat: number;
        lng: number;
    } ) => void;
}

const GoogleMapsInput = ({ isLoaded, onChange }:IGoogleInput) => {

    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        init,
        clearSuggestions,
    } = usePlacesAutocomplete({
        callbackName: "YOUR_CALLBACK_NAME",
        initOnMount: false,
        debounce: 300,
    });

    useEffect(() => {
        if (isLoaded) {
                init();
            console.log("Loaded");
        }
    }, [isLoaded, init]);

    const ref = useOnclickOutside(() => clearSuggestions());
    const handleInput = (e:React.ChangeEvent<HTMLInputElement>) => { setValue(e.target.value) };
    const handleSelect = ({ description }:{description: string}) => () => {
        
        setValue(description, false);
        clearSuggestions();

        getGeocode({ address: description }).then((results) => {
            const { lat, lng } = getLatLng(results[0]);
            onChange({ lat, lng })
        });
    };

    const renderSuggestions = () =>
        data.map((suggestion) => {
            const {
                place_id,
                structured_formatting: { main_text, secondary_text },
            } = suggestion;

        return (
            <div key={place_id} className={oneItem} onClick={handleSelect(suggestion)}>
                <strong>{main_text}</strong> <small>{secondary_text}</small>
            </div>
        );
    });

    return (
        <div className={container} ref={ref}>
            <input
                className={input}
                value={value}
                onChange={(e)=>handleInput(e)}
                disabled={!ready}
                placeholder="Where are you going?"
            />
            {status === "OK" && <ul>{renderSuggestions()}</ul>}

        </div>
    );
};

export default GoogleMapsInput;

const input = 'border rounded cursor-pointer min-h-[42px] relative px-4 py-2 focus:border-blue-800 w-full outline-none'
const container = 'relative w-full'
const oneItem ='cursor-pointer hover:bg-gray-50 px-4 py-1'
// const submenu = 'absolute border-l border-r border-b py-2 left-0 shadow-xl bg-white w-full z-10 max-h-[200px] overflow-scroll top-[102%]'