import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import { FC, useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";

export const Home: FC = () => {
  const userStore = useSelector((state: State) => state.user);
  const booksStore = useSelector((state: State) => state.books);
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const { GetBooks, Logout } = bindActionCreators(actionCreators, dispatch);
  const logoutCallback = useCallback(() => {
    Logout();
  }, [Logout]);
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
  return (
    <Box
      sx={{
        backgroundImage: "url(/HomeBackground.png)",
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Grid
        container
        direction="column"
        sx={(theme) => ({
          [theme.breakpoints.up("xs")]: { padding: "0 16px" },
          [theme.breakpoints.up("md")]: { padding: "0 80px" },
        })}
      >
        <Grid item container justifyContent="space-between" mb={5}>
          <Grid item display="flex" alignItems="center">
            <img src="BlackLogo.svg" alt="ioasys logo" height="36px" />
            <Typography
              fontSize={28}
              fontWeight={300}
              color="#333333"
              lineHeight="40px"
              fontFamily="Heebo"
              display="inline"
              marginLeft="16.6px"
            >
              Books
            </Typography>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item display={{ xs: "none", md: "flex" }}>
                <Typography
                  fontSize={12}
                  fontWeight={400}
                  color="#333333"
                  lineHeight="16px"
                  fontFamily="Heebo"
                  display="inline"
                >
                  Bem vindo, &nbsp;
                </Typography>
                <Typography
                  fontSize={12}
                  fontWeight={600}
                  color="#333333"
                  lineHeight="16px"
                  fontFamily="Heebo"
                  display="inline"
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
        <Grid item>
          <Box>
            <Grid container spacing={2}>
              {booksStore.books.map((book) => (
                <Grid item xs={12} md={3}>
                  <Card
                    sx={{
                      height: "160px",
                      overflow: "auto",
                      borderRadius: "4px",
                      padding: "16px",
                    }}
                  >
                    <Grid
                      container
                      columnSpacing={2}
                      //   padding={2}
                      alignItems="center"
                      height="100%"
                    >
                      <Grid item xs={4}>
                        <img
                          src={book.imageUrl}
                          alt={`${book.title} pic`}
                          width="100%"
                          style={{
                            filter:
                              "drop-shadow(0px 6px 9px rgba(0, 0, 0, 0.15))",
                            boxSizing: "border-box",
                          }}
                        />
                      </Grid>
                      <Grid item xs={8} height="100%">
                        <Grid
                          container
                          direction="column"
                          justifyContent="space-between"
                          minHeight="100%"
                        >
                          <Grid item alignSelf="flex-start">
                            <Typography
                              fontFamily="Heebo"
                              fontStyle="normal"
                              fontWeight={500}
                              fontSize={14}
                              lineHeight="20px"
                              color="#333333"
                            >
                              {book.title}
                            </Typography>
                            {book.authors.map((author) => (
                              <Typography
                                fontFamily="Heebo"
                                fontStyle="normal"
                                fontWeight="normal"
                                fontSize={12}
                                lineHeight="20px"
                                color="#AB2680"
                              >
                                {author}
                              </Typography>
                            ))}
                          </Grid>
                          <Grid item>
                            <Typography
                              fontFamily="Heebo"
                              fontStyle="normal"
                              fontWeight="normal"
                              fontSize={12}
                              lineHeight="20px"
                              color="#999999"
                            >{`${book.pageCount} páginas`}</Typography>
                            <Typography
                              fontFamily="Heebo"
                              fontStyle="normal"
                              fontWeight="normal"
                              fontSize={12}
                              lineHeight="20px"
                              color="#999999"
                            >{`Editora ${book.publisher}`}</Typography>
                            <Typography
                              fontFamily="Heebo"
                              fontStyle="normal"
                              fontWeight="normal"
                              fontSize={12}
                              lineHeight="20px"
                              color="#999999"
                            >{`Publicado em ${book.published}`}</Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
        <Grid item container justifyContent={{ xs: "center", md: "flex-end" }}>
          <Grid item display="flex" alignItems="center">
            <Typography
              fontFamily="Heebo"
              fontStyle="normal"
              fontWeight="normal"
              fontSize={12}
              lineHeight="20px"
              color="#333333"
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
  );
};
