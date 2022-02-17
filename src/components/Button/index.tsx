import { Button as MuiButton, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Button = styled((props: ButtonProps) => (
  <MuiButton variant="contained" {...props} />
))(({ theme }) => ({
  "&.MuiButton-root": {
    color: "#B22E6F",
    backgroundColor: "white",
    borderRadius: 44,
    fontFamily: "Heebo",
    textTransform: "none",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: "20px",
    fontStyle: "normal",
    width: 85,
    height: 36,
  },
}));
