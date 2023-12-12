import { useEffect } from 'react';
import usePlacesAutocomplete, {
    getGeocode,
} from "use-places-autocomplete";
import useOnclickOutside from "react-cool-onclickoutside";
import {  useJsApiLoader } from '@react-google-maps/api';
import { Input } from 'antd';

interface ILocation {
    placeholder: string;
    onChange: (value: string) => void;
    defaultLocation?: string;
    style?: string;
}

const GoogleAddressInput = ({ placeholder, onChange, defaultLocation, style }:ILocation) => {

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAVbNNSBv8rX8ftQkneIxpdVcGy-bdhUvw' || ''
    })

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
            requestOptions: {
                componentRestrictions: { country: ["us", "ca"] },
            }
            
        });

    useEffect(() => {
        if(defaultLocation) {
            setValue(defaultLocation,false)
        } else setValue('')
    }, [defaultLocation]);

    useEffect(() => {
        if (isLoaded) init();
    }, [isLoaded, init]);

    const ref = useOnclickOutside(() => clearSuggestions());

    const handleSelect = ({ description }:{description: string}) => () => {
        onChange(description)
        setValue(description, false);
        clearSuggestions();
        getGeocode({ address: description });
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
        <div className={container+' '+ style} ref={ref} >
            <Input
                allowClear
                style={{height:40}}
                className={input}
                value={value}
                onChange={(e)=>{
                    if(!e.target.value) onChange('')
                    setValue(e.target.value)
                }}
                disabled={!ready}
                placeholder={placeholder}
            />
            {status === "OK" && <ul className={submenu}>{renderSuggestions()}</ul>}
        </div>
    );
};

export default GoogleAddressInput;

const input = ' text-sm w-full cursor-pointer relative px-2 py-1 focus:border-blue-800 w-[200px] '
const submenu = 'absolute top-full bg-white z-30'
const oneItem ='cursor-pointer hover:bg-gray-50 px-4 py-1'

const container = 'relative w-[200px]'