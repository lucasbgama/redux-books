import {
  OutlinedInputProps,
  TextField as MuiTextField,
  TextFieldProps,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";

export const TextField = styled((props: TextFieldProps) => (
  <MuiTextField
    {...props}
    InputProps={
      {
        disableUnderline: true,
        ...props.InputProps,
      } as Partial<OutlinedInputProps>
    }
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1px solid transparent",

    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#00000052",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:hover": {
      backgroundColor: "#00000028",
    },
    "&.Mui-focused": {
      backgroundColor: "#00000028",
      boxShadow: `${alpha("#B22E6F", 0.25)} 0 0 0 2px`,
      borderColor: "#B22E6F",
    },
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
  "& .MuiInputLabel-root": {
    color: "white !important",
    opacity: 0.5,
  },
}));
