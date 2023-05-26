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
}

const TextFieldCustom = ({id, type, placeholder, variant, children, positionIcon, required}: Params) => {
    return (
        <TextField 
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