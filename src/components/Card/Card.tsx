import { Card as MuiCard, Grid, SxProps, Theme } from "@mui/material";
import { CSSProperties, FC } from "react";
import { Book } from "../../api";
import { Typography } from "../Typography";

type CardProps = {
  book: Book;
};

const cardStyle: SxProps<Theme> = {
  height: "160px",
  overflow: "auto",
  borderRadius: "4px",
  padding: "16px",
  "&:hover": { cursor: "pointer" },
};

const imgStyle: CSSProperties = {
  filter: "drop-shadow(0px 6px 9px rgba(0, 0, 0, 0.15))",
  boxSizing: "border-box",
};

export const Card: FC<CardProps> = ({ book }) => {
  return (
    <MuiCard sx={cardStyle}>
      <Grid container columnSpacing={2} alignItems="center" height="100%">
        <Grid item xs={4}>
          <img
            src={book.imageUrl}
            alt={`${book.title} pic`}
            width="100%"
            style={imgStyle}
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
              <Typography fontStyle="normal" fontWeight={500} fontSize={14}>
                {book.title}
              </Typography>
              {book.authors.map((author) => (
                <Typography
                  fontStyle="normal"
                  fontWeight="normal"
                  fontSize={12}
                  color="#AB2680"
                >
                  {author}
                </Typography>
              ))}
            </Grid>
            <Grid item>
              <Typography
                fontStyle="normal"
                fontWeight="normal"
                fontSize={12}
                color="#999999"
              >{`${book.pageCount} páginas`}</Typography>
              <Typography
                fontStyle="normal"
                fontWeight="normal"
                fontSize={12}
                color="#999999"
              >{`Editora ${book.publisher}`}</Typography>
              <Typography
                fontStyle="normal"
                fontWeight="normal"
                fontSize={12}
                color="#999999"
              >{`Publicado em ${book.published}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </MuiCard>
  );
};
