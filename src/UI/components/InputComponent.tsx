import React from 'react';
import { Input } from 'antd';
interface InputProps {
    value?: string;
    placeholder?: string;
    onChange: (value: string) => void;
    isCanada?: boolean;
    width?: number;
}

const InputComponent: React.FC<InputProps>= ({width, onChange, placeholder,  isCanada}) => {

    return (
        <Input 
            placeholder={placeholder} 
            onChange={(e) => {
                onChange(isCanada ? e.target.value.substring(2) : e.target.value )
                }}
            style={{width, borderRadius: 0, height: 30}}
        />
    );
};

export default InputComponent;