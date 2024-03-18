import { Select } from 'antd';

interface SelectProps {
    value   ?   : string;
    onChange    : (value: string) => void;
    source      : string[];
    placeholder : string;
    style   ?   : string;
    subStyle?   : string;
    width   ?   : number;
}


const CustomSelect= ({ onChange, source, placeholder, width}:SelectProps) => {

    return (
        <Select
            placeholder={placeholder}
            style={{ width , height: 30}}
            onChange={onChange}
            options={source.map(item=>(
                {value: item, label: item}
            ))}
        />
    );
};


export default CustomSelect;