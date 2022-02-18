import { Box, Grid, IconButton, SxProps, Theme } from "@mui/material";
import {
  FC,
  MouseEvent,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { Card } from "../../components/Card/Card";
import { Dialog } from "../../components/Dialog";
import { Header } from "../../components/Header";
import { Typography } from "../../components/Typography";
import { actionCreators, State } from "../../state";

const containerSx: SxProps<Theme> = {
  backgroundImage: "url(/HomeBackground.png)",
  minWidth: "100vw",
  minHeight: "100vh",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundAttachment: "fixed",
  backgroundSize: "cover",
  display: "flex",
  alignItems: "center",
};

const rowsSx: SxProps<Theme> = (theme) => ({
  [theme.breakpoints.up("xs")]: { padding: "0 16px" },
  [theme.breakpoints.up("md")]: { padding: "0 80px" },
});

export const Home: FC = () => {
  const booksStore = useSelector((state: State) => state.books);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const { GetBooks, GetBookDetail } = bindActionCreators(
    actionCreators,
    dispatch
  );

  useEffect(() => {
    if (isFirstRender.current) {
      GetBooks(booksStore.page);
      isFirstRender.current = false;
    }
  }, [GetBooks, booksStore.page]);
  const nextPage = useCallback(() => {
    GetBooks(booksStore.page + 1);
  }, [GetBooks, booksStore.page]);
  const previousPage = useCallback(() => {
    if (booksStore.page > 1) {
      GetBooks(booksStore.page - 1);
    }
  }, [GetBooks, booksStore.page]);
  const getDetailsCallback = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      GetBookDetail(e.currentTarget.id);
    },
    [GetBookDetail]
  );

  const cardsList = useMemo((): ReactElement => {
    return (
      <>
        {booksStore.books.map((book) => (
          <Grid item xs={12} md={3} onClick={getDetailsCallback} id={book.id}>
            <Card book={book} />
          </Grid>
        ))}
      </>
    );
  }, [booksStore.books, getDetailsCallback]);

  return (
    <>
      <Box sx={containerSx}>
        <Grid container direction="column" sx={rowsSx}>
          <Header />
          <Grid item>
            <Box>
              <Grid container spacing={2}>
                {cardsList}
              </Grid>
            </Box>
          </Grid>
          <Grid
            item
            container
            justifyContent={{ xs: "center", md: "flex-end" }}
          >
            <Grid item display="flex" alignItems="center">
              <Typography
                fontStyle="normal"
                fontWeight="normal"
                fontSize={12}
                mx={2}
              >
                {`Página ${booksStore.page} de ${booksStore.totalPages}`}
              </Typography>
              <Grid item order={{ xs: -1, md: 0 }}>
                <IconButton onClick={previousPage}>
                  <img src="/Prev.svg" alt="prev button" />
                </IconButton>
              </Grid>
              <IconButton onClick={nextPage}>
                <img src="/Next.svg" alt="next button" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Dialog />
    </>
  );
};
