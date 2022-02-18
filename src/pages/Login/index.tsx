import { Grid, Theme } from "@mui/material";
import { Box, SxProps } from "@mui/system";
import {
  ChangeEvent,
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { bindActionCreators } from "redux";
import { Button } from "../../components/Button";
import { TextField } from "../../components/TextField";
import { Typography } from "../../components/Typography";
import { Route } from "../../routes";
import { actionCreators, State } from "../../state";

type LoginInput = {
  email: string;
  password: string;
};

const initialLoginState: LoginInput = {
  email: "",
  password: "",
};

const formSx: SxProps<Theme> = (theme) => ({
  width: "fit-content",
  [theme.breakpoints.up("xs")]: { margin: "0 auto" },
  [theme.breakpoints.up("md")]: { marginLeft: "115px" },
});

export const Login: FC = () => {
  const dispatch = useDispatch();
  const userStore = useSelector((state: State) => state.user);
  const [hasErrors, setHasErrors] = useState(false);
  const navigate = useNavigate();
  const { Login } = bindActionCreators(actionCreators, dispatch);
  const [loginInputState, setLoginInputState] =
    useState<LoginInput>(initialLoginState);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (hasErrors) {
        setHasErrors(false);
      }
      setLoginInputState((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    },
    [hasErrors]
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const { email, password } = loginInputState;
      Login(email, password);
    },
    [Login, loginInputState]
  );

  useEffect(() => {
    setHasErrors(userStore.error);
  }, [userStore.error]);

  useEffect(() => {
    if (userStore.token?.accessToken) {
      navigate(Route.HOME);
    }
  }, [navigate, userStore.token?.accessToken]);

  return (
    <Box
      sx={{
        backgroundImage: "url(/login_bg.png)",
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "40%",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
      }}
    >
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Grid container direction="column" sx={formSx} gap={2}>
          <Grid item display="flex" mb={4}>
            <img src="WhiteLogo.svg" alt="ioasys logo" />
            <Typography
              color="white"
              lineHeight="40px"
              display="inline"
              marginLeft="16.6px"
            >
              Books
            </Typography>
          </Grid>

          <Grid item maxWidth={368}>
            <TextField
              fullWidth
              name="email"
              type="email"
              variant="filled"
              autoFocus
              value={loginInputState.email}
              onChange={handleInputChange}
              label="Email"
            />
          </Grid>
          <Grid item maxWidth={368}>
            <TextField
              fullWidth
              name="password"
              type="password"
              variant="filled"
              autoFocus
              value={loginInputState.password}
              onChange={handleInputChange}
              label="Senha"
              InputProps={{
                endAdornment: <Button type="submit">Entrar</Button>,
              }}
            />
            {hasErrors && (
              <Box
                sx={{
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                  fontFamily: "Heebo",
                  lineHeight: "16px",
                  backgroundColor: "#FFFFFF66",
                  zIndex: 9999,
                  marginTop: "24px",
                  borderRadius: "4px",
                  height: "48px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  ":before": {
                    content: '""',
                    position: "absolute",
                    width: 0,
                    height: 0,
                    border: "6px solid #FFF6",
                    left: "24px",
                    top: 0,
                    transform: "translateY(-50%) rotate(45deg)",
                    borderBottomColor: "transparent",
                    borderRightColor: "transparent",
                    borderRadius: "1px",
                  },
                }}
              >
                Email e/ou senha incorretos.
              </Box>
            )}
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
