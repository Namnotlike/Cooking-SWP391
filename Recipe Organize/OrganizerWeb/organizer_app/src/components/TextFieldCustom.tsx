import { InputAdornment, TextField, TextFieldVariants } from "@mui/material";
import { ReactNode } from "react";

type Params = {
    id: string,
    type?: string,
    placeholder?: string,
    variant?: any,
    positionIcon?: any,
    children?: ReactNode,
    required?: boolean,
    value?: string,
}

const TextFieldCustom = ({id, type, placeholder, variant, children, positionIcon, required, value}: Params) => {
    return (
        <TextField 
            defaultValue={value}
            id={id} 
            type={type} 
            placeholder={placeholder} 
            variant={variant || 'outlined'} 
            className="w-100"
            required={required}
            InputProps={{
            startAdornment: children && (
                <InputAdornment position={positionIcon||"start"}>
                    {children}
                </InputAdornment>
            ),
            }}
        />
    );
};

export default TextFieldCustom;