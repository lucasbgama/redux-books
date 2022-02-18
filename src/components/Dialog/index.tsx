import { Dialog as MuiDialog, Grid, Icon, IconButton } from "@mui/material";
import { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../state";
import { Typography } from "../Typography";

export const Dialog: FC = () => {
  const booksStore = useSelector((state: State) => state.books);
  const dispatch = useDispatch();
  const { RmBookDetail } = bindActionCreators(actionCreators, dispatch);

  const onCloseDetails = useCallback(() => {
    RmBookDetail();
  }, [RmBookDetail]);

  return (
    <MuiDialog
      open={!!booksStore.bookDetails}
      onClose={onCloseDetails}
      fullWidth
      maxWidth="md"
      sx={{ borderRadius: "4px" }}
    >
      <IconButton
        onClick={onCloseDetails}
        sx={{ position: "fixed", top: 0, right: 0 }}
      >
        <img src="/Close.svg" alt="close details button" />
      </IconButton>
      {booksStore.bookDetails && (
        <Grid
          container
          columnSpacing={4}
          padding={6}
          alignItems="stretch"
          height="100%"
          direction={{ xs: "column", md: "row" }}
        >
          <Grid item xs={6}>
            <img
              src={booksStore.bookDetails.imageUrl}
              alt={`${booksStore.bookDetails.title} pic`}
              width="100%"
              style={{
                filter: "drop-shadow(0px 6px 9px rgba(0, 0, 0, 0.15))",
                boxSizing: "border-box",
              }}
            />
          </Grid>
          <Grid item xs={6} height="initial">
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              minHeight="100%"
            >
              <Grid item alignSelf="flex-start">
                <Typography
                  fontStyle="normal"
                  fontWeight={500}
                  lineHeight="40px"
                >
                  {booksStore.bookDetails.title}
                </Typography>

                <Typography
                  fontStyle="normal"
                  fontWeight="normal"
                  fontSize={12}
                  color="#AB2680"
                >
                  {booksStore.bookDetails.authors.join(", ")}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  fontStyle="normal"
                  fontSize={12}
                  fontWeight={500}
                  lineHeight="28px"
                  textTransform="uppercase"
                >
                  Informações
                </Typography>
                <Grid container justifyContent="space-between">
                  <Typography fontStyle="normal" fontSize={12} fontWeight={500}>
                    Páginas
                  </Typography>
                  <Typography
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize={12}
                    color="#999999"
                  >{`${booksStore.bookDetails.pageCount} páginas`}</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography fontStyle="normal" fontSize={12} fontWeight={500}>
                    Editora
                  </Typography>
                  <Typography
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize={12}
                    color="#999999"
                  >{`Editora ${booksStore.bookDetails.publisher}`}</Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography fontStyle="normal" fontSize={12} fontWeight={500}>
                    Publicação
                  </Typography>
                  <Typography
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize={12}
                    color="#999999"
                  >
                    {booksStore.bookDetails.published}
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography fontStyle="normal" fontSize={12} fontWeight={500}>
                    Idioma
                  </Typography>
                  <Typography
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize={12}
                    color="#999999"
                  >
                    {booksStore.bookDetails.language}
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography fontStyle="normal" fontSize={12} fontWeight={500}>
                    Título original
                  </Typography>
                  <Typography
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize={12}
                    color="#999999"
                  >
                    {booksStore.bookDetails.title}
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography fontStyle="normal" fontSize={12} fontWeight={500}>
                    ISBN-10
                  </Typography>
                  <Typography
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize={12}
                    color="#999999"
                  >
                    {booksStore.bookDetails.isbn10}
                  </Typography>
                </Grid>
                <Grid container justifyContent="space-between">
                  <Typography fontStyle="normal" fontSize={12} fontWeight={500}>
                    ISBN-13
                  </Typography>
                  <Typography
                    fontStyle="normal"
                    fontWeight="normal"
                    fontSize={12}
                    color="#999999"
                  >
                    {booksStore.bookDetails.isbn13}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography
                  fontStyle="normal"
                  fontSize={12}
                  fontWeight={500}
                  lineHeight="28px"
                  textTransform="uppercase"
                >
                  Resenha da editora
                </Typography>
                <Typography
                  fontStyle="normal"
                  fontWeight="normal"
                  fontSize={12}
                  color="#999999"
                >
                  <Icon>
                    <img src="/Quotes.svg" alt="quotes" />
                  </Icon>{" "}
                  {booksStore.bookDetails.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </MuiDialog>
  );
};
