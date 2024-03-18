import React from 'react';
import { Select } from 'antd';


interface SelectProps {
    value   ?   :   string;
    onChange    :   (value: string) => void;
    source      :   string[];
    placeholder :   string;
    style   ?   :   string;
    width   ?   :   number;
}

const SelectInput: React.FC<SelectProps>= ({width, onChange, source, placeholder }) => {



    const filterOption = (input: string, option?: { label: string; value: string }) => 
        (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    return (
        <Select
            showSearch
            style={{width, height: 30}}
            placeholder={placeholder}
            onChange={onChange}
            filterOption={filterOption}
            options={source.map((item)=>(
                {
                    value: item,
                    label: item,
                }
            ))}
        />

    );
};

export default SelectInput;

