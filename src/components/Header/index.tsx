import { Grid, IconButton } from "@mui/material";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import { Typography } from "../Typography";

export const Header: FC = () => {
  const userStore = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const { Logout } = bindActionCreators(actionCreators, dispatch);

  const logoutCallback = useCallback(() => {
    Logout();
  }, [Logout]);

  return (
    <Grid item container justifyContent="space-between" mb={5}>
      <Grid item display="flex" alignItems="center">
        <img src="BlackLogo.svg" alt="ioasys logo" height="36px" />
        <Typography lineHeight="40px" marginLeft="16.6px">
          Books
        </Typography>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item display={{ xs: "none", md: "flex" }}>
            <Typography fontSize={12} fontWeight={400} lineHeight="16px">
              Bem vindo, &nbsp;
            </Typography>
            <Typography
              fontSize={12}
              fontWeight={600}
              lineHeight="16px"
              fontStyle="bold"
            >
              {userStore.user?.name ?? ""}
            </Typography>
          </Grid>
          <Grid item ml={2}>
            <IconButton onClick={logoutCallback}>
              <img src="/Logout.svg" alt="logout icon" />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
