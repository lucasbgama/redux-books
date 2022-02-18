import { Typography as MuiTypography, TypographyProps } from "@mui/material";
import { FC } from "react";

export const Typography: FC<TypographyProps> = (props: TypographyProps) => (
  <MuiTypography
    fontSize={28}
    fontWeight={300}
    color="#333333"
    lineHeight="20px"
    fontFamily="Heebo"
    {...props}
  />
);
